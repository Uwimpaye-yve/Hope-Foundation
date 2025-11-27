# Session Management System - Counselor Dashboard

## Overview
Complete session management system for counselors with scheduling, joining, note-taking, and rescheduling capabilities.

## Backend Implementation

### API Endpoints
All endpoints require JWT authentication.

#### 1. Get Counselor Sessions
```
GET /sessions/counselor
```
Returns all sessions for the authenticated counselor.

#### 2. Create Session
```
POST /sessions
Body: {
  studentId: string,
  topic: string,
  scheduledTime: Date,
  sessionType: 'video' | 'phone' | 'in-person',
  duration: string
}
```

#### 3. Update Session
```
PUT /sessions/:id
Body: UpdateSessionDto
```

#### 4. Add/Update Notes
```
PUT /sessions/:id/notes
Body: { notes: string }
```

#### 5. Reschedule Session
```
PUT /sessions/:id/reschedule
Body: { scheduledTime: Date }
```

#### 6. Update Status
```
PUT /sessions/:id/status
Body: { status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' }
```

#### 7. Get Single Session
```
GET /sessions/:id
```

## Frontend Implementation

### Features

#### 1. Schedule New Session
- Modal form with fields:
  - Student ID
  - Topic
  - Scheduled Time (datetime picker)
  - Session Type (video/phone/in-person)
- Validates all required fields
- Auto-assigns counselor from JWT token

#### 2. View Sessions
- Lists all sessions with:
  - Student name
  - Topic
  - Scheduled time
  - Status badge (Scheduled/In Progress/Completed)
  - Session type icon (video/phone)
- Real-time status updates

#### 3. Join Session
- Click "Join Session" button
- Updates status to "In Progress"
- Opens session in new tab
- Shows "Complete" button when in progress

#### 4. Add/Edit Notes
- Click "Notes" button on any session
- Modal with textarea for notes
- Saves notes to database
- Shows existing notes below session card

#### 5. Reschedule Session
- Click "Reschedule" button
- Modal shows current time
- Select new datetime
- Updates session in database

#### 6. Complete Session
- Available when session is "In Progress"
- Updates status to "Completed"
- Refreshes session list

## Usage

### Start Backend
```bash
cd Hope_server
npm run start:dev
```

### Start Frontend
```bash
cd Hope_client
npm run dev
```

### Access Counselor Dashboard
```
http://localhost:3001/dashboard/counselor
```

## Database Schema

### Session Entity
```typescript
{
  id: uuid (primary key)
  studentId: string (foreign key)
  counselorId: string (foreign key)
  topic: string
  scheduledTime: timestamp
  notes: text (nullable)
  duration: string (nullable)
  status: string (default: 'Scheduled')
  sessionType: string (default: 'video')
  createdAt: timestamp
  updatedAt: timestamp
}
```

## State Management
- Uses React hooks (useState, useEffect)
- Loads sessions on component mount
- Refreshes after each action
- Loading states for better UX

## Modals
1. **Schedule Modal** - Create new session
2. **Notes Modal** - Add/edit session notes
3. **Reschedule Modal** - Change session time

## Session Workflow
1. Counselor schedules session → Status: "Scheduled"
2. Counselor joins session → Status: "In Progress"
3. Counselor completes session → Status: "Completed"
4. Can add notes at any stage
5. Can reschedule before completion

## Next Steps
- Add student selection dropdown
- Implement video call integration
- Add session reminders/notifications
- Export session reports
- Add recurring session scheduling
