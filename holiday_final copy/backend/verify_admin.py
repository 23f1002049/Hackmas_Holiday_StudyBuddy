import requests
import time

BASE_URL = 'http://127.0.0.1:5555/api'

def test_admin_user():
    print("Testing Admin User...")
    # Since we don't have a login endpoint yet, we can check if we can fetch the admin user by ID (assuming ID 1)
    # or check if the seeding printed "Admin user created." in the server logs.
    # But better, let's just try to fetch user 1 and see if it is the admin.
    
    try:
        response = requests.get(f"{BASE_URL}/users/1")
        if response.status_code == 200:
            user = response.json()
            if user.get('username') == 'admin' and user.get('is_admin') == True:
                print("Admin user verified successfully:", user)
            else:
                print("User 1 is not admin:", user)
        else:
            print("Failed to fetch user 1:", response.text)
    except Exception as e:
        print(f"Failed to connect: {e}")

if __name__ == "__main__":
    time.sleep(2) # Wait for server restart
    test_admin_user()
