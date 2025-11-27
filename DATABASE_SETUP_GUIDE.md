# Database Setup Guide - Step by Step

## Step 1: Create Database in pgAdmin

1. **Open pgAdmin 4**
2. **Connect to your PostgreSQL server**
3. **Right-click on "Databases"** → **Create** → **Database**
4. **Database name**: `hope_platform`
5. **Click "Save"**

## Step 2: Run the Schema Script

1. **Right-click on your new `hope_platform` database**
2. **Select "Query Tool"**
3. **Copy and paste the entire content** from `Hope_server/database/schema.sql`
4. **Click the "Execute" button** (or press F5)

You should see messages like:
```
CREATE TABLE
CREATE TABLE
...
INSERT 0 3
INSERT 0 5
CREATE INDEX
...
Query returned successfully
```

## Step 3: Verify Tables Were Created

1. **Right-click on `hope_platform` database** → **Refresh**
2. **Expand**: `hope_platform` → `Schemas` → `public` → `Tables`
3. **You should see these 8 tables**:
   - achievements
   - donations  
   - materials
   - program_enrollments
   - programs
   - sessions
   - support_requests
   - users

## Step 4: Check Sample Data

1. **Right-click on `users` table** → **View/Edit Data** → **All Rows**
2. **You should see 3 sample users**:
   - admin@hopefoundation.org (Admin User)
   - counselor@hopefoundation.org (Sarah Johnson)
   - student@hopefoundation.org (Michael Chen)

3. **Right-click on `programs` table** → **View/Edit Data** → **All Rows**
4. **You should see 5 sample programs**:
   - Fun with Coding Club
   - Math & Science Explorers
   - Creative Arts & Crafts
   - Reading & Writing Adventures
   - Sports & Fitness Fun

## Step 5: Update Backend Configuration

**Edit `Hope_server/.env`** with your actual database credentials:
```env
DATABASE_URL=postgresql://postgres:your_actual_password@localhost:5432/hope_platform
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_actual_password
DATABASE_NAME=hope_platform
```

## Step 6: Test Backend Connection

1. **Open terminal in `Hope_server` folder**
2. **Run**: `npm install`
3. **Run**: `npm run start:dev`
4. **Look for this message**: `Database connected successfully`
5. **If you see errors**, check your `.env` file credentials

## Step 7: Test Frontend Connection

1. **Open new terminal in `Hope_client` folder**
2. **Run**: `npm install`
3. **Run**: `npm run dev`
4. **Visit**: http://localhost:3001/test-connection
5. **You should see**: "✅ Backend connection successful"

## Step 8: Test Login with Sample Data

**Visit**: http://localhost:3001/login

**Try these demo accounts**:
- **Admin**: admin@hopefoundation.org / password123
- **Counselor**: counselor@hopefoundation.org / password123  
- **Student**: student@hopefoundation.org / password123

## Troubleshooting

### ❌ "Database connection failed"
- Check PostgreSQL service is running
- Verify credentials in `.env` file
- Ensure database `hope_platform` exists

### ❌ "Table doesn't exist" errors
- Re-run the schema.sql script in pgAdmin
- Check all tables were created successfully

### ❌ "Login failed" errors
- Verify sample users exist in database
- Check password hashing in backend code

### ❌ "Port already in use"
- Backend (3000): `netstat -ano | findstr :3000`
- Frontend (3001): `netstat -ano | findstr :3001`
- Kill processes: `taskkill /PID <process_id> /F`

## Success Indicators

✅ **Database**: 8 tables created with sample data
✅ **Backend**: Starts without errors on port 3000
✅ **Frontend**: Loads successfully on port 3001
✅ **Connection**: Test page shows green checkmarks
✅ **Login**: Demo accounts work correctly
✅ **Dashboards**: Role-based routing works

## Next Steps After Setup

1. **Create real user accounts** through signup page
2. **Add actual programs** through admin dashboard
3. **Upload materials** for programs
4. **Test all features** (donations, support requests, etc.)
5. **Configure email service** for password resets
6. **Set up production environment** when ready

---

**Need Help?** Check the console logs in both terminals for specific error messages.