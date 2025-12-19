from datetime import datetime
from database import db
from werkzeug.security import check_password_hash, generate_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True) # Nullable for existing users or OAuth
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    is_admin = db.Column(db.Boolean, default=False)
    is_blocked = db.Column(db.Boolean, default=False)
    auth_provider = db.Column(db.String(20), nullable=False) # guest / email / github
    xp = db.Column(db.Integer, default=0)
    lifetime_xp = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    current_streak = db.Column(db.Integer, default=0)
    total_focus_minutes = db.Column(db.Integer, default=0)
    theme = db.Column(db.String(50), default='festive') # festive / dark / calm
    snow_enabled = db.Column(db.Boolean, default=True)
    sound_enabled = db.Column(db.Boolean, default=True)
    avatar = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_active_date = db.Column(db.DateTime, nullable=True)

    tasks = db.relationship('Task', backref='user', lazy=True)
    focus_sessions = db.relationship('FocusSession', backref='user', lazy=True)
    user_badges = db.relationship('UserBadge', backref='user', lazy=True)
    user_gifts = db.relationship('UserGift', backref='user', lazy=True)

    def set_password(self, password):
        from werkzeug.security import generate_password_hash
        self.password_hash = generate_password_hash(password)

    # def check_password(self, password):
    #     from werkzeug.security import check_password_hash
    #     return check_password_hash(self.password_hash, password)
    # models.py
    def check_password(self, password):
        if not self.password_hash:
            return False
        return check_password_hash(self.password_hash, password)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin,
            'is_blocked': self.is_blocked,
            'auth_provider': self.auth_provider,
            'xp': self.xp,
            'lifetime_xp': self.lifetime_xp,
            'level': self.level,
            'current_streak': self.current_streak,
            'total_focus_minutes': self.total_focus_minutes,
            'theme': self.theme,
            'avatar': self.avatar,
            'snow_enabled': self.snow_enabled,
            'sound_enabled': self.sound_enabled,
            'created_at': self.created_at.isoformat(),
            'badges': [ub.badge.code for ub in self.user_badges]
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(20), default='medium') # high, medium, low
    is_completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)
    xp_awarded = db.Column(db.Integer, default=0)

    focus_sessions = db.relationship('FocusSession', backref='task', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'priority': self.priority,
            'is_completed': self.is_completed,
            'created_at': self.created_at.isoformat(),
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    target = db.Column(db.Integer, default=1)
    xp_reward = db.Column(db.Integer, default=0)
    quest_type = db.Column(db.String(20), nullable=False) # daily_task, daily_focus, weekly_focus
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'target': self.target,
            'xp_reward': self.xp_reward,
            'type': self.quest_type
        }

class UserQuest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('quest.id'), nullable=False)
    claimed_at = db.Column(db.DateTime, default=datetime.utcnow)

    quest = db.relationship('Quest')

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'quest_id': self.quest_id,
            'claimed_at': self.claimed_at.isoformat(),
            'quest': self.quest.to_dict()
        }

class FocusSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    duration_minutes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'task_id': self.task_id,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'duration_minutes': self.duration_minutes,
            'created_at': self.created_at.isoformat()
        }

class Badge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'name': self.name,
            'description': self.description
        }

class UserBadge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    badge_id = db.Column(db.Integer, db.ForeignKey('badge.id'), nullable=False)
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)

    badge = db.relationship('Badge')

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'badge_id': self.badge_id,
            'earned_at': self.earned_at.isoformat(),
            'badge': self.badge.to_dict()
        }

class Gift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    xp_required = db.Column(db.Integer, default=0)
    rarity = db.Column(db.String(20), default='common')

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'name': self.name,
            'description': self.description,
            'xp_required': self.xp_required,
            'rarity': self.rarity
        }

class UserGift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    gift_id = db.Column(db.Integer, db.ForeignKey('gift.id'), nullable=False)
    redeemed_at = db.Column(db.DateTime, default=datetime.utcnow)

    gift = db.relationship('Gift')

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'gift_id': self.gift_id,
            'redeemed_at': self.redeemed_at.isoformat(),
            'gift': self.gift.to_dict()
        }

class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat()
        }
