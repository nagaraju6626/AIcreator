from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CreatorPath AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "a_very_secret_key_change_me_in_production"  # In production, load from .env
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # DB settings
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./creatorpath.db"
    
    # AI Settings
    GEMINI_API_KEY: str = ""
    YOUTUBE_API_KEY: str = ""
    
    # Meta / Instagram OAuth Settings
    META_APP_ID: str = ""
    META_APP_SECRET: str = ""
    INSTAGRAM_REDIRECT_URI: str = "http://localhost:8000/api/oauth/instagram/callback"
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()
