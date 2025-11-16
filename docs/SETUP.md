# Complete Setup Guide

## Prerequisites

Ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Docker & Docker Compose** - [Download](https://www.docker.com/)
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL 15+** (optional if using Docker)

---

## Quick Start (Recommended)

### 1. Navigate to Project

```bash
cd ~/marketplace-platform
```

### 2. Install All Dependencies

```bash
npm run install:all
```

This installs dependencies for:
- Root (concurrently)
- Backend (NestJS + dependencies)
- Frontend (Next.js + dependencies)

### 3. Set Up Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your settings

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your settings
```

### 4. Start Everything with One Command 🚀

```bash
npm run dev:full
```

**This single command starts:**
- PostgreSQL (port 5432)
- Redis (port 6379)
- Meilisearch (port 7700)
- Backend API (port 4000) - with hot reload
- Frontend (port 3000) - with hot reload

**All in one terminal!**

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Documentation**: http://localhost:4000/api/docs
- **Meilisearch**: http://localhost:7700

---

## Manual Setup (Without Docker)

### 1. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 2. Database Setup

Start PostgreSQL and create the database:

```sql
CREATE DATABASE marketplace;
```

Run the schema:

```bash
psql -U postgres -d marketplace -f database/schema.sql
```

### 3. Start Services Manually

#### Terminal 1 - PostgreSQL (if not already running)

```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

#### Terminal 2 - Redis

```bash
redis-server
```

#### Terminal 3 - Meilisearch

```bash
docker run -d \
  --name meilisearch \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY=masterKey \
  getmeili/meilisearch:v1.5
```

#### Terminal 4 - Backend

```bash
cd backend
npm run start:dev
```

#### Terminal 5 - Frontend

```bash
cd frontend
npm run dev
```

---

## Environment Variables

### Backend (.env)

```bash
# Server
NODE_ENV=development
PORT=4000
API_PREFIX=api

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=marketplace

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Meilisearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=masterKey

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=Marketplace
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Database Migrations

### Create Migration

```bash
cd backend
npm run migration:generate -- MigrationName
```

### Run Migrations

```bash
npm run migration:run
```

### Revert Migration

```bash
npm run migration:revert
```

---

## Testing

### Backend Tests

```bash
cd backend
npm run test
npm run test:watch  # Watch mode
npm run test:cov    # With coverage
```

### Frontend Tests

```bash
cd frontend
npm run test
```

---

## Building for Production

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

---

## Common Issues & Solutions

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Database Connection Error

1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database exists: `psql -l`

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: Deletes data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# View logs
docker-compose logs -f
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## Useful Commands

### Docker

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose stop

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart specific service
docker-compose restart backend

# Access container shell
docker exec -it marketplace-backend sh
docker exec -it marketplace-postgres psql -U postgres
```

### Database

```bash
# Access PostgreSQL
docker exec -it marketplace-postgres psql -U postgres -d marketplace

# Backup database
docker exec marketplace-postgres pg_dump -U postgres marketplace > backup.sql

# Restore database
docker exec -i marketplace-postgres psql -U postgres marketplace < backup.sql
```

### Meilisearch

```bash
# Check indexes
curl http://localhost:7700/indexes \
  -H "Authorization: Bearer masterKey"

# Delete index
curl -X DELETE http://localhost:7700/indexes/listings \
  -H "Authorization: Bearer masterKey"
```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit code in `backend/` or `frontend/`

### 3. Test Locally

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

---

## API Testing with cURL

### Register User

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Listings

```bash
curl http://localhost:4000/api/listings?type=deal&limit=10
```

---

## Performance Monitoring

### Backend

- API response times in Swagger docs
- Database query logs (when `NODE_ENV=development`)

### Frontend

```bash
# Lighthouse audit
npm run build
npx lighthouse http://localhost:3000
```

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use strong database passwords
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting properly
- [ ] Validate all user inputs
- [ ] Sanitize HTML content
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Regular dependency updates: `npm audit fix`

---

## Next Steps

1. **Customize Design**: Modify Tailwind colors in `frontend/tailwind.config.ts`
2. **Add Features**: Extend API endpoints in `backend/src/`
3. **Configure Storage**: Set up S3 or compatible service for images
4. **Set Up CI/CD**: GitHub Actions or GitLab CI
5. **Deploy**: Follow `docs/DEPLOYMENT.md`

---

## Getting Help

- Check `docs/API.md` for API documentation
- Review `README.md` for project overview
- Open an issue on GitHub
- Contact: support@marketplace.com
