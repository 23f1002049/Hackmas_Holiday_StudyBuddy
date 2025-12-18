from server import create_app
from database import db
from models import User, Task, FocusSession, Badge, Gift, UserBadge, UserGift, Quest, UserQuest
from datetime import datetime, timedelta
import random

app = create_app()

def seed_data():
    with app.app_context():
        print("Clearing existing data...")
        print(f"DEBUG: User columns: {User.__table__.columns.keys()}")
        db.drop_all()
        db.create_all()

        # Re-seed Admin
        print("Seeding Admin...")
        admin = User(username='admin', email='admin@example.com', auth_provider='email', is_admin=True)
        admin.set_password('admin123')
        db.session.add(admin)

        # Seed Badges
        print("Seeding Badges...")
        badges = [
            Badge(code="first_task", name="First Task", description="Completed your first task"),
            Badge(code="task_master", name="Task Master", description="Completed 10 tasks"),
            Badge(code="first_focus", name="First Focus", description="Completed your first focus session"),
            Badge(code="dedicated", name="Dedicated Student", description="Focused for 100 minutes"),
            Badge(code="level_5", name="Level 5", description="Reached Level 5"),
            Badge(code="level_10", name="Level 10", description="Reached Level 10"),
            Badge(code="gift_wrapper", name="Gift Wrapper", description="Unlocked your first gift"),
            Badge(code="weekend_warrior", name="Weekend Warrior", description="Completed a task on the weekend")
        ]
        
        for b in badges:
            db.session.add(b)
        
        db.session.commit()
        print("Badges seeded!")

        # Seed Gifts
        print("Seeding Gifts...")
        gifts = [
            Gift(code='hot_cocoa', name='Hot Cocoa', description='A warm cup of cocoa', xp_required=100, rarity='common'),
            Gift(code='gingerbread', name='Gingerbread Man', description='A tasty treat', xp_required=200, rarity='common'),
            Gift(code='snow_globe', name='Snow Globe', description='Shake it!', xp_required=500, rarity='rare'),
            Gift(code='golden_bell', name='Golden Bell', description='Rings with joy', xp_required=1000, rarity='legendary')
        ]
        db.session.add_all(gifts)
        db.session.commit()

        # Seed Users
        print("Seeding Users...")
        users = []
        user_data = [
            ('alice', 'alice@example.com', 5, 1200, 3),
            ('bob', 'bob@example.com', 2, 450, 1),
            ('charlie', 'charlie@example.com', 10, 5000, 15),
            ('diana', 'diana@example.com', 1, 100, 0)
        ]

        for username, email, level, xp, streak in user_data:
            user = User(
                username=username,
                email=email,
                auth_provider='email',
                level=level,
                xp=xp,
                current_streak=streak,
                total_focus_minutes=xp // 2 # Rough estimate
            )
            user.set_password('password123')
            users.append(user)
            db.session.add(user)
        
        db.session.commit()

        # Seed Tasks and Sessions
        print("Seeding Tasks and Sessions...")
        task_titles = [
            "Study for Finals", "Complete Project X", "Read Chapter 4", "Write Essay", 
            "Practice Python", "Review Notes", "Workout", "Meditate"
        ]

        for user in users:
            # Create 3-5 tasks per user
            for _ in range(random.randint(3, 5)):
                is_completed = random.choice([True, False])
                task = Task(
                    user_id=user.id,
                    title=random.choice(task_titles),
                    is_completed=is_completed,
                    created_at=datetime.utcnow() - timedelta(days=random.randint(0, 10))
                )
                db.session.add(task)
                db.session.commit() # Need ID for session

                # Create sessions for completed tasks
                if is_completed:
                    duration = random.randint(25, 60)
                    start_time = datetime.utcnow() - timedelta(days=random.randint(0, 5), minutes=duration)
                    session = FocusSession(
                        user_id=user.id,
                        task_id=task.id,
                        start_time=start_time,
                        end_time=start_time + timedelta(minutes=duration),
                        duration_minutes=duration
                    )
                    db.session.add(session)

            # Assign random badges
            if user.level > 2:
                earned_badge = random.choice(badges)
                user_badge = UserBadge(user_id=user.id, badge_id=earned_badge.id)
                db.session.add(user_badge)

            # Assign random gifts
            if user.xp > 500:
                redeemed_gift = random.choice(gifts)
                user_gift = UserGift(user_id=user.id, gift_id=redeemed_gift.id)
                db.session.add(user_gift)

        # Seed Quests
        quests = [
            Quest(title="First Focus Session", description="Complete 1 Pomodoro session", target=1, xp_reward=50, quest_type="daily_focus"),
            Quest(title="Task Master", description="Complete 3 tasks", target=3, xp_reward=75, quest_type="daily_task"),
            Quest(title="Dedicated Student", description="Focus for 60 minutes total", target=60, xp_reward=100, quest_type="daily_focus"),
            Quest(title="Weekly Warrior", description="Focus for 150 minutes", target=150, xp_reward=200, quest_type="weekly_focus")
        ]
        
        for q in quests:
            db.session.add(q)
        
        db.session.commit()
        print("Quests seeded!")

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
