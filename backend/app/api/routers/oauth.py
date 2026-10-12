import os
import secrets
import httpx
from datetime import datetime, timezone, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from cryptography.fernet import Fernet
import base64

from app.core.config import settings
from app.api.deps import get_current_user
from app.database.session import get_db
from app.models.models import User, SocialAccount

router = APIRouter()

# In-memory storage for oauth state mapping state -> user_id (In production, use Redis or DB table)
OAUTH_STATES = {}

# Simple symmetric encryption for the access token using SECRET_KEY
def get_fernet():
    # Make a 32 url-safe base64 encoded byte key from the 32 byte secret key hash
    import hashlib
    key = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
    return Fernet(base64.urlsafe_b64encode(key))

def encrypt_token(token: str) -> str:
    f = get_fernet()
    return f.encrypt(token.encode()).decode()

def decrypt_token(encrypted_token: str) -> str:
    f = get_fernet()
    return f.decrypt(encrypted_token.encode()).decode()

@router.get("/instagram/login")
async def instagram_login(current_user: User = Depends(get_current_user)):
    """
    Initiates the Meta Facebook Login for Business OAuth flow.
    Generates a secure state and redirects the browser.
    """
    if not settings.META_APP_ID or not settings.META_APP_SECRET:
        raise HTTPException(status_code=500, detail="Meta OAuth is not configured.")
        
    state = secrets.token_urlsafe(32)
    OAUTH_STATES[state] = {
        "user_id": current_user.id,
        "expires_at": datetime.now(timezone.utc) + timedelta(minutes=15)
    }
    
    # Required permissions as per instructions
    permissions = [
        "instagram_business_basic",
        "instagram_business_manage_insights",
        "instagram_business_manage_comments"
    ]
    
    auth_url = (
        f"https://www.facebook.com/v18.0/dialog/oauth?"
        f"client_id={settings.META_APP_ID}"
        f"&redirect_uri={settings.INSTAGRAM_REDIRECT_URI}"
        f"&state={state}"
        f"&scope={','.join(permissions)}"
        f"&response_type=code"
    )
    
    # Return the URL so frontend can do the redirect (since this is an API call with auth header)
    return {"url": auth_url}

@router.get("/instagram/callback")
async def instagram_callback(request: Request, code: Optional[str] = None, state: Optional[str] = None, error: Optional[str] = None, db: Session = Depends(get_db)):
    """
    Handles the redirect callback from Meta.
    Validates state, exchanges code for access token, retrieves Instagram account info, and stores it.
    """
    frontend_url = settings.FRONTEND_URL
    redirect_failure = f"{frontend_url}/creator/connect?error="
    
    if error:
        return RedirectResponse(f"{redirect_failure}access_denied")
        
    if not code or not state:
        return RedirectResponse(f"{redirect_failure}missing_parameters")
        
    # Validate State
    state_data = OAUTH_STATES.get(state)
    if not state_data:
        return RedirectResponse(f"{redirect_failure}invalid_state")
        
    if state_data["expires_at"] < datetime.now(timezone.utc):
        del OAUTH_STATES[state]
        return RedirectResponse(f"{redirect_failure}state_expired")
        
    user_id = state_data["user_id"]
    del OAUTH_STATES[state] # Clean up
    
    try:
        # Step 1: Exchange code for access token
        async with httpx.AsyncClient() as client:
            token_resp = await client.get(
                "https://graph.facebook.com/v18.0/oauth/access_token",
                params={
                    "client_id": settings.META_APP_ID,
                    "client_secret": settings.META_APP_SECRET,
                    "redirect_uri": settings.INSTAGRAM_REDIRECT_URI,
                    "code": code
                }
            )
            token_resp.raise_for_status()
            token_data = token_resp.json()
            access_token = token_data.get("access_token")
            
            if not access_token:
                raise Exception("Missing access token in response")
                
            # Note: We should ideally exchange for a long-lived token, but for now we'll just use the access token provided.
            
            # Step 2: Get Facebook Pages connected to the user
            pages_resp = await client.get(
                "https://graph.facebook.com/v18.0/me/accounts",
                params={
                    "access_token": access_token
                }
            )
            pages_resp.raise_for_status()
            pages_data = pages_resp.json()
            
            # Step 3: Find the connected Instagram Business account
            ig_account_id = None
            ig_username = None
            
            for page in pages_data.get("data", []):
                page_id = page.get("id")
                ig_resp = await client.get(
                    f"https://graph.facebook.com/v18.0/{page_id}",
                    params={
                        "fields": "instagram_business_account",
                        "access_token": access_token
                    }
                )
                if ig_resp.status_code == 200:
                    ig_data = ig_resp.json()
                    if "instagram_business_account" in ig_data:
                        ig_account_id = ig_data["instagram_business_account"]["id"]
                        break
                        
            if not ig_account_id:
                return RedirectResponse(f"{redirect_failure}no_instagram_account_found")
                
            # Step 4: Get Instagram Account details
            ig_details_resp = await client.get(
                f"https://graph.facebook.com/v18.0/{ig_account_id}",
                params={
                    "fields": "username,profile_picture_url",
                    "access_token": access_token
                }
            )
            ig_details_resp.raise_for_status()
            ig_details = ig_details_resp.json()
            ig_username = ig_details.get("username", "Unknown")
            
            # Step 5: Store in database securely
            # Check if this social account is already connected to this user
            social_account = db.query(SocialAccount).filter(
                SocialAccount.user_id == user_id,
                SocialAccount.platform == "instagram"
            ).first()
            
            encrypted_token = encrypt_token(access_token)
            
            if social_account:
                social_account.account_id = ig_account_id
                social_account.username = ig_username
                social_account.access_token_reference = encrypted_token
                social_account.connected_at = datetime.now(timezone.utc)
            else:
                social_account = SocialAccount(
                    user_id=user_id,
                    platform="instagram",
                    account_id=ig_account_id,
                    username=ig_username,
                    access_token_reference=encrypted_token,
                    connected_at=datetime.now(timezone.utc)
                )
                db.add(social_account)
                
            db.commit()
            
            return RedirectResponse(f"{frontend_url}/creator/connect?success=instagram")
            
    except httpx.HTTPError as e:
        print(f"Meta API Error: {e}")
        return RedirectResponse(f"{redirect_failure}meta_api_error")
    except Exception as e:
        print(f"OAuth Error: {e}")
        return RedirectResponse(f"{redirect_failure}internal_error")

@router.get("/instagram/status")
async def instagram_status(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Returns the current connection status of the Instagram account.
    Safe information only. No tokens.
    """
    account = db.query(SocialAccount).filter(
        SocialAccount.user_id == current_user.id,
        SocialAccount.platform == "instagram"
    ).first()
    
    if account:
        return {
            "connected": True,
            "username": account.username,
            "account_id": account.account_id,
            "platform": "instagram"
        }
        
    return {"connected": False}
