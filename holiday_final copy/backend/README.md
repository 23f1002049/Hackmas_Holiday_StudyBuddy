# Holiday Study Buddy Backend

This is the Flask backend for the Holiday Study Buddy application. It uses SQLite for the database.

## Prerequisites

- Python 3.8+
- `pip` (Python package installer)

## Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment (optional but recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Database Initialization

To create the database and populate it with sample data (Users, Tasks, Badges, Gifts, Admin):

```bash
python seed.py
```

*Note: This will drop existing tables and recreate them.*

## Running the Server

To start the Flask development server:

```bash
python app.py
```

The server will start at `http://127.0.0.1:5555`.

## Admin Access

- **Username:** `admin`
- **Password:** `admin123`

## API Endpoints

-   `POST /api/users`: Create a user
-   `GET /api/users/<id>`: Get user details
-   `POST /api/tasks`: Create a task
-   `GET /api/users/<id>/tasks`: Get user tasks
-   `POST /api/focus_sessions`: Record a focus session
-   `GET /api/badges`: List all badges
-   `GET /api/gifts`: List all gifts

### Admin Only
-   `PUT /api/users/<id>/block`: Block a user
-   `PUT /api/users/<id>/unblock`: Unblock a user
-   `DELETE /api/users/<id>`: Delete a user
