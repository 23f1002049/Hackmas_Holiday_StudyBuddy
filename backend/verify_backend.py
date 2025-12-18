import requests
import json
import time

BASE_URL = 'http://127.0.0.1:5555/api'

def test_create_user():
    print("Testing Create User...")
    payload = {
        "email": "test@example.com",
        "auth_provider": "email",
        "avatar": "http://example.com/avatar.png"
    }
    response = requests.post(f"{BASE_URL}/users", json=payload)
    if response.status_code == 201:
        print("User created successfully:", response.json())
        return response.json()['id']
    else:
        print("Failed to create user:", response.text)
        return None

def test_create_task(user_id):
    print("\nTesting Create Task...")
    payload = {
        "user_id": user_id,
        "title": "Complete Backend Verification"
    }
    response = requests.post(f"{BASE_URL}/tasks", json=payload)
    if response.status_code == 201:
        print("Task created successfully:", response.json())
        return response.json()['id']
    else:
        print("Failed to create task:", response.text)
        return None

def test_create_focus_session(user_id, task_id):
    print("\nTesting Create Focus Session...")
    payload = {
        "user_id": user_id,
        "task_id": task_id,
        "start_time": "2023-10-27T10:00:00",
        "end_time": "2023-10-27T10:25:00",
        "duration_minutes": 25
    }
    response = requests.post(f"{BASE_URL}/focus_sessions", json=payload)
    if response.status_code == 201:
        print("Focus Session created successfully:", response.json())
    else:
        print("Failed to create focus session:", response.text)

def test_badges_and_gifts():
    print("\nTesting Badges and Gifts...")
    # Create Badge
    badge_payload = {"code": "test_badge", "name": "Test Badge", "description": "A test badge"}
    requests.post(f"{BASE_URL}/badges", json=badge_payload)
    
    # Get Badges
    response = requests.get(f"{BASE_URL}/badges")
    print("Badges:", response.json())

    # Create Gift
    gift_payload = {"code": "test_gift", "name": "Test Gift", "description": "A test gift"}
    requests.post(f"{BASE_URL}/gifts", json=gift_payload)

    # Get Gifts
    response = requests.get(f"{BASE_URL}/gifts")
    print("Gifts:", response.json())

if __name__ == "__main__":
    # Wait for server to start
    time.sleep(2)
    
    try:
        user_id = test_create_user()
        if user_id:
            task_id = test_create_task(user_id)
            if task_id:
                test_create_focus_session(user_id, task_id)
            test_badges_and_gifts()
    except Exception as e:
        print(f"Verification failed: {e}")
