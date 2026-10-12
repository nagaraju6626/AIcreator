from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import httpx
from typing import List, Optional
import isodate

router = APIRouter()

class YouTubeSearchRequest(BaseModel):
    niche: Optional[str] = None
    interests: Optional[List[str]] = []
    skills: Optional[List[str]] = []
    audience: Optional[List[str]] = []
    platform: Optional[List[str]] = []
    content_type: Optional[List[str]] = []
    goal: Optional[List[str]] = []
    current_topic: Optional[str] = None
    
class YouTubeVideo(BaseModel):
    id: str
    title: str
    channelTitle: str
    thumbnailUrl: str
    description: str
    duration: str
    publishedAt: str
    relevanceReason: str

def build_search_query(req: YouTubeSearchRequest) -> str:
    query_parts = []
    
    if req.current_topic:
        query_parts.append(req.current_topic)
    
    if req.platform and len(req.platform) > 0:
        query_parts.append(req.platform[0])
    
    if req.niche:
        query_parts.append(req.niche)
    elif req.interests and len(req.interests) > 0:
        query_parts.append(req.interests[0])
        
    if req.audience and len(req.audience) > 0:
        if "beginners" not in req.audience[0].lower():
            query_parts.append(req.audience[0])
    
    if not query_parts:
        return "content creation for beginners"
        
    return " ".join(query_parts) + " for beginners"

def get_relevance_reason(req: YouTubeSearchRequest) -> str:
    if req.current_topic:
        return f"Recommended because you're learning {req.current_topic}."
    
    if req.niche:
        return f"Recommended because it matches your {req.niche} niche."
    
    if req.platform and len(req.platform) > 0:
        return f"Recommended because it helps you grow on {req.platform[0]}."
        
    return "Recommended for your creator journey."

def parse_iso_duration(iso_duration: str) -> str:
    try:
        dur = isodate.parse_duration(iso_duration)
        total_seconds = int(dur.total_seconds())
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        
        if minutes >= 60:
            hours = minutes // 60
            minutes = minutes % 60
            return f"{hours}:{minutes:02d}:{seconds:02d}"
        return f"{minutes}:{seconds:02d}"
    except:
        return "10:00"

from app.core.config import settings

@router.post("/recommendations", response_model=List[YouTubeVideo])
async def get_youtube_recommendations(req: YouTubeSearchRequest):
    api_key = settings.YOUTUBE_API_KEY
    
    if not api_key:
        raise HTTPException(status_code=503, detail="Personalized YouTube recommendations require a YouTube API connection.")
        
    query = build_search_query(req)
    
    try:
        async with httpx.AsyncClient() as client:
            # Step 1: Search for candidate videos
            search_url = "https://www.googleapis.com/youtube/v3/search"
            search_params = {
                "part": "snippet",
                "q": query,
                "type": "video",
                "maxResults": 10,
                "relevanceLanguage": "en",
                "key": api_key
            }
            search_resp = await client.get(search_url, params=search_params)
            search_resp.raise_for_status()
            search_data = search_resp.json()
            
            video_ids = []
            for item in search_data.get("items", []):
                vid = item.get("id", {}).get("videoId")
                if vid:
                    video_ids.append(vid)
                    
            if not video_ids:
                return []
                
            # Step 2: Validate video availability and get duration
            videos_url = "https://www.googleapis.com/youtube/v3/videos"
            videos_params = {
                "part": "snippet,contentDetails,status",
                "id": ",".join(video_ids),
                "key": api_key
            }
            
            videos_resp = await client.get(videos_url, params=videos_params)
            videos_resp.raise_for_status()
            videos_data = videos_resp.json()
            
            valid_videos = []
            for item in videos_data.get("items", []):
                status = item.get("status", {})
                
                # Check availability: must be public and embeddable
                if status.get("privacyStatus") != "public":
                    continue
                if not status.get("embeddable", True):
                    continue
                    
                snippet = item.get("snippet", {})
                content_details = item.get("contentDetails", {})
                
                # Parse duration
                iso_duration = content_details.get("duration", "PT10M")
                formatted_duration = parse_iso_duration(iso_duration)
                
                vid_id = item.get("id", "")
                title = snippet.get("title", "")
                channel = snippet.get("channelTitle", "")
                published_at = snippet.get("publishedAt", "")
                privacy_status = status.get("privacyStatus")
                embeddable = status.get("embeddable")
                video_url = f"https://www.youtube.com/watch?v={vid_id}"

                # Safely print ASCII for debugging
                print(f"[YouTube Recommendation] video_id: {vid_id}, privacy: {privacy_status}, embeddable: {embeddable}, url: {video_url}")
                
                valid_videos.append(YouTubeVideo(
                    id=vid_id,
                    title=title,
                    channelTitle=channel,
                    thumbnailUrl=snippet.get("thumbnails", {}).get("medium", {}).get("url", ""),
                    description=snippet.get("description", ""),
                    duration=formatted_duration,
                    publishedAt=published_at,
                    relevanceReason=get_relevance_reason(req)
                ))
            
            # Rank/sort could be applied here if needed.
            # Right now we rely on YouTube's inherent relevance ranking for the query.
            return valid_videos[:6] # Return top 6 highly relevant, validated videos
            
    except httpx.HTTPStatusError as exc:
        print(f"YouTube API HTTP Error: {exc}")
        raise HTTPException(status_code=503, detail="Unable to load YouTube recommendations right now.")
    except Exception as e:
        print(f"YouTube API Error: {e}")
        raise HTTPException(status_code=503, detail="Unable to load YouTube recommendations right now.")
