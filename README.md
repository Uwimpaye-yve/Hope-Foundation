# Hope Foundation - Full Stack Application

## Project Structure
- **Hope_server**: NestJS backend API (Port 3000)
- **Hope_client**: Next.js frontend (Port 3001)

## Quick Start

### 1. Start Backend Server
```bash
cd Hope_server
npm install
npm run start:dev
```
Backend will run on: http://localhost:3000

### 2. Start Frontend Client
```bash
cd Hope_client
npm install
npm run dev
```
Frontend will run on: http://localhost:3001

### 3. Alternative: Use Batch Scripts (Windows)
- Double-click `start-backend.bat` to start the backend
- Double-click `start-frontend.bat` to start the frontend

## Dashboard Features

### Student Dashboard
- **URL**: http://localhost:3001/dashboard/student
- **Features**:
  - Personal stats (programs active, sessions done, hours this week, achievements)
  - Program progress tracking
  - Upcoming sessions
  - Support request system
  - Achievement tracking

### Counselor Dashboard  
- **URL**: http://localhost:3001/dashboard/counselor
- **Features**:
  - Assigned students management
  - Session scheduling and notes
  - Support request handling
  - Student progress monitoring

### Admin Dashboard
- **URL**: http://localhost:3001/dashboard/admin
- **Features**:
  - Overall system statistics
  - Student management
  - Program oversight
  - Analytics and reporting

## API Endpoints

### Dashboard APIs
- `GET /api/dashboard/stats` - Admin dashboard stats
- `GET /api/dashboard/student/stats` - Student dashboard stats
- `GET /api/dashboard/student/programs` - Student programs
- `GET /api/dashboard/student/sessions` - Student sessions
- `GET /api/dashboard/counselor/stats` - Counselor dashboard stats
- `GET /api/dashboard/counselor/students` - Counselor's assigned students
- `GET /api/dashboard/counselor/sessions` - Counselor's sessions
- `GET /api/dashboard/counselor/support-requests` - Support requests

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

## Testing Connection
Visit http://localhost:3001/test-connection to test the API connectivity between frontend and backend.

## Environment Configuration
- Backend: `Hope_server/.env`
- Frontend: `Hope_client/.env.local`

## Technologies Used
- **Backend**: NestJS, TypeScript, JWT Authentication
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL (configured but not required for basic functionality)

## Development Notes
- Backend uses JWT authentication for protected routes
- Frontend includes loading states and error handling
- Mock data is provided for development/testing
- CORS is configured to allow frontend-backend communication