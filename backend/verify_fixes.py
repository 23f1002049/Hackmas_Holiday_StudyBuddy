import json
import urllib.request
import urllib.error
import datetime

BASE_URL = "http://127.0.0.1:5555/api"

def make_request(method, url, data=None, headers=None):
    if headers is None:
        headers = {}
    
    if data is not None:
        data_bytes = json.dumps(data).encode('utf-8')
        headers['Content-Type'] = 'application/json'
    else:
        data_bytes = None
        
    req = urllib.request.Request(url, data=data_bytes, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            status = response.status
            body = response.read().decode('utf-8')
            if body:
                return status, json.loads(body)
            return status, {}
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        try:
            return e.code, json.loads(body)
        except:
            return e.code, body

def test_fixes():
    print("Starting verification...")
    
    # 1. Register/Login User
    email = "test_fix@example.com"
    password = "password123"
    
    print("Logging in...")
    status, data = make_request("POST", f"{BASE_URL}/login", {"email": email, "password": password})
    
    if status != 200:
        print("Login failed, trying registration...")
        status, reg_data = make_request("POST", f"{BASE_URL}/users", {"email": email, "password": password})
        if status != 201:
            raise Exception(f"Registration failed: {reg_data}")
        
        status, data = make_request("POST", f"{BASE_URL}/login", {"email": email, "password": password})
        
    if status != 200:
        raise Exception(f"Login failed: {data}")
        
    token = data['token']
    user_id = data['user']['id']
    headers = {"Authorization": f"Bearer {token}"}
    
    print(f"User ID: {user_id}")
    
    # 2. Reset Data First
    print("Resetting data...")
    status, _ = make_request("POST", f"{BASE_URL}/users/{user_id}/reset", headers=headers)
    if status != 200:
        raise Exception("Reset failed")
    
    # 3. Create Task
    print("Creating task...")
    status, task_data = make_request("POST", f"{BASE_URL}/tasks", {"user_id": user_id, "title": "Test Task"}, headers=headers)
    if status != 201:
        raise Exception(f"Create task failed: {task_data}")
    task_id = task_data['id']
    
    # 4. Complete Task
    print("Completing task...")
    status, _ = make_request("PUT", f"{BASE_URL}/tasks/{task_id}", {"is_completed": True}, headers=headers)
    if status != 200:
        raise Exception("Complete task failed")
    
    # 5. Create Focus Session (30 mins)
    print("Creating focus session...")
    end_time = datetime.datetime.utcnow()
    start_time = end_time - datetime.timedelta(minutes=30)
    
    status, session_data = make_request("POST", f"{BASE_URL}/focus_sessions", {
        "user_id": user_id,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "duration_minutes": 30
    }, headers=headers)
    
    if status != 201:
        raise Exception(f"Create session failed: {session_data}")
    
    # 6. Verify Stats
    print("Verifying stats...")
    status, user_data = make_request("GET", f"{BASE_URL}/users/{user_id}", headers=headers)
    if status != 200:
        raise Exception("Get user failed")
    
    print("User Stats:", json.dumps(user_data, indent=2))
    
    if user_data.get('tasks_completed_count') != 1:
        raise Exception(f"Expected 1 completed task, got {user_data.get('tasks_completed_count')}")
        
    if user_data.get('today_focus_minutes') != 30:
        raise Exception(f"Expected 30 focus minutes, got {user_data.get('today_focus_minutes')}")
    
    print("Stats verification passed!")
    
    # 7. Test Reset
    print("Testing reset...")
    status, _ = make_request("POST", f"{BASE_URL}/users/{user_id}/reset", headers=headers)
    if status != 200:
        raise Exception("Reset failed")
    
    # 8. Verify Reset
    print("Verifying reset...")
    status, user_data = make_request("GET", f"{BASE_URL}/users/{user_id}", headers=headers)
    
    if user_data.get('tasks_completed_count') != 0:
        raise Exception("Reset failed: tasks count not 0")
    if user_data.get('today_focus_minutes') != 0:
        raise Exception("Reset failed: focus minutes not 0")
    if user_data.get('xp') != 0:
        raise Exception("Reset failed: xp not 0")
    
    print("Reset verification passed!")

if __name__ == "__main__":
    try:
        test_fixes()
        print("ALL TESTS PASSED")
    except Exception as e:
        print(f"TEST FAILED: {e}")
        exit(1)
