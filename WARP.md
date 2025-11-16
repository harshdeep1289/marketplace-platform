# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

Monorepo for a C2C multi-marketplace platform with four sections (Deals, Coupons, Products, Services):

- **Frontend (`frontend/`)**: Next.js 14 App Router UI, Tailwind CSS, shadcn-style components.
- **Backend (`backend/`)**: NestJS 10 REST API with TypeORM entities for users, listings, and type-specific details.
- **Database (`database/`)**: SQL schema for PostgreSQL.
- **Docs (`docs/`, `QUICKSTART.md`)**: Detailed setup, API, and UI guides.

> Note: The docs and Docker setup assume **PostgreSQL**, but `backend/src/app.module.ts` currently configures TypeORM with `type: 'mongodb'` and `MONGODB_URI`. Be careful when modifying persistence code – you may need to reconcile this discrepancy with the intended PostgreSQL schema in `database/schema.sql`.

## Architecture and Code Structure

### Backend (NestJS API)

- Entrypoint: `backend/src/main.ts`
  - Reads `API_PREFIX` (defaults to `api`) and `PORT` (defaults to `4000`).
  - Enables CORS with `CORS_ORIGIN` (defaults to `http://localhost:3000`).
  - Sets up global validation via `ValidationPipe` (whitelisting, forbidding non-whitelisted fields, transforming payloads).
  - Exposes Swagger docs at `/{API_PREFIX}/docs`.
- Root module: `backend/src/app.module.ts`
  - **ConfigModule**: global, loads `.env`.
  - **TypeOrmModule**: configured for MongoDB via `MONGODB_URI`, with entities auto-loaded from `**/*.entity.{ts,js}` and `synchronize/logging` gated by `NODE_ENV`.
  - **ThrottlerModule**: global rate limiting using `THROTTLE_TTL` and `THROTTLE_LIMIT` (defaults in code match the values described in `docs/API.md`).
  - Feature modules:
    - `AuthModule` – authentication (JWT + password hashing).
    - `UsersModule` – user entity registration with TypeORM.
    - `ListingsModule` – core marketplace listings and CRUD.
    - `SearchModule` – currently a placeholder module; the intended Meilisearch-backed search API is described in `docs/API.md`.

#### Domain model: Listings & users

- `backend/src/users/entities/user.entity.ts` (via `UsersModule`) defines the core `User` with fields for identity, profile, and relationships (e.g., `listings`).
- `backend/src/listings/entities/listing.entity.ts` models **all listing types in a single table/collection**:
  - `ListingType` enum: `deal`, `coupon`, `product`, `service`.
  - Location fields (`location_city`, `location_state`, `location_country`, `location_lat`, `location_lng`).
  - Status and counters: `ListingStatus` enum (`active`, `inactive`, `blocked`, `expired`, `sold`), `views_count`, `favorites_count`.
  - Type-specific relations (all eager-loaded):
    - `deal_detail` → `DealDetail` entity.
    - `coupon_detail` → `CouponDetail`.
    - `product_detail` → `ProductDetail`.
    - `service_detail` → `ServiceDetail`.
  - `images` (eager `OneToMany` to `Image`), so typical listing reads already include images and type-specific detail.
- `backend/src/listings/listings.service.ts` encapsulates listing operations:
  - `findAll` builds a query with optional `type` and `city` filters and simple pagination (`page`, `limit`).
  - `findOne` loads a listing plus its `images`, throwing `NotFoundException` if absent.
  - `create` attaches `user_id` from the authenticated user.
  - `update` and `remove` enforce ownership (matching `user_id`), throwing `ForbiddenException` otherwise.
  - `findByUser` returns all listings for a specific user, including `images`.

#### Auth & JWT

- `backend/src/auth/auth.service.ts`:
  - `register` checks for existing user by `email` or `phone`, hashes the password with bcrypt, creates a `User`, and returns a minimal user object plus a signed JWT.
  - `login` validates credentials against stored `password_hash`, updates `last_login_at`, and returns the same user + token structure.
  - `generateToken` signs `{ sub: user.id, email: user.email }` via `JwtService`.
- Guards, strategies, and decorators (`jwt.strategy.ts`, `jwt-auth.guard.ts`, `get-user.decorator.ts`) wire the JWT-based auth into route handlers; use these when adding new protected endpoints.

#### API surface and docs

- The Swagger configuration in `main.ts` mirrors the endpoints described in `docs/API.md`:
  - `auth` endpoints for register/login/me.
  - `listings` endpoints for CRUD, user listings, trending sections.
  - `search` endpoints (currently mostly documented but not fully implemented in `SearchModule`).
  - `users` and `dashboard` endpoints.
- For end-to-end behavior and payload shapes, prefer `docs/API.md` over guessing – it contains canonical request/response examples.

#### Persistence and data layer

- Intended relational schema is defined in `database/schema.sql` and assumed in `README.md` / `docs/SETUP.md`.
- TypeORM migrations are managed via `src/config/typeorm.config.ts` (referenced by migration commands in `backend/package.json`).
- When changing entities, ensure that:
  - The entity definitions (`*.entity.ts`), the SQL schema in `database/schema.sql`, and any TypeORM migrations stay aligned.
  - The API docs in `docs/API.md` are updated if response shapes change.

### Frontend (Next.js 14 App Router)

- Root layout: `frontend/app/layout.tsx`
  - Global styles from `app/globals.css` and Inter font.
  - Wraps all pages with `Navbar` and `Footer` from `frontend/components/layout/`.
- Home page: `frontend/app/page.tsx`
  - Hero section with marketing copy and a central `SearchBar`.
  - "Browse by Category" grid using `CategoryCard` components from `frontend/components/home/`.
  - Three `TrendingSection` instances (Deals, Coupons, Products) and a `HowItWorks` section.
- Section routes (App Router): `frontend/app/{deals,coupons,products,services,profile,sell}/page.tsx` represent top-level marketplace views; use these directories when adding section-specific browsing or dashboard pages.

#### Key UI components

- `frontend/components/search/SearchBar.tsx`
  - Client component with local `query` and `location` state.
  - Emits a `handleSearch` on submit; currently logs to console.
  - Supports category selector (`all`, `deals`, `coupons`, `products`, `services`).
  - When wiring to the backend, you should call the search/listings endpoints defined in `docs/API.md`, using `NEXT_PUBLIC_API_URL` as the base.
- `frontend/components/home/TrendingSection.tsx`
  - Client component that renders a horizontally scrollable card list for a given `type` (`deals`, `coupons`, `products`, `services`).
  - Currently uses mock data generated in-component (`Array(6).fill(...).map(...)`).
  - Intended integration is to replace this mock data with API calls to listing or search endpoints (e.g., `/listings/trending/*` from `docs/API.md`).
- `frontend/components/home/CategoryCard.tsx`, `HowItWorks.tsx`, and layout components (`Navbar`, `Footer`) implement the design system described in `docs/UI_GUIDE.md` (Tailwind-based, mobile-first, section-specific accent colors).

#### Configuration & env

- `frontend/tsconfig.json` sets up TypeScript with Next.js plugin and a path alias `@/*` pointing to the project root.
- Environment variables (see `docs/SETUP.md`):
  - `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api`) is the key integration point for calling the backend from the frontend.

## Important Commands

### Root-level (monorepo orchestration)

From the repository root (`marketplace-platform/`):

- **Install all dependencies** (root + backend + frontend):
  - `npm run install:all`
- **Start full development stack** (PostgreSQL, Redis, Meilisearch, backend, frontend – via Docker + dev servers):
  - `npm run dev:full`
- **Start only infrastructure services** (DB/cache/search via Docker Compose):
  - `npm run services`
- **Run backend dev server only**:
  - `npm run backend`
- **Run frontend dev server only**:
  - `npm run frontend`
- **Bring up all Docker services (including backend & frontend containers)**:
  - `npm run docker:up`
- **Tear down Docker services**:
  - `npm run docker:down`
- **Stream Docker logs**:
  - `npm run docker:logs`
- **Build backend and frontend for production**:
  - `npm run build:all`

For the fastest local workflow, follow the pattern from `QUICKSTART.md`:

1. `npm run install:all`
2. Copy env files: `cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env`
3. `npm run dev:full`

### Backend (NestJS)

From `backend/`:

- **Development server** (hot reload):
  - `npm run start:dev`
- **Production build & run**:
  - Build: `npm run build`
  - Start built app: `npm run start:prod`
- **Lint & format**:
  - Lint (ESLint with TypeScript): `npm run lint`
  - Format (Prettier for `src/**/*.ts`): `npm run format`
- **Unit & e2e tests** (Jest):
  - Run test suite: `npm run test`
  - Watch mode: `npm run test:watch`
  - Coverage: `npm run test:cov`
  - E2E tests (config in `test/jest-e2e.json`): `npm run test:e2e`
- **Run a single backend test file** (Jest pattern matching):
  - `npm run test -- path/to/your.spec.ts`
- **Database migrations** (TypeORM CLI via `typeorm.config.ts`):
  - Generate migration: `npm run migration:generate -- MigrationName`
  - Run migrations: `npm run migration:run`
  - Revert last migration: `npm run migration:revert`

### Frontend (Next.js)

From `frontend/`:

- **Development server**:
  - `npm run dev`
- **Production build & run**:
  - Build: `npm run build`
  - Start: `npm run start`
- **Lint**:
  - `npm run lint`

If a frontend test runner is added, `docs/SETUP.md` expects it to be exposed as `npm run test` in `frontend/package.json`.

## Useful Documentation in this Repo

When making non-trivial changes, consult these files first:

- `README.md` – high-level project overview, architecture summary, quick start, and feature list.
- `QUICKSTART.md` – concise setup + common command reference.
- `docs/SETUP.md` – detailed setup, environment variables, Docker/database tips, and troubleshooting.
- `docs/API.md` – canonical API contract; use this when modifying or adding endpoints.
- `docs/UI_GUIDE.md` – UI/UX and design system guide for frontend components.
- `database/schema.sql` – authoritative PostgreSQL schema; align backend entities and migrations with this.

These documents are the source of truth for intended behavior; prefer updating them alongside code changes when you introduce new features or modify core flows.