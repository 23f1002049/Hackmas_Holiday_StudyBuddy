from datetime import datetime, timedelta
from flask import Flask
from flask_cors import CORS
from config import Config
from database import db
from routes import api

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    CORS(app, resources={r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers"],
        "supports_credentials": True
    }})

    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')

    # Create database tables
    with app.app_context():
        # Temporary: Reset DB to apply schema changes (column length)
        # You can remove db.drop_all() after a successful deploy
        db.drop_all()
        db.create_all()
        
        # Seed Admin User
        from models import User, Badge, Quest, Gift, Announcement
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@example.com',
                auth_provider='email',
                is_admin=True
            )
            admin.set_password('admin123')
            db.session.add(admin)
            print("Admin user created.")

        # Seed Badges
        badges = [
            ('first_task', 'First Task', 'Completed your very first task!'),
            ('task_master', 'Task Master', 'Completed 10 tasks.'),
            ('first_focus', 'First Focus', 'Completed a 25-minute focus session.'),
            ('dedicated', 'Dedicated Student', 'Focused for over 100 minutes.'),
            ('level_5', 'Level 5', 'Reached level 5!'),
            ('level_10', 'Level 10', 'Reached level 10!'),
            ('gift_wrapper', 'Gift Wrapper', 'Unlocked your first gift.'),
            ('weekend_warrior', 'Weekend Warrior', 'Completed a task on the weekend.')
        ]
        for code, name, desc in badges:
            if not Badge.query.filter_by(code=code).first():
                db.session.add(Badge(code=code, name=name, description=desc))
        
        # Seed Quests
        quests = [
            ('1', 'First Focus Session', 'Complete 1 Pomodoro session', 1, 50, 'daily_focus'),
            ('2', 'Task Master', 'Complete 3 tasks', 3, 75, 'daily_task'),
            ('3', 'Dedicated Student', 'Focus for 60 minutes total', 60, 100, 'daily_focus'),
            ('4', 'Weekly Warrior', 'Focus for 5 hours this week', 300, 200, 'weekly_focus')
        ]
        for q_id, title, desc, target, reward, q_type in quests:
            if not Quest.query.filter_by(id=int(q_id)).first():
                db.session.add(Quest(id=int(q_id), title=title, description=desc, target=target, xp_reward=reward, quest_type=q_type))

        # Seed Gifts
        gifts = [
            ('hot_cocoa', 'Hot Cocoa', 'A warm cup of cocoa', 200, 'common'),
            ('gingerbread', 'Gingerbread Man', 'A tasty treat', 500, 'rare'),
            ('snow_globe', 'Snow Globe', 'Shake it!', 2000, 'epic'),
            ('golden_bell', 'Golden Bell', 'Rings with joy', 5000, 'legendary')
        ]
        for code, name, desc, xp, rarity in gifts:
            if not Gift.query.filter_by(code=code).first():
                db.session.add(Gift(code=code, name=name, description=desc, xp_required=xp, rarity=rarity))

        # Seed Initial Announcement
        if not Announcement.query.first():
            db.session.add(Announcement(content="Welcome to HackMas! 🎄 Good luck with your focus sessions and happy holidays!"))

        # Seed Sample Users & Tasks
        # Use simple password for all
        sample_users = [
            ('madhav', 'madhav@user.com', 8, 2500, 45, 1200),
            ('helper_elf', 'elf@user.com', 5, 800, 12, 450),
            ('rudolph', 'rudolph@user.com', 3, 300, 8, 150),
            ('frosty', 'frosty@user.com', 12, 12000, 102, 5400)
        ]
        
        for name, email, level, xp, tasks_cnt, focus_mins in sample_users:
            if not User.query.filter_by(email=email).first():
                user = User(
                    username=name,
                    email=email,
                    auth_provider='email',
                    level=level,
                    xp=xp,
                    total_focus_minutes=focus_mins,
                    current_streak=tasks_cnt % 10 # Random-ish streak
                )
                user.set_password('password123')
                db.session.add(user)
                db.session.flush() # Get user.id
                
                # Add some sample tasks
                from models import Task, FocusSession
                db.session.add(Task(user_id=user.id, title="Decorate Northern Tree", priority="high", is_completed=True))
                db.session.add(Task(user_id=user.id, title="Check Naughty List twice", priority="medium", is_completed=False))
                db.session.add(Task(user_id=user.id, title="Bake Gingerbread", priority="low", is_completed=True))
                
                # Add sample focus sessions for the last 7 days
                now = datetime.utcnow()
                for i in range(7):
                    session_time = now - timedelta(days=i, hours=2)
                    db.session.add(FocusSession(
                        user_id=user.id,
                        start_time=session_time,
                        end_time=session_time + timedelta(minutes=25),
                        duration_minutes=25
                    ))

        db.session.commit()

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5555)
