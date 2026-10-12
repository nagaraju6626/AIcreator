from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routers import auth, youtube
from app.models.models import Base
from app.database.session import engine

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json")

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(youtube.router, prefix=f"{settings.API_V1_STR}/youtube", tags=["youtube"])

from app.api.routers import oauth
app.include_router(oauth.router, prefix="/api/oauth", tags=["oauth"])

@app.on_event("startup")
async def startup_event():
    if not settings.YOUTUBE_API_KEY:
        print("[WARNING] YOUTUBE_API_KEY is missing from environment variables. YouTube recommendations will be unavailable.")
    else:
        print(f"[INFO] YOUTUBE_API_KEY is configured (ends with ...{settings.YOUTUBE_API_KEY[-4:] if len(settings.YOUTUBE_API_KEY) > 4 else '***'})")

@app.get("/")
def read_root():
    return {"message": "Welcome to CreatorPath AI Backend"}
