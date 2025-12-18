from flask import Blueprint, jsonify, request, abort, current_app
from database import db
from models import User, Task, FocusSession, Badge, UserBadge, Gift, UserGift, UserQuest, Quest, Announcement
from sqlalchemy import func, extract
from datetime import datetime, timedelta
from functools import wraps
import jwt

api = Blueprint('api', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        print(f"DEBUG: Auth Header: {auth_header}")
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(" ")[1]
            print(f"DEBUG: Token extracted: {token[:10]}...")
        
        if not token:
            print("DEBUG: Token is missing")
            return jsonify({'error': 'Token is missing!'}), 401
        
        try:
            print(f"DEBUG: Decoding token with key: {current_app.config['SECRET_KEY']}")
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            print(f"DEBUG: Token payload: {data}")
            current_user = User.query.get(data['user_id'])
            if not current_user:
                print("DEBUG: User not found from token payload")
                return jsonify({'error': 'User not found!'}), 401
            
            # Update last active for Live Activity tracking
            current_user.last_active_date = datetime.utcnow()
            db.session.commit()
        except Exception as e:
            print(f"DEBUG: Token validation error: {str(e)}")
            return jsonify({'error': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check for token first (reuse token_required logic or assume it's wrapped)
        # For simplicity, we'll check the header again or rely on token_required passing user
        # But since admin_required was used standalone before, let's make it work with token
        
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]
        
        if not token:
             # Fallback to old insecure header for backward compat if needed, or just fail
             # Let's enforce token for admin too
             return jsonify({'error': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user = User.query.get(data['user_id'])
            if not user or not user.is_admin:
                abort(403, description="Admin access required")
        except:
             return jsonify({'error': 'Token is invalid!'}), 401
            
        return f(*args, **kwargs)
    return decorated_function

# User Endpoints
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        if user.is_blocked:
            return jsonify({'error': 'Your account has been blocked. Please contact support.'}), 403
            
        # Generate Token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'message': 'Login successful', 
            'token': token,
            'user': user.to_dict()
        })
    
    return jsonify({'error': 'Invalid email or password'}), 401

@api.route('/users', methods=['GET'])
@admin_required
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@api.route('/active-count', methods=['GET'])
def get_active_count():
    # Users active in the last 15 minutes
    fifteen_minutes_ago = datetime.utcnow() - timedelta(minutes=15)
    active_count = User.query.filter(User.last_active_date >= fifteen_minutes_ago).count()
    # Add a "base" number of 12 for the demo to feel populated if it's just the user
    return jsonify({'count': max(active_count, 12)})

from werkzeug.security import generate_password_hash

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        email=data['email'],
        username=data.get('username'),
        avatar=data.get('avatar'),
        auth_provider='email',
        password_hash=generate_password_hash(data['password'])
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    user_data = user.to_dict()
    
    # Calculate extra stats
    today = datetime.utcnow().date()
    start_of_day = datetime(today.year, today.month, today.day)
    start_of_week = start_of_day - timedelta(days=today.weekday())
    
    # Tasks Completed
    tasks_completed = Task.query.filter_by(user_id=user_id, is_completed=True).count()
    
    # Focus Minutes (Today)
    today_sessions = FocusSession.query.filter(
        FocusSession.user_id == user_id,
        FocusSession.start_time >= start_of_day
    ).all()
    today_focus_minutes = sum(s.duration_minutes for s in today_sessions)
    
    # Focus Minutes (Week)
    week_sessions = FocusSession.query.filter(
        FocusSession.user_id == user_id,
        FocusSession.start_time >= start_of_week
    ).all()
    week_focus_minutes = sum(s.duration_minutes for s in week_sessions)
    
    user_data.update({
        'tasks_completed_count': tasks_completed,
        'today_focus_minutes': today_focus_minutes,
        'week_focus_minutes': week_focus_minutes
    })
    
    return jsonify(user_data)

@api.route('/users/<int:user_id>/reset', methods=['POST'])
@token_required
def reset_user_data(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    user = User.query.get_or_404(user_id)
    
    # Delete related data
    Task.query.filter_by(user_id=user_id).delete()
    FocusSession.query.filter_by(user_id=user_id).delete()
    UserQuest.query.filter_by(user_id=user_id).delete()
    UserBadge.query.filter_by(user_id=user_id).delete()
    UserGift.query.filter_by(user_id=user_id).delete()
    
    # Reset User Stats
    user.xp = 0
    user.level = 1
    user.current_streak = 0
    user.total_focus_minutes = 0
    
    db.session.commit()
    
    return jsonify({'message': 'User data reset successfully', 'user': user.to_dict()})

@api.route('/users/<int:user_id>', methods=['PUT'])
@token_required
def update_user(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    user = User.query.get_or_404(user_id)
    data = request.get_json()

    if 'xp' in data:
        user.xp = data['xp']
    if 'level' in data:
        user.level = data['level']
    if 'current_streak' in data:
        user.current_streak = data['current_streak']
    if 'total_focus_minutes' in data:
        user.total_focus_minutes = data['total_focus_minutes']
    if 'theme' in data:
        user.theme = data['theme']
    if 'avatar' in data:
        user.avatar = data['avatar']
    if 'username' in data:
        user.username = data['username']
    if 'snow_enabled' in data:
        user.snow_enabled = data['snow_enabled']
    if 'sound_enabled' in data:
        user.sound_enabled = data['sound_enabled']
    
    db.session.commit()
    return jsonify(user.to_dict())

@api.route('/users/<int:user_id>/block', methods=['PUT'])
@admin_required
def block_user(user_id):
    user = User.query.get_or_404(user_id)
    user.is_blocked = True
    db.session.commit()
    return jsonify({'message': f'User {user.username or user.email} blocked successfully', 'user': user.to_dict()})

@api.route('/users/<int:user_id>/unblock', methods=['PUT'])
@admin_required
def unblock_user(user_id):
    user = User.query.get_or_404(user_id)
    user.is_blocked = False
    db.session.commit()
    return jsonify({'message': f'User {user.username or user.email} unblocked successfully', 'user': user.to_dict()})

@api.route('/users/<int:user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

# Task Endpoints
@api.route('/tasks', methods=['POST'])
@token_required
def create_task(current_user):
    data = request.get_json()
    # Remove redundant check that might fail on type mismatch (str vs int)
    # if data['user_id'] != current_user.id:
    #      return jsonify({'error': 'Unauthorized'}), 403
         
    # Rate Limiting: Max 50 active tasks
    active_tasks = Task.query.filter_by(user_id=current_user.id, is_completed=False).count()
    if active_tasks >= 50:
        return jsonify({'error': 'Task limit reached (50). Please complete some tasks first!'}), 400
         
    new_task = Task(
        user_id=current_user.id, # Trust the token
        title=data['title'],
        priority=data.get('priority', 'medium')
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# ... (other routes unchanged)


@api.route('/users/<int:user_id>/tasks', methods=['GET'])
@token_required
def get_user_tasks(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])

# Helper: Check and Award Badges
def check_badges(user):
    badges_awarded = []
    
    # Define Badge Criteria
    # (Code, Name, Condition)
    criteria = [
        ('first_task', 'First Task', lambda u: Task.query.filter_by(user_id=u.id, is_completed=True).count() >= 1),
        ('task_master', 'Task Master', lambda u: Task.query.filter_by(user_id=u.id, is_completed=True).count() >= 10),
        ('first_focus', 'First Focus', lambda u: u.total_focus_minutes >= 25),
        ('dedicated', 'Dedicated Student', lambda u: u.total_focus_minutes >= 100),
        ('level_5', 'Level 5', lambda u: u.level >= 5),
        ('level_10', 'Level 10', lambda u: u.level >= 10),
        ('gift_wrapper', 'Gift Wrapper', lambda u: UserGift.query.filter_by(user_id=u.id).count() >= 1),
        ('weekend_warrior', 'Weekend Warrior', lambda u: Task.query.filter(Task.user_id==u.id, Task.is_completed==True, extract('dow', Task.completed_at).in_([0, 6])).count() >= 1)
    ]
    
    for code, name, condition in criteria:
        if condition(user):
            # Check if already has badge
            badge = Badge.query.filter_by(code=code).first()
            if badge:
                has_badge = UserBadge.query.filter_by(user_id=user.id, badge_id=badge.id).first()
                if not has_badge:
                    new_ub = UserBadge(user_id=user.id, badge_id=badge.id)
                    db.session.add(new_ub)
                    badges_awarded.append(name)
    
    if badges_awarded:
        db.session.commit()
        
    return badges_awarded

def check_streak(user):
    today = datetime.utcnow().date()
    
    if not user.last_active_date:
        user.last_active_date = datetime.utcnow()
        user.current_streak = 1
        db.session.commit()
        return

    last_active = user.last_active_date.date()
    
    if last_active == today:
        return # Already active today
        
    if last_active == today - timedelta(days=1):
        # Consecutive day
        user.current_streak += 1
    else:
        # Missed a day (or more)
        user.current_streak = 1
        
    user.last_active_date = datetime.utcnow()
    db.session.commit()

def check_level_up(user):
    # Standard Quadratic Scaling:
    # XP required for next level = round(100 * (Level ^ 1.5))
    
    leveled_up = False
    while True:
        xp_needed = round(100 * (user.level ** 1.5))
        if user.xp >= xp_needed:
            user.xp -= xp_needed
            user.level += 1
            leveled_up = True
        else:
            break
            
    if leveled_up:
        db.session.commit()
        check_badges(user)
        
    return leveled_up

@api.route('/tasks/<int:task_id>', methods=['PUT'])
@token_required
def update_task(current_user, task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    data = request.get_json()
    
    if 'is_completed' in data:
        # Idempotency Check: If state hasn't changed, do nothing
        if task.is_completed == data['is_completed']:
            return jsonify(task.to_dict())

        task.is_completed = data['is_completed']
        if task.is_completed:
            task.completed_at = datetime.utcnow()
            
            # Anti-Cheat: Cap daily XP (Max 10 tasks / 100 XP per day)
            today = datetime.utcnow().date()
            start_of_day = datetime(today.year, today.month, today.day)
            daily_completed = Task.query.filter(
                Task.user_id == current_user.id,
                Task.is_completed == True,
                Task.completed_at >= start_of_day,
                Task.id != task.id
            ).count()
            
            if daily_completed < 10:
                # Award XP for task completion (Standardized weights)
                priority_weights = {
                    'high': 50,
                    'medium': 20,
                    'low': 10
                }
                base_xp = priority_weights.get(task.priority, 20)
                
                # Streak Bonus multiplier (1 + (min(streak, 10) * 0.05))
                check_streak(task.user)
                streak_bonus_multiplier = 1 + (min(task.user.current_streak, 10) * 0.05)
                
                total_xp = round(base_xp * streak_bonus_multiplier)
                task.xp_awarded = total_xp
                task.user.xp += total_xp
        else:
            task.completed_at = None
            # Deduct exact XP awarded to prevent exploit
            task.user.xp = max(0, task.user.xp - task.xp_awarded)
            task.xp_awarded = 0

    if 'title' in data:
        task.title = data['title']
    
    if 'priority' in data:
        task.priority = data['priority']
        
    db.session.commit()
    
    db.session.commit()
    
    # Check Level Up & Badges
    check_level_up(task.user)
    check_badges(task.user)
    
    return jsonify(task.to_dict())

@api.route('/tasks/<int:task_id>', methods=['DELETE'])
@token_required
def delete_task(current_user, task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    if task.is_completed:
        # Deduct awarded XP to prevent farming
        task.user.xp = max(0, task.user.xp - task.xp_awarded)
        
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})

# FocusSession Endpoints
@api.route('/focus_sessions', methods=['POST'])
@token_required
def create_focus_session(current_user):
    data = request.get_json()
    # Remove redundant check
    # if data['user_id'] != current_user.id:
    #     return jsonify({'error': 'Unauthorized'}), 403
        
    duration = data.get('duration_minutes', 0)
    start_time = datetime.fromisoformat(data['start_time'].replace('Z', '+00:00'))
    end_time_str = data.get('end_time')
    
    if not end_time_str:
        return jsonify({'error': 'End time is required'}), 400
        
    end_time = datetime.fromisoformat(end_time_str.replace('Z', '+00:00'))
    
    # Validate Duration
    calculated_duration = (end_time - start_time).total_seconds() / 60
    
    # Allow 1 minute variance for network latency / rounding
    if abs(calculated_duration - duration) > 1:
        # If mismatch is huge, reject. 
        # But for now, let's trust the server calculation over the client
        duration = int(calculated_duration)
    
    # Cap max duration to prevent exploits (e.g. max 3 hours per session)
    if duration > 180:
        return jsonify({'error': 'Session too long. Please sync more often.'}), 400
    
    if duration < 0:
        return jsonify({'error': 'Invalid duration'}), 400

    new_session = FocusSession(
        user_id=current_user.id, # Trust token
        task_id=data.get('task_id'),
        start_time=start_time,
        end_time=end_time,
        duration_minutes=duration
    )
    
    # Award XP: 1 XP per minute (Capped at 300 XP/Day)
    user = current_user # Use current_user directly
    if user:
        today = datetime.utcnow().date()
        start_of_day = datetime(today.year, today.month, today.day)
        
        daily_focus_minutes = db.session.query(func.sum(FocusSession.duration_minutes)).filter(
            FocusSession.user_id == user.id,
            FocusSession.start_time >= start_of_day
        ).scalar() or 0
        
        if daily_focus_minutes < 300:
            remaining_cap = 300 - daily_focus_minutes
            base_xp = min(duration, remaining_cap)
            
            # Streak Bonus multiplier
            check_streak(user)
            streak_bonus_multiplier = 1 + (min(user.current_streak, 10) * 0.05)
            
            xp_to_award = round(base_xp * streak_bonus_multiplier)
            user.xp += xp_to_award
            
        user.total_focus_minutes += duration
        
    db.session.add(new_session)
    db.session.commit()
    
    db.session.add(new_session)
    db.session.commit()
    
    # Check Level Up & Badges
    check_level_up(user)
    check_badges(user)
    
    return jsonify(new_session.to_dict()), 201

@api.route('/users/<int:user_id>/focus_sessions', methods=['GET'])
@token_required
def get_user_focus_sessions(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    sessions = FocusSession.query.filter_by(user_id=user_id).all()
    return jsonify([session.to_dict() for session in sessions])

# Quest Endpoints
@api.route('/users/<int:user_id>/quests', methods=['GET'])
@token_required
def get_user_quests(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    quests = Quest.query.all()
    user_quests = UserQuest.query.filter_by(user_id=user_id).all()
    claimed_ids = {uq.quest_id for uq in user_quests}
    
    # Calculate progress dynamically
    today = datetime.utcnow().date()
    start_of_day = datetime(today.year, today.month, today.day)
    start_of_week = start_of_day - timedelta(days=today.weekday())

    # Only fetch quests claimed TODAY
    user_quests = UserQuest.query.filter(
        UserQuest.user_id == user_id,
        UserQuest.claimed_at >= start_of_day
    ).all()
    claimed_ids = {uq.quest_id for uq in user_quests}
    daily_tasks_count = Task.query.filter(
        Task.user_id == user_id,
        Task.is_completed == True,
        Task.completed_at >= start_of_day
    ).count()

    # Daily Focus Minutes
    daily_focus_sessions = FocusSession.query.filter(
        FocusSession.user_id == user_id,
        FocusSession.start_time >= start_of_day
    ).all()
    daily_focus_minutes = sum(s.duration_minutes for s in daily_focus_sessions)

    # Weekly Focus Minutes
    week_sessions = FocusSession.query.filter(
        FocusSession.user_id == user_id,
        FocusSession.start_time >= start_of_week
    ).all()
    week_focus_minutes = sum(s.duration_minutes for s in week_sessions)

    results = []
    for quest in quests:
        progress = 0
        if quest.quest_type == 'daily_task':
            progress = daily_tasks_count
        elif quest.quest_type == 'daily_focus':
            progress = daily_focus_minutes
        elif quest.quest_type == 'weekly_focus':
            progress = week_focus_minutes 
            
        is_completed = progress >= quest.target
        is_claimed = quest.id in claimed_ids
        
        results.append({
            'id': quest.id,
            'title': quest.title,
            'description': quest.description,
            'progress': progress,
            'target': quest.target,
            'completed': is_completed,
            'claimed': is_claimed,
            'xp_reward': quest.xp_reward,
            'type': quest.quest_type
        })
        
    return jsonify(results)

@api.route('/users/<int:user_id>/quests/<int:quest_id>/claim', methods=['POST'])
@token_required
def claim_quest(current_user, user_id, quest_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    # Verify eligibility again (security)
    # ... (Reuse logic from get_user_quests or abstract it)
    # For MVP, we'll trust the check here but ideally we recalculate
    
    # Check if already claimed TODAY
    today = datetime.utcnow().date()
    start_of_day = datetime(today.year, today.month, today.day)
    
    existing = UserQuest.query.filter(
        UserQuest.user_id == user_id, 
        UserQuest.quest_id == quest_id,
        UserQuest.claimed_at >= start_of_day
    ).first()
    if existing:
        return jsonify({'error': 'Already claimed'}), 400
        
    quest = Quest.query.get_or_404(quest_id)
    user = User.query.get_or_404(user_id)
    
    # Recalculate progress to be safe
    today = datetime.utcnow().date()
    start_of_day = datetime(today.year, today.month, today.day)
    
    progress = 0
    if quest.quest_type == 'daily_task':
        progress = Task.query.filter(
            Task.user_id == user_id,
            Task.is_completed == True,
            Task.completed_at >= start_of_day
        ).count()
    elif quest.quest_type == 'daily_focus':
        sessions = FocusSession.query.filter(
            FocusSession.user_id == user_id,
            FocusSession.start_time >= start_of_day
        ).all()
        progress = sum(s.duration_minutes for s in sessions)
    elif quest.quest_type == 'weekly_focus':
        start_of_week = start_of_day - timedelta(days=today.weekday())
        sessions = FocusSession.query.filter(
            FocusSession.user_id == user_id,
            FocusSession.start_time >= start_of_week
        ).all()
        progress = sum(s.duration_minutes for s in sessions)
        
    if progress < quest.target:
        return jsonify({'error': 'Quest not completed'}), 400
        
    # Award XP
    user.xp += quest.xp_reward
    new_claim = UserQuest(user_id=user_id, quest_id=quest_id)
    db.session.add(new_claim)
    db.session.commit()
    
    # Check Level Up & Badges
    check_level_up(user)
    check_badges(user)
    
    return jsonify({'message': 'Quest claimed', 'xp_gained': quest.xp_reward})

# Badge Endpoints
@api.route('/badges', methods=['GET'])
def get_badges():
    badges = Badge.query.all()
    return jsonify([badge.to_dict() for badge in badges])

@api.route('/badges', methods=['POST'])
@admin_required
def create_badge():
    data = request.get_json()
    new_badge = Badge(
        code=data['code'],
        name=data['name'],
        description=data.get('description')
    )
    db.session.add(new_badge)
    db.session.commit()
    return jsonify(new_badge.to_dict()), 201

# Gift Endpoints
@api.route('/gifts', methods=['GET'])
def get_gifts():
    gifts = Gift.query.all()
    return jsonify([gift.to_dict() for gift in gifts])

@api.route('/gifts', methods=['POST'])
@admin_required
def create_gift():
    data = request.get_json()
    new_gift = Gift(
        code=data['code'],
        name=data['name'],
        description=data.get('description'),
        xp_required=data.get('xp_required', 0),
        rarity=data.get('rarity', 'common')
    )
    db.session.add(new_gift)
    db.session.commit()
    return jsonify(new_gift.to_dict()), 201

@api.route('/users/<int:user_id>/gifts', methods=['GET'])
@token_required
def get_user_gifts(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    user_gifts = UserGift.query.filter_by(user_id=user_id).all()
    # Return the actual Gift objects, not just the association
    return jsonify([ug.gift.to_dict() for ug in user_gifts])

@api.route('/users/<int:user_id>/gifts', methods=['POST'])
@token_required
def unlock_gift(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    data = request.get_json()
    gift_id = data.get('gift_id')
    
    if not gift_id:
        return jsonify({'error': 'Gift ID is required'}), 400

    # Atomic Transaction with Row Locking
    try:
        # Lock the user row for update
        user = db.session.query(User).with_for_update().get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        gift = Gift.query.get_or_404(gift_id)

        # Check if already unlocked
        existing = UserGift.query.filter_by(user_id=user_id, gift_id=gift_id).first()
        if existing:
            return jsonify({'error': 'Gift already unlocked'}), 400

        # Check XP
        if user.xp < gift.xp_required:
            return jsonify({'error': 'Insufficient XP'}), 400

        # Deduct XP and Unlock
        user.xp -= gift.xp_required
        new_user_gift = UserGift(user_id=user_id, gift_id=gift_id)
        
        db.session.add(new_user_gift)
        db.session.commit()

        # Check for 'Gift Wrapper' badge
        check_badges(user)

        return jsonify({
            'message': 'Gift unlocked successfully',
            'user': user.to_dict(),
            'gift': gift.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Transaction failed'}), 500

# Announcement Endpoints
@api.route('/announcements', methods=['GET'])
def get_announcements():
    announcements = Announcement.query.filter_by(is_active=True).order_by(Announcement.created_at.desc()).all()
    return jsonify([a.to_dict() for a in announcements])

@api.route('/announcements', methods=['POST'])
@admin_required
def create_announcement():
    data = request.get_json()
    # Deactivate other announcements maybe? Or just keep one active.
    # For now, let's deactivate all others if a new one is created.
    Announcement.query.update({Announcement.is_active: False})
    
    new_a = Announcement(content=data['content'])
    db.session.add(new_a)
    db.session.commit()
    return jsonify(new_a.to_dict()), 201

@api.route('/announcements/clear', methods=['POST'])
@admin_required
def clear_announcements():
    Announcement.query.update({Announcement.is_active: False})
    db.session.commit()
    return jsonify({'message': 'Announcements cleared'})

# Manual Reward Endpoint
@api.route('/users/<int:user_id>/reward', methods=['POST'])
@admin_required
def manual_reward(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    xp_bonus = data.get('xp', 0)
    badge_code = data.get('badge_code')
    
    if xp_bonus:
        user.xp += xp_bonus
        check_level_up(user)
    
    if badge_code:
        badge = Badge.query.filter_by(code=badge_code).first()
        if badge:
            existing = UserBadge.query.filter_by(user_id=user.id, badge_id=badge.id).first()
            if not existing:
                new_ub = UserBadge(user_id=user.id, badge_id=badge.id)
                db.session.add(new_ub)
        
    db.session.commit()
    return jsonify({'message': 'Reward granted successfully', 'user': user.to_dict()})

@api.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    # Get top 20 users by level then xp
    top_users = User.query.filter_by(is_blocked=False).order_by(User.level.desc(), User.xp.desc()).limit(20).all()
    return jsonify([user.to_dict() for user in top_users])

@api.route('/users/<int:user_id>/focus_history', methods=['GET'])
@token_required
def get_focus_history(current_user, user_id):
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
        
    # Get daily focus minutes for the last 7 days
    today = datetime.utcnow().date()
    history = []
    
    for i in range(6, -1, -1):
        day = today - timedelta(days=i)
        start_of_day = datetime(day.year, day.month, day.day)
        end_of_day = start_of_day + timedelta(days=1)
        
        sessions = FocusSession.query.filter(
            FocusSession.user_id == user_id,
            FocusSession.start_time >= start_of_day,
            FocusSession.start_time < end_of_day
        ).all()
        
        daily_minutes = sum(s.duration_minutes for s in sessions)
        history.append({
            'day': day.strftime('%a'),
            'minutes': daily_minutes
        })
        
    return jsonify(history)
