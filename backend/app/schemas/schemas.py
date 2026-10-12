from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str
    creator_type: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    creator_type: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class CreatorTypeUpdate(BaseModel):
    creator_type: str # "beginner" or "existing"

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# We can add more schemas as we build the specific API endpoints
