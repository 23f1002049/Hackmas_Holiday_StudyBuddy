from app import create_app
from models import User

app = create_app()

def list_users():
    with app.app_context():
        users = User.query.all()
        print(f"Total users found: {len(users)}")
        print("-" * 30)
        for user in users:
            print(f"ID: {user.id} | Username: {user.username} | Email: {user.email} | Admin: {user.is_admin}")
        print("-" * 30)

if __name__ == "__main__":
    list_users()
