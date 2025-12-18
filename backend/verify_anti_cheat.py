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

def test_anti_cheat():
    print("Starting Anti-Cheat verification...")
    
    # 1. Login
    email = "test_fix@example.com"
    password = "password123"
    
    status, data = make_request("POST", f"{BASE_URL}/login", {"email": email, "password": password})
    if status != 200:
        print("Login failed, trying registration...")
        status, reg_data = make_request("POST", f"{BASE_URL}/users", {"email": email, "password": password})
        if status != 201:
             # Maybe user exists but password wrong? Or some other error.
             # Try to delete user if admin? No, just fail for now.
             raise Exception(f"Registration failed: {reg_data}")
        
        status, data = make_request("POST", f"{BASE_URL}/login", {"email": email, "password": password})
        if status != 200:
            raise Exception("Login failed after registration")
        
    token = data['token']
    user_id = data['user']['id']
    headers = {"Authorization": f"Bearer {token}"}
    
    # 2. Reset Data
    print("Resetting data...")
    make_request("POST", f"{BASE_URL}/users/{user_id}/reset", headers=headers)
    
    # 3. Create and Complete 11 Tasks
    print("Creating and completing 11 tasks...")
    for i in range(11):
        status, task = make_request("POST", f"{BASE_URL}/tasks", {"user_id": user_id, "title": f"Task {i}"}, headers=headers)
        if status != 201:
            raise Exception(f"Failed to create task {i}. Status: {status}, Body: {task}")
            
        status, _ = make_request("PUT", f"{BASE_URL}/tasks/{task['id']}", {"is_completed": True}, headers=headers)
        if status != 200:
            raise Exception(f"Failed to complete task {i}")
            
    # 4. Verify XP
    print("Verifying XP cap...")
    status, user_data = make_request("GET", f"{BASE_URL}/users/{user_id}", headers=headers)
    
    xp = user_data['xp']
    print(f"Total XP: {xp}")
    
    # Expected: 10 tasks * 10 XP = 100 XP. 11th task should give 0.
    if xp != 100:
        raise Exception(f"Anti-Cheat Failed! Expected 100 XP, got {xp}")
        
    print("Anti-Cheat verification passed!")

if __name__ == "__main__":
    try:
        test_anti_cheat()
        print("ALL TESTS PASSED")
    except Exception as e:
        print(f"TEST FAILED: {e}")
        exit(1)
