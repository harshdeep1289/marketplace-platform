# Multi-Marketplace Platform

A comprehensive C2C marketplace platform with 4 main sections: **Deals**, **Coupons**, **Products**, and **Services**.

---

## ⚡ Quick Start

Get running in 3 commands:

```bash
# 1. Install everything
npm run install:all

# 2. Set up environment
cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env

# 3. Start everything (Database + Backend + Frontend)
npm run dev:full
```

**That's it!** Open http://localhost:3000

See [QUICKSTART.md](./QUICKSTART.md) for detailed guide.

---

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) - Responsive web interface
- **Backend**: Node.js + NestJS - Modular REST API
- **Database**: PostgreSQL - Relational data storage
- **Search**: Meilisearch - Fast full-text search
- **Cache**: Redis - Session & trending data
- **Storage**: S3-compatible - Image uploads

## 📁 Project Structure

```
marketplace-platform/
├── frontend/          # Next.js application
├── backend/           # NestJS API server
├── database/          # SQL migrations & seeds
├── docs/              # Documentation & diagrams
├── docker-compose.yml # Full stack orchestration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+ (or use Docker)

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the .env files with your configuration
```

### 3. Install Dependencies

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all
```

### 4. Start Everything with One Command 🚀

```bash
# This starts Database, Redis, Meilisearch, Backend & Frontend all at once!
npm run dev:full
```

**Alternative: Docker Only**
```bash
# Start all services in Docker (backend & frontend also in containers)
docker-compose up -d
```

**Alternative: Manual (Multiple Terminals)**
```bash
# Terminal 1 - Services only
npm run services

# Terminal 2 - Backend
npm run backend

# Terminal 3 - Frontend
npm run frontend
```

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Docs**: http://localhost:4000/api/docs
- **Meilisearch**: http://localhost:7700

## 🎯 Features

### Core Marketplace Sections

1. **Deals** - Discounted bundles and offers with expiry
2. **Coupons** - Voucher codes and promotional offers
3. **Products** - Buy/sell items (OLX-style)
4. **Services** - Hire providers for skills/services

### Key Features

- ✅ Unified global search across all sections
- ✅ Location-based filtering
- ✅ User authentication (JWT)
- ✅ User profiles & ratings
- ✅ Post listings (with type selector)
- ✅ User dashboard (my listings, favorites)
- ✅ Admin moderation panel
- ✅ Responsive design (mobile + desktop)
- ✅ Image uploads
- ✅ Advanced filters per section

## 🗄️ Database Schema

See `database/schema.sql` for full schema.

### Main Tables

- `users` - User accounts and profiles
- `listings` - Unified listing table (all types)
- `deal_details` - Deal-specific data
- `coupon_details` - Coupon-specific data
- `product_details` - Product-specific data
- `service_details` - Service-specific data
- `images` - Listing images
- `reviews` - User reviews and ratings

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Listings
- `GET /api/listings` - List all (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing

### Search
- `GET /api/search?q=query&type=deal&location=city` - Global search

### User
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/listings` - User's listings
- `PUT /api/users/profile` - Update profile

### Dashboard
- `GET /api/dashboard/my-listings` - Current user's listings
- `GET /api/dashboard/favorites` - User's saved listings

See `docs/API.md` for complete API documentation.

## 🎨 Design System

The frontend uses:
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Lucide React** for icons
- Mobile-first responsive design

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## 📦 Deployment

See `docs/DEPLOYMENT.md` for production deployment guides for:
- Vercel (Frontend)
- Railway/Render (Backend)
- AWS/DigitalOcean (Full stack)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a PR

## 📄 License

MIT License - See LICENSE file

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue]
- Email: support@marketplace.com

---

**Built with ❤️ for the community**
