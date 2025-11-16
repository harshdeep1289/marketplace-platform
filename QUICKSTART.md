# ⚡ Quick Start Guide

Get your marketplace running in **3 commands**!

## Prerequisites

Make sure you have installed:
- **Node.js 18+** → [nodejs.org](https://nodejs.org/)
- **Docker Desktop** → [docker.com](https://www.docker.com/)

## 🚀 Three Steps to Launch

### 1️⃣ Install Dependencies

```bash
cd ~/marketplace-platform
npm run install:all
```

This installs everything needed for the entire stack.

### 2️⃣ Set Up Environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

> The example files have sensible defaults. You can edit them later if needed.

### 3️⃣ Start Everything

```bash
npm run dev:full
```

**That's it!** 🎉

This single command starts:
- ✅ PostgreSQL database
- ✅ Redis cache
- ✅ Meilisearch engine
- ✅ Backend API (with hot reload)
- ✅ Frontend app (with hot reload)

## 🌐 Access Your App

Open your browser:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Docs**: http://localhost:4000/api/docs

## 🛠️ Available Commands

```bash
# Start everything (recommended)
npm run dev:full

# Or start components separately:
npm run services    # Just database services
npm run backend     # Just backend API
npm run frontend    # Just frontend app

# Docker commands:
npm run docker:up   # Start all in Docker containers
npm run docker:down # Stop all Docker containers
npm run docker:logs # View Docker logs

# Build for production:
npm run build:all   # Build backend + frontend
```

## 🔥 Hot Reload Enabled

Both frontend and backend support hot reload:
- Edit files in `frontend/` → Browser auto-refreshes
- Edit files in `backend/` → API auto-restarts

## 🐛 Troubleshooting

### Port Already in Use?

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Docker Issues?

```bash
# Reset Docker
npm run docker:down
docker system prune -a
npm run docker:up
```

### Clean Install?

```bash
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
```

## 📚 Next Steps

1. **Explore the Homepage**: http://localhost:3000
2. **Check API Docs**: http://localhost:4000/api/docs
3. **Read Full Setup Guide**: See `docs/SETUP.md`
4. **View Project Roadmap**: See `PROJECT_SUMMARY.md`

## 💡 Pro Tips

- Use **VS Code** for best development experience
- Install **Postman** to test API endpoints
- Keep Docker Desktop running in background
- Use separate terminal for `npm run docker:logs` to monitor

---

**Need Help?** Check `docs/SETUP.md` or `PROJECT_SUMMARY.md`

Happy coding! 🚀
