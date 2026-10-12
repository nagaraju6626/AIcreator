from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime, timezone

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    creator_type = Column(String, nullable=True) # "beginner" or "existing"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    profile = relationship("CreatorProfile", back_populates="user", uselist=False)
    social_accounts = relationship("SocialAccount", back_populates="user")
    posts = relationship("Post", back_populates="user")
    audience_insights = relationship("AudienceInsight", back_populates="user")
    content_opportunities = relationship("ContentOpportunity", back_populates="user")
    recommendations = relationship("Recommendation", back_populates="user")
    learning_progress = relationship("LearningProgress", back_populates="user")

class CreatorProfile(Base):
    __tablename__ = "creator_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    niche = Column(String, nullable=True)
    goals = Column(String, nullable=True)
    platforms = Column(JSON, nullable=True)
    experience_level = Column(String, nullable=True)

    user = relationship("User", back_populates="profile")

class SocialAccount(Base):
    __tablename__ = "social_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    platform = Column(String) # "youtube", "instagram", etc.
    account_id = Column(String)
    username = Column(String)
    access_token_reference = Column(String, nullable=True)
    connected_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="social_accounts")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    platform = Column(String)
    post_id = Column(String, index=True)
    title = Column(String)
    description = Column(Text, nullable=True)
    content_type = Column(String) # "video", "short", "image"
    published_at = Column(DateTime)
    
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    saves = Column(Integer, default=0)
    engagement_rate = Column(Float, default=0.0)

    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    comment_text = Column(Text)
    sentiment = Column(String) # "Positive", "Negative", "Neutral"
    topic = Column(String)
    intent = Column(String) # "Question", "Praise", "Complaint"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    post = relationship("Post", back_populates="comments")

class AudienceInsight(Base):
    __tablename__ = "audience_insights"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String) # "LIKE", "DISLIKE", "WANT", "ASK"
    insight = Column(Text)
    confidence = Column(Float)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="audience_insights")

class ContentOpportunity(Base):
    __tablename__ = "content_opportunities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    reason = Column(Text)
    demand_score = Column(Float)
    competition_score = Column(Float)
    opportunity_score = Column(Float)

    user = relationship("User", back_populates="content_opportunities")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(Text)
    score = Column(Float)
    reason = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="recommendations")

class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(String)
    progress = Column(Integer, default=0)
    completed = Column(Boolean, default=False)

    user = relationship("User", back_populates="learning_progress")
