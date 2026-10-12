import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
import random
from app.database.session import SessionLocal, engine
from app.models.models import Base, User, Post, Comment, AudienceInsight, ContentOpportunity, Recommendation, CreatorProfile, SocialAccount
from app.core.security import get_password_hash

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if users already exist
    if db.query(User).first():
        print("Database already seeded")
        return

    # Create Beginner User
    beginner = User(
        name="Beginner Bob",
        email="beginner@test.com",
        password_hash=get_password_hash("password"),
        creator_type="beginner"
    )
    db.add(beginner)

    # Create Existing Creator
    creator = User(
        name="Pro Creator",
        email="creator@test.com",
        password_hash=get_password_hash("password"),
        creator_type="existing"
    )
    db.add(creator)
    db.commit()

    # Create Profile for Pro Creator
    profile = CreatorProfile(
        user_id=creator.id,
        niche="Tech Education",
        goals="Grow to 100k subscribers",
        platforms=["youtube", "instagram"],
        experience_level="Intermediate"
    )
    db.add(profile)

    social = SocialAccount(
        user_id=creator.id,
        platform="youtube",
        account_id="yt_12345",
        username="ProCreatorYT"
    )
    db.add(social)

    # Seed Posts for Pro Creator
    posts = []
    now = datetime.now(timezone.utc)
    for i in range(50):
        days_ago = random.randint(1, 90)
        views = random.randint(1000, 50000)
        likes = int(views * random.uniform(0.05, 0.15))
        comments_cnt = int(likes * random.uniform(0.01, 0.05))
        shares = int(likes * random.uniform(0.01, 0.03))
        
        post = Post(
            user_id=creator.id,
            platform="youtube",
            post_id=f"vid_{i}",
            title=f"Python Tutorial Part {i}",
            description="Learn python fast",
            content_type="video",
            published_at=now - timedelta(days=days_ago),
            views=views,
            likes=likes,
            comments_count=comments_cnt,
            shares=shares,
            saves=int(shares * 1.2),
            engagement_rate=round((likes + comments_cnt + shares) / views * 100, 2)
        )
        posts.append(post)
        db.add(post)
    
    db.commit()

    # Seed Comments
    sentiments = ["Positive", "Negative", "Neutral"]
    intents = ["Question", "Praise", "Complaint", "Suggestion"]
    for post in posts[:10]: # Just add comments to first 10 for speed
        for c in range(20):
            comment = Comment(
                post_id=post.id,
                comment_text=f"Great video! Can you make one about {random.choice(['AI', 'Docker', 'FastAPI'])}?",
                sentiment=random.choices(sentiments, weights=[70, 10, 20])[0],
                topic=random.choice(['AI Tools', 'Python', 'Tutorials', 'Career Advice']),
                intent=random.choices(intents, weights=[40, 40, 5, 15])[0]
            )
            db.add(comment)

    # Seed Audience Insights
    insights = [
        AudienceInsight(user_id=creator.id, category="LIKE", insight="Users love clear, step-by-step Python tutorials.", confidence=0.92),
        AudienceInsight(user_id=creator.id, category="WANT", insight="High demand for real-world AI project examples.", confidence=0.88),
        AudienceInsight(user_id=creator.id, category="ASK", insight="Frequent questions about deployment and Docker.", confidence=0.75)
    ]
    db.add_all(insights)

    # Seed Opportunities
    opps = [
        ContentOpportunity(user_id=creator.id, title="5 AI Tools for Students", reason="High demand in comments, low competition.", demand_score=9.2, competition_score=3.1, opportunity_score=8.5),
        ContentOpportunity(user_id=creator.id, title="Deploy FastAPI to AWS", reason="Frequently asked question.", demand_score=8.1, competition_score=6.0, opportunity_score=7.2)
    ]
    db.add_all(opps)

    # Seed Recommendations
    recs = [
        Recommendation(user_id=creator.id, action="Create a short video about 'Top 5 AI Tools for Students'", score=9.5, reason="High audience demand + strong historical performance for educational AI content."),
        Recommendation(user_id=creator.id, action="Improve hooks in tutorial videos", score=8.0, reason="Audience retention drops in first 10 seconds on average.")
    ]
    db.add_all(recs)

    db.commit()
    db.close()
    print("Database seeding complete!")

if __name__ == "__main__":
    seed_db()
