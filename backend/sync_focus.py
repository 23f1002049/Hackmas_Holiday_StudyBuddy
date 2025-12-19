from server import app
from database import db
from models import Task, FocusSession
from datetime import datetime

def sync_focus():
    with app.app_context():
        tasks = Task.query.all()
        print(f"Syncing focus seconds for {len(tasks)} tasks...")
        
        for task in tasks:
            # Calculate total seconds from completed sessions
            sessions = FocusSession.query.filter(
                FocusSession.task_id == task.id,
                FocusSession.end_time != None
            ).all()
            
            total_seconds = sum([(s.end_time - s.start_time).total_seconds() for s in sessions])
            task.accumulated_focus_seconds = int(total_seconds)
            print(f"Task {task.id}: {task.accumulated_focus_seconds}s")
            
        db.session.commit()
        print("Sync complete!")

if __name__ == "__main__":
    sync_focus()
