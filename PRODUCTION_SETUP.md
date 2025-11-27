# Hope Foundation - Production Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker (optional)
- pgAdmin 4

## Database Setup

### 1. Create Database in pgAdmin
1. Open pgAdmin
2. Create new database: `hope_platform`
3. Run the SQL script: `Hope_server/database/schema.sql`

### 2. Update Environment Variables
Edit `Hope_server/.env`:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/hope_platform
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_actual_password
JWT_SECRET=your-super-secret-production-key
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

## Installation & Setup

### Option 1: Manual Setup
```bash
# Install all dependencies
npm run install:all

# Setup database (ensure PostgreSQL is running)
npm run db:setup

# Start development
npm run dev

# Build for production
npm run build

# Start production
npm run start
```

### Option 2: Docker Setup
```bash
# Build and start all services
npm run docker:build
npm run docker:up

# Stop services
npm run docker:down
```

## Production Configuration

### 1. Environment Variables
Update both `.env` files with production values:
- Database credentials
- JWT secrets
- Email configuration
- API URLs

### 2. Security Setup
- Enable HTTPS
- Configure CORS for production domains
- Set up SSL certificates
- Configure firewall rules

### 3. File Storage
- Local: Files stored in `uploads/` directory
- Production: Consider AWS S3 or similar cloud storage

### 4. Email Service
- Development: Gmail SMTP
- Production: SendGrid, AWS SES, or similar service

## Features Implemented

✅ **Database Integration**: PostgreSQL with full schema
✅ **File Upload/Download**: Material management system
✅ **Security**: Rate limiting, CORS, JWT authentication
✅ **Email Service**: Password reset functionality
✅ **Docker Support**: Full containerization
✅ **Production Scripts**: Build and deployment ready
✅ **Environment Configuration**: Development and production configs

## Testing Production Setup

1. **Database Connection**: Check if data persists after restart
2. **File Upload**: Test material upload in admin panel
3. **Email Service**: Test password reset emails
4. **Authentication**: Verify JWT tokens work correctly
5. **API Endpoints**: Test all CRUD operations
6. **Security**: Verify rate limiting works

## Deployment Options

### Vercel (Frontend)
```bash
cd Hope_client
vercel --prod
```

### Railway/Heroku (Backend)
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### AWS/DigitalOcean (Full Stack)
- Use Docker Compose
- Configure load balancer
- Set up SSL certificates

## Monitoring & Logging

- Application logs: Check console outputs
- Database logs: Monitor PostgreSQL logs
- Error tracking: Consider Sentry integration
- Performance: Monitor API response times

## Backup Strategy

- Database: Regular PostgreSQL backups
- Files: Backup uploads directory
- Code: Git repository with tags
- Environment: Secure backup of .env files