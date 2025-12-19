from server import app
from database import db
from sqlalchemy import text
import os

def migrate():
    with app.app_context():
        print(f"Starting migration for DB: {app.config['SQLALCHEMY_DATABASE_URI'].split(':')[0]}...")
        
        # 1. Check if column exists
        try:
            # Attempt to select the column to see if it exists
            db.session.execute(text('SELECT lifetime_xp FROM "user" LIMIT 1'))
            print("✅ Column 'lifetime_xp' already exists.")
        except Exception:
            print("⚠️ Column 'lifetime_xp' missing. Adding it...")
            db.session.rollback() # Clear the error transaction
            
            # 2. Add column
            try:
                # Add column with default value 0
                db.session.execute(text('ALTER TABLE "user" ADD COLUMN lifetime_xp INTEGER DEFAULT 0'))
                db.session.commit()
                print("✅ Column 'lifetime_xp' added successfully.")
            except Exception as e:
                print(f"❌ Error adding column: {e}")
                return

        # 3. Backfill data
        print("🔄 Syncing lifetime_xp with existing xp...")
        try:
            # Set lifetime_xp = xp for all users where it's 0 or null
            result = db.session.execute(text('UPDATE "user" SET lifetime_xp = xp'))
            db.session.commit()
            print(f"✅ Data synced successfully. Affected rows: {result.rowcount}")
        except Exception as e:
            print(f"❌ Error backfilling data: {e}")

if __name__ == "__main__":
    migrate()
