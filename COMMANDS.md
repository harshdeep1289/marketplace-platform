# 📋 All Available Commands

Complete reference for all npm scripts in this project.

---

## 🚀 Development Commands

### Start Everything (One Command)

```bash
npm run dev:full
```

**Starts:**
- PostgreSQL (Docker)
- Redis (Docker)
- Meilisearch (Docker)
- Backend API (port 4000) with hot reload
- Frontend (port 3000) with hot reload

**All in one terminal!**

---

### Start Individual Components

```bash
# Database services only (PostgreSQL + Redis + Meilisearch)
npm run services

# Backend API only
npm run backend

# Frontend only
npm run frontend
```

---

## 📦 Installation Commands

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all

# Or install individually:
cd backend && npm install    # Backend only
cd frontend && npm install   # Frontend only
```

---

## 🐳 Docker Commands

```bash
# Start all services in Docker containers
npm run docker:up

# Stop all Docker containers
npm run docker:down

# View Docker logs (follow mode)
npm run docker:logs

# Or use Docker Compose directly:
docker-compose up -d                    # Start detached
docker-compose down                     # Stop all
docker-compose logs -f backend          # View backend logs
docker-compose logs -f frontend         # View frontend logs
docker-compose restart backend          # Restart backend only
```

---

## 🏗️ Build Commands

```bash
# Build both backend and frontend
npm run build:all

# Or build individually:
cd backend && npm run build     # Backend only
cd frontend && npm run build    # Frontend only
```

---

## 🧪 Testing Commands

```bash
# Backend tests
cd backend
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:cov       # With coverage

# Frontend tests
cd frontend
npm run test           # Run all tests
```

---

## 🔧 Backend-Specific Commands

```bash
cd backend

# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start in debug mode
npm run start:prod     # Production mode

# Database
npm run migration:generate -- MigrationName   # Create migration
npm run migration:run                         # Run migrations
npm run migration:revert                      # Revert last migration

# Code Quality
npm run lint           # Check linting
npm run format         # Format code with Prettier
```

---

## 🎨 Frontend-Specific Commands

```bash
cd frontend

# Development
npm run dev            # Start dev server
npm run build          # Build for production
npm run start          # Start production server

# Code Quality
npm run lint           # Check linting
```

---

## 🗄️ Database Commands

### Access PostgreSQL

```bash
# Via Docker
docker exec -it marketplace-postgres psql -U postgres -d marketplace

# Direct connection (if not using Docker)
psql -U postgres -d marketplace
```

### Database Operations

```bash
# Backup database
docker exec marketplace-postgres pg_dump -U postgres marketplace > backup.sql

# Restore database
docker exec -i marketplace-postgres psql -U postgres marketplace < backup.sql

# Reset database (WARNING: Deletes all data!)
docker-compose down -v
docker-compose up -d postgres
cd backend && npm run migration:run
```

---

## 🔍 Search (Meilisearch) Commands

### Check Indexes

```bash
curl http://localhost:7700/indexes \
  -H "Authorization: Bearer masterKey"
```

### Delete Index

```bash
curl -X DELETE http://localhost:7700/indexes/listings \
  -H "Authorization: Bearer masterKey"
```

### Create Index (via API)

Backend service should handle this automatically.

---

## 🧹 Cleanup Commands

### Clean Node Modules

```bash
# Root
rm -rf node_modules

# Backend
rm -rf backend/node_modules

# Frontend
rm -rf frontend/node_modules

# All at once
rm -rf node_modules backend/node_modules frontend/node_modules
```

### Clean Build Artifacts

```bash
# Backend
rm -rf backend/dist

# Frontend
rm -rf frontend/.next frontend/out

# All at once
rm -rf backend/dist frontend/.next frontend/out
```

### Clean Docker Volumes

```bash
# Stop and remove volumes (WARNING: Deletes database data!)
docker-compose down -v

# Prune unused Docker resources
docker system prune -a
```

---

## 🔍 Debugging Commands

### Check Running Processes

```bash
# Check what's running on port 3000
lsof -ti:3000

# Check what's running on port 4000
lsof -ti:4000

# Check what's running on port 5432 (PostgreSQL)
lsof -ti:5432
```

### Kill Process on Port

```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Kill port 4000
lsof -ti:4000 | xargs kill -9
```

### View Backend Logs

```bash
# If running with npm run dev:full
# Logs appear in the same terminal

# If running with Docker
npm run docker:logs
# Or specific service:
docker-compose logs -f backend
```

---

## 🌐 Environment Setup

### Copy Environment Files

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env

# Both at once
cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env
```

### Edit Environment Variables

```bash
# macOS/Linux
nano backend/.env
nano frontend/.env

# Or use your favorite editor
code backend/.env
code frontend/.env
```

---

## 📊 Production Commands

### Build for Production

```bash
# Build everything
npm run build:all

# Or individually:
cd backend && npm run build
cd frontend && npm run build
```

### Run Production

```bash
# Backend
cd backend && npm run start:prod

# Frontend
cd frontend && npm start

# Or with PM2 (recommended for production)
pm2 start backend/dist/main.js --name marketplace-backend
pm2 start frontend/npm --name marketplace-frontend -- start
```

---

## 📝 Git Commands (Recommended)

```bash
# Initial setup
git init
git add .
git commit -m "feat: initial marketplace platform setup"

# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature
```

---

## 🎯 Most Common Workflows

### First Time Setup

```bash
npm run install:all
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev:full
```

### Daily Development

```bash
npm run dev:full
# Edit code, changes auto-reload
# Ctrl+C to stop
```

### Before Committing

```bash
cd backend && npm run lint && npm run test
cd frontend && npm run lint && npm run build
```

### Deploy to Production

```bash
npm run build:all
# Deploy dist/ and .next/ folders to your hosting
```

---

## 🆘 Emergency Commands

### Nothing Works?

```bash
# Nuclear option: Clean everything and restart
docker-compose down -v
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf backend/dist frontend/.next
npm run install:all
npm run dev:full
```

### Port Already in Use?

```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
lsof -ti:5432 | xargs kill -9
npm run dev:full
```

---

## 💡 Pro Tips

1. **Use `npm run dev:full`** - It's the easiest way to develop
2. **Keep Docker Desktop running** - Required for database services
3. **Use VS Code** - Best IDE for this stack
4. **Check logs often** - `npm run docker:logs` in separate terminal
5. **Commit often** - Small, focused commits are better

---

**Need more help?** See [QUICKSTART.md](./QUICKSTART.md) or [docs/SETUP.md](./docs/SETUP.md)
