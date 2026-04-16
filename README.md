# African Digital University (ADU)

A full-stack learning platform prototype for **African Digital University**, built with a React + TypeScript frontend and two interchangeable backend options:

- **Supabase (Lovable cloud stack)** for rapid product iteration.
- **C# ASP.NET Core API** for self-hosted/enterprise backend parity.

The frontend can automatically fail over between the two backends at runtime.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Running with Supabase (Default)](#running-with-supabase-default)
- [Running with C# Backend](#running-with-c-backend)
- [Database & Seed Data](#database--seed-data)
- [Scripts](#scripts)
- [Testing](#testing)
- [Screenshots & Demo Artifacts](#screenshots--demo-artifacts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Project Overview

This project models an end-to-end digital university experience:

- Public marketing pages for ADU schools/programs.
- Authentication and protected learner routes.
- Student LMS dashboard with course enrollment and progress views.
- Admin dashboard for admissions, VILT sessions, capstones, and certificate issuance.
- Certificate experience for learners.

The codebase is designed to support both a managed backend (Supabase) and a custom API (ASP.NET Core), with a single frontend adapting based on backend availability.

---

## Core Features

### Student-facing

- Browse schools/programs and course catalogs.
- Sign up / sign in and access protected learning pages.
- Enroll into available courses.
- View enrolled courses and lesson progress context.
- Access certificate flow and eligibility messaging.

### Admin-facing

- Review student applications (approve/reject).
- Monitor courses, lessons, and enrollments.
- Create/manage VILT sessions.
- Track capstone submissions and review outcomes.
- Issue certificates with verification metadata.

### Platform

- Automatic backend probing + failover badge in UI.
- Shared auth UX across backend providers.
- Typed API integrations (Supabase + C# client).
- Playwright screenshot suites for both backend modes.

---

## Architecture

### Frontend (Vite + React)

- `BackendProvider` probes the C# API and selects active backend.
- `AuthProvider` adapts auth/session behavior based on backend.
- React Query is used for server state and cache invalidation.
- Route protection ensures LMS/admin areas require authentication.

### Backend options

1. **Supabase backend**
   - Uses Supabase Auth + PostgREST tables.
   - Good for fast development and hosted workflows.

2. **C# ASP.NET Core backend** (`backend-csharp/`)
   - JWT auth + controller routes matching frontend expectations.
   - Supports dual-database replication mode (primary local Postgres + optional Supabase replication).

---

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS + shadcn/ui components

### Backend & Data

- Supabase (Auth + Postgres)
- ASP.NET Core Web API (.NET 9) in `backend-csharp/`
- PostgreSQL

### Quality & Tooling

- ESLint
- Vitest + Testing Library
- Playwright

---

## Repository Structure

```text
.
├── src/                         # React app source
│   ├── pages/                   # Public, LMS, and admin routes
│   ├── components/              # UI + feature components
│   ├── contexts/                # Auth context
│   ├── lib/                     # Backend selection provider, utilities
│   └── integrations/            # Supabase and C# API clients
├── supabase/                    # SQL migrations, seed scripts, local config
├── backend-csharp/              # ASP.NET Core API implementation
├── course-content/              # Markdown lessons source content
├── tests/                       # Playwright suites and helpers
├── screenshots/                 # Captured UI reference screenshots
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm (or Bun; lockfiles for both are present)
- (Optional) Supabase CLI for local database workflows
- (Optional) .NET 9 SDK + PostgreSQL for C# backend mode

### Install

```bash
npm install
```

### Start frontend

```bash
npm run dev
```

Open: `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the project root.

```bash
# Required for Supabase mode
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...

# Optional: overrides C# backend probing/failover URL
VITE_CSHARP_API_URL=http://localhost:5000
```

### Behavior notes

- If `VITE_CSHARP_API_URL` is unset:
  - in development, frontend runs in Supabase mode.
  - in production, frontend defaults to `https://african-digital-university-backend.onrender.com`.
- If set, frontend probes C# `/health` and switches automatically when reachable.
- Probe interval is 30 seconds, so recovery/failover is automatic.

---

## Running with Supabase (Default)

1. Provide valid Supabase URL/key in `.env`.
2. Start frontend:

```bash
npm run dev
```

3. Authenticate via `/auth` and navigate to protected routes:
   - `/lms/dashboard`
   - `/lms/course/:courseId`
   - `/apply`
   - `/admin`

---

## Running with C# Backend

For full backend setup details, see [`backend-csharp/README.md`](backend-csharp/README.md).

High-level flow:

1. Provision a Neon PostgreSQL database.
2. Set `ConnectionStrings__DefaultConnection` to your Neon connection string.
3. Apply EF Core migrations and seed course/lesson data.
4. Run API (default: `http://localhost:5000`).
5. Set `VITE_CSHARP_API_URL=http://localhost:5000`.
6. Start frontend and verify backend badge shows **C# API** when healthy.

---

## Database & Seed Data

### Supabase SQL assets

- `supabase/migrations/` contains schema + data migrations.
- Additional scripts include:
  - `supabase/create_db.sql`
  - `supabase/seed_users.sql`
  - `supabase/seed_application.sql`

### Neon + C# backend seed data

After running `dotnet ef database update`, seed the core course/lesson data using:

```bash
export NEON_URL="postgresql://neondb_owner:<PASSWORD>@your-neon-endpoint.neon.tech/neondb?sslmode=require&channel_binding=require"
psql "$NEON_URL" -f supabase/migrations/20260416000001_se_courses_seed.sql
psql "$NEON_URL" -f supabase/migrations/20260416000003_lesson_content_seed.sql
```

Avoid running the Supabase RLS/schema migrations against the C# database.

### Course content pipeline

- Markdown lesson files live under `course-content/<COURSE_CODE>/`.
- Generate SQL lesson seed migration from markdown:

```bash
npm run seed:lessons
```

See [`course-content/README.md`](course-content/README.md) for naming/frontmatter conventions.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start local Vite dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview built app |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run seed:lessons` | Generate lesson seed SQL from markdown content |

---

## Testing

### Unit/component tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### Playwright screenshot suites

The repository includes dedicated screenshot specs for both backend modes:

- `tests/screenshots-lovable.spec.ts`
- `tests/screenshots-csharp.spec.ts`

These tests rely on route mocking to generate deterministic screenshots.

---

## Screenshots & Demo Artifacts

Reference screenshot sets are versioned in:

- `screenshots/lovable/` (Supabase-mode visuals)
- `screenshots/csharp/` (C#-mode visuals + Swagger screen)

Each folder includes an index README describing generated shots.

---

## Troubleshooting

### Blank or failing data in UI

- Ensure Supabase env vars are present and correct.
- Confirm active backend badge matches your intended mode.
- If using C# mode, verify API health endpoint responds.

### Auth appears stuck/loading

- Check browser local storage tokens/sessions.
- Verify backend mode and corresponding auth endpoint availability.
- Restart dev server after changing `.env` values.

### C# mode not activating

- Ensure `VITE_CSHARP_API_URL` is set.
- Confirm C# API is reachable from browser.
- Wait up to 30 seconds for the next automatic probe cycle.

---

## Contributing

1. Create a feature branch.
2. Make focused changes with tests where applicable.
3. Run lint/tests before committing.
4. Open a PR with:
   - What changed
   - Why it changed
   - How to test

---

If you'd like, I can also provide:

- a **developer onboarding README** (`README.dev.md`),
- a **deployment README** for Vercel/Netlify + backend hosting,
- and a **concise product one-pager README** for stakeholders.
