import requests
import time

BASE_URL = 'http://127.0.0.1:5555/api'

def test_admin_privileges():
    print("Testing Admin Privileges...")
    
    # 1. Get a user to block (e.g., user 2)
    user_id = 2
    
    # 2. Try to block without admin header (should fail)
    print("\nAttempting to block user without admin privileges...")
    response = requests.put(f"{BASE_URL}/users/{user_id}/block")
    if response.status_code == 403:
        print("Success: Access denied as expected.")
    else:
        print(f"Failure: Unexpected status code {response.status_code}")

    # 3. Block user with admin header
    print("\nBlocking user with admin privileges...")
    headers = {'X-Admin-User': 'admin'}
    response = requests.put(f"{BASE_URL}/users/{user_id}/block", headers=headers)
    if response.status_code == 200:
        print("Success: User blocked.", response.json())
    else:
        print(f"Failure: {response.text}")

    # 4. Verify user is blocked
    response = requests.get(f"{BASE_URL}/users/{user_id}")
    if response.json().get('is_blocked'):
        print("Verification: User is indeed blocked.")
    else:
        print("Verification Failed: User is not blocked.")

    # 5. Unblock user
    print("\nUnblocking user...")
    response = requests.put(f"{BASE_URL}/users/{user_id}/unblock", headers=headers)
    if response.status_code == 200:
        print("Success: User unblocked.", response.json())
    else:
        print(f"Failure: {response.text}")

    # 6. Delete user
    print("\nDeleting user...")
    # Create a dummy user to delete first so we don't mess up seeded data too much
    dummy_user = requests.post(f"{BASE_URL}/users", json={"email": "delete_me@example.com"}).json()
    dummy_id = dummy_user['id']
    
    response = requests.delete(f"{BASE_URL}/users/{dummy_id}", headers=headers)
    if response.status_code == 200:
        print("Success: User deleted.")
    else:
        print(f"Failure: {response.text}")

if __name__ == "__main__":
    time.sleep(2)
    test_admin_privileges()
