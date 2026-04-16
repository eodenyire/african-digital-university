# African Digital University — C# ASP.NET Core Web API Backend

This is a complete C# ASP.NET Core Web API that replicates the ADU Supabase backend. It provides the same REST API surface as the Supabase PostgREST interface consumed by the React frontend, with JWT-based authentication replacing Supabase Auth.

The C# backend uses a **primary PostgreSQL database (Neon)** and can optionally replicate to a secondary database:

| Database | Purpose |
|---|---|
| Neon PostgreSQL (cloud) | Primary database — used by the API |
| Supabase PostgreSQL (optional) | Secondary database — writes are replicated here automatically when configured |

Every write to the primary database can be mirrored to the optional Supabase database via `SupabaseReplicationInterceptor`. Replication is best-effort: if Supabase is unreachable the write to Neon still succeeds and the error is logged.

---

## Dual-backend failover

The React frontend supports automatic failover between backends:

- When `VITE_CSHARP_API_URL` is set and the C# API is reachable, the frontend uses the **C# backend**.
- When the C# API is unreachable (or the variable is not set), the frontend falls back to **Lovable Cloud / Supabase**.
- The active backend is re-probed every 30 seconds and indicated by a badge in the navigation bar (🟢 **C# API** or 🔵 **Supabase**).

---

## How it maps to the Supabase backend

| Supabase concept | C# equivalent |
|---|---|
| `auth.users` table + GoTrue | `Users` table + `AuthService` with BCrypt + JWT |
| `handle_new_user` trigger | `AuthService.SignUpAsync()` auto-creates `Profile` |
| `update_updated_at_column` trigger | `AppDbContext.SaveChangesAsync()` override |
| `has_role(user_id, role)` SQL function | `RoleService.HasRoleAsync()` |
| Row Level Security (RLS) policies | Authorization checks in each controller action |
| PostgREST REST API | ASP.NET Core controllers with matching routes |
| Supabase JWT | Custom JWT via `Microsoft.AspNetCore.Authentication.JwtBearer` |

---

## Project structure

```
AfricanDigitalUniversity.Api/
├── Controllers/          # One controller per resource
├── Data/
│   ├── AppDbContext.cs               # Primary EF Core DbContext (Neon DB)
│   ├── SupabaseDbContext.cs          # Secondary DbContext (Supabase cloud DB)
│   └── SupabaseReplicationInterceptor.cs  # Dual-write interceptor
├── DTOs/                 # Request/response data transfer objects
├── Middleware/
│   └── ClaimsExtensions.cs  # JWT claim helpers
├── Migrations/           # EF Core database migrations
├── Models/               # Entity models matching the DB schema
├── Services/
│   ├── AuthService.cs    # Sign-up, sign-in, JWT generation
│   └── RoleService.cs    # has_role() equivalent
├── appsettings.json
└── Program.cs            # App bootstrap, DI, middleware pipeline
```

---

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download) or higher
- PostgreSQL 14+
- `dotnet-ef` CLI tool: `dotnet tool install --global dotnet-ef`

---

## Setup & running

### 1. Provision a Neon database

Create a Neon project/database and copy the connection string.

### 2. Configure connection strings

`appsettings.json` is pre-configured with a Neon connection string placeholder.
Replace `YOUR_NEON_DB_PASSWORD` (or override via environment variables).

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=your-neon-endpoint.neon.tech;Database=neondb;Username=neondb_owner;Password=YOUR_NEON_DB_PASSWORD;SSL Mode=Require;Channel Binding=Require",
    "SupabaseConnection": "Host=db.ixswfwzseawgdkmdomkk.supabase.co;Database=postgres;Username=postgres;Password=<YOUR_PASSWORD>;SSL Mode=Require;Trust Server Certificate=true"
  }
}
```

When `SupabaseConnection` contains the placeholder text `YOUR_SUPABASE_DB_PASSWORD`
the Supabase replication is disabled and the API operates in single-database mode.

For production, use environment variables (the API also accepts `postgresql://` URLs and will normalize them automatically):

```bash
export ConnectionStrings__DefaultConnection="Host=your-neon-endpoint.neon.tech;Database=neondb;Username=neondb_owner;Password=YOUR_NEON_DB_PASSWORD;SSL Mode=Require;Channel Binding=Require"
export DATABASE_URL="postgresql://neondb_owner:<PASSWORD>@your-neon-endpoint.neon.tech/neondb?sslmode=require&channel_binding=require"
export NEON_DATABASE_URL="postgresql://neondb_owner:<PASSWORD>@your-neon-endpoint.neon.tech/neondb?sslmode=require&channel_binding=require"
export NEON_URL="postgresql://neondb_owner:<PASSWORD>@your-neon-endpoint.neon.tech/neondb?sslmode=require&channel_binding=require"
export ConnectionStrings__SupabaseConnection="Host=db...;Database=postgres;..."
export SUPABASE_DB_URL="postgresql://postgres:<PASSWORD>@db.ixswfwzseawgdkmdomkk.supabase.co:5432/postgres?sslmode=require"
export SUPABASE_DATABASE_URL="postgresql://postgres:<PASSWORD>@db.ixswfwzseawgdkmdomkk.supabase.co:5432/postgres?sslmode=require"
export SUPABASE_CONNECTION_STRING="postgresql://postgres:<PASSWORD>@db.ixswfwzseawgdkmdomkk.supabase.co:5432/postgres?sslmode=require"
export SUPABASE_DB_PASSWORD="<PASSWORD>" # replaces YOUR_SUPABASE_DB_PASSWORD in appsettings.json
export Jwt__Key="your-production-secret"
export Cors__AllowedOrigins__0="https://your-frontend-domain.com"
```

### Hosted deployment behavior (Render/Fly/etc.)

- If `DefaultConnection` is missing/placeholder in a non-development environment, the API automatically uses `SupabaseConnection` as the primary database (when configured).
- If `DefaultConnection` points to localhost in a non-development environment, the API automatically uses `SupabaseConnection` as the primary database (when configured).
- Supabase replication is enabled only when `SupabaseConnection` is configured **and** it is different from the active primary connection.

### Default admin seed account

On startup, the API ensures a default admin account exists (idempotent seed):

- Email: `admin@adu.africa`
- Password: `Admin2026!`

You can override these with environment variables:

```bash
export Seed__AdminEmail="admin@adu.africa"
export Seed__AdminPassword="Admin2026!"
export Seed__AdminFullName="ADU Administrator"
```

### 3. Apply migrations

Ensure the `pgcrypto` extension is enabled (required for `gen_random_uuid()`):

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

```bash
cd AfricanDigitalUniversity.Api
dotnet ef database update
```

### 4. Seed course + lesson data (recommended)

Only run the **data seed** migrations (not the Supabase RLS/schema migrations):

```bash
export NEON_URL="postgresql://neondb_owner:<PASSWORD>@your-neon-endpoint.neon.tech/neondb?sslmode=require&channel_binding=require"
psql "$NEON_URL" -f ../../supabase/migrations/20260416000001_se_courses_seed.sql
psql "$NEON_URL" -f ../../supabase/migrations/20260416000003_lesson_content_seed.sql
```

### 5. Run the API

```bash
cd AfricanDigitalUniversity.Api
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `http://localhost:5000/swagger`

---

## Authentication

All protected endpoints require a Bearer JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Obtain a token via `POST /auth/signin` or `POST /auth/signup`.

---

## API Endpoints Reference

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/signup` | No | Register new user + auto-create profile |
| `POST` | `/auth/signin` | No | Sign in, returns JWT |
| `POST` | `/auth/signout` | Yes | Sign out (client discards token) |
| `GET`  | `/auth/session` | Yes | Get current session user |

**Signup request:**
```json
{ "email": "user@example.com", "password": "secret", "fullName": "Jane Doe" }
```

**Signin request:**
```json
{ "email": "user@example.com", "password": "secret" }
```

**Auth response:**
```json
{
  "accessToken": "eyJ...",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "user": { "id": "...", "email": "...", "createdAt": "..." }
}
```

### Profiles
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/profiles?user_id=<uuid>` | Get own profile |
| `PATCH`| `/profiles/<id>` | Update own profile |

### Courses
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/courses` | Published courses (all for admins) |
| `GET` | `/courses/<id>` | Get course by ID |

### Enrollments
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/enrollments?user_id=<uuid>` | Get own enrollments (with course data) |
| `POST` | `/enrollments` | Enroll in a course |

### Lessons
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/lessons?course_id=<uuid>` | List published lessons for enrolled course |
| `GET` | `/lessons/<id>` | Get lesson by ID |

### Lesson Progress
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/lesson_progress?user_id=<uuid>` | Get progress for lessons |
| `POST` | `/lesson_progress` | Upsert lesson progress |

### Assignments
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/assignments?course_id=<uuid>` | List published assignments |

### Assignment Submissions
| Method | Path | Description |
|--------|------|-------------|
| `GET`   | `/assignment_submissions?user_id=<uuid>` | Get own submissions |
| `POST`  | `/assignment_submissions` | Submit an assignment |
| `PATCH` | `/assignment_submissions/<id>` | Update ungraded submission |

### Quizzes
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/quizzes?course_id=<uuid>` | List published quizzes |

### Quiz Questions
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/quiz_questions?quiz_id=<uuid>` | Get questions for a quiz |

### Quiz Attempts
| Method | Path | Description |
|--------|------|-------------|
| `GET`   | `/quiz_attempts?user_id=<uuid>` | Get own attempts |
| `POST`  | `/quiz_attempts` | Start a quiz attempt |
| `PATCH` | `/quiz_attempts/<id>` | Update incomplete attempt (submit answers/score) |

### User Roles
| Method   | Path | Auth | Description |
|----------|------|------|-------------|
| `GET`    | `/user_roles?user_id=<uuid>&role=admin` | Yes | View own / all roles |
| `POST`   | `/user_roles` | Admin | Assign role to user |
| `DELETE` | `/user_roles/<id>` | Admin | Remove role |

### Student Applications
| Method   | Path | Auth | Description |
|----------|------|------|-------------|
| `GET`    | `/student_applications` | Yes | Own application (or all for admins) |
| `POST`   | `/student_applications` | Yes | Submit application |
| `PATCH`  | `/student_applications/<id>` | Admin | Review (approve/reject) application |

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ConnectionStrings__DefaultConnection` | PostgreSQL connection string for Neon | `Host=your-neon-endpoint.neon.tech;Database=neondb;Username=neondb_owner;Password=YOUR_NEON_DB_PASSWORD` |
| `DATABASE_URL` | Render/Neon URL fallback (postgresql://...) | unset |
| `NEON_DATABASE_URL` | Neon URL fallback (postgresql://...) | unset |
| `NEON_URL` | Neon URL fallback (postgresql://...) | unset |
| `ConnectionStrings__SupabaseConnection` | Supabase PostgreSQL connection string (optional) | placeholder |
| `SUPABASE_DB_URL` | Supabase PostgreSQL connection URL fallback (postgresql://...) | unset |
| `SUPABASE_DATABASE_URL` | Supabase PostgreSQL connection URL fallback (postgresql://...) | unset |
| `SUPABASE_CONNECTION_STRING` | Supabase PostgreSQL connection URL fallback (postgresql://...) | unset |
| `SUPABASE_DB_PASSWORD` | Supabase DB password (replaces placeholder in appsettings.json) | unset |
| `Jwt__Key` | JWT signing key (min 32 chars) | `adu-super-secret-jwt-key-min-32-characters!!` |
| `Jwt__Issuer` | JWT issuer | `adu-api` |
| `Jwt__Audience` | JWT audience | `adu-frontend` |
| `Jwt__ExpiryHours` | Token expiry in hours | `24` |

> ⚠️ **Security:** Always override `Jwt__Key` in production with a strong random secret.

---

## Database migrations

```bash
# Create a new migration after model changes
dotnet ef migrations add <MigrationName>

# Apply all pending migrations
dotnet ef database update

# Rollback to a specific migration
dotnet ef database update <MigrationName>
```

---

## Connecting the React frontend

Set `VITE_CSHARP_API_URL` in the frontend `.env` file:

```
VITE_CSHARP_API_URL=http://localhost:5000
```

The frontend will automatically detect the C# backend on the next probe cycle
(up to 30 seconds) and display the **C# API** badge in the navigation bar.

CORS is pre-configured to allow `localhost:5173`, `localhost:3000`, and `localhost:8080`.


| Supabase concept | C# equivalent |
|---|---|
| `auth.users` table + GoTrue | `Users` table + `AuthService` with BCrypt + JWT |
| `handle_new_user` trigger | `AuthService.SignUpAsync()` auto-creates `Profile` |
| `update_updated_at_column` trigger | `AppDbContext.SaveChangesAsync()` override |
| `has_role(user_id, role)` SQL function | `RoleService.HasRoleAsync()` |
| Row Level Security (RLS) policies | Authorization checks in each controller action |
| PostgREST REST API | ASP.NET Core controllers with matching routes |
| Supabase JWT | Custom JWT via `Microsoft.AspNetCore.Authentication.JwtBearer` |

---

## Project structure

```
AfricanDigitalUniversity.Api/
├── Controllers/          # One controller per resource
├── Data/
│   └── AppDbContext.cs   # EF Core DbContext with all entity configs
├── DTOs/                 # Request/response data transfer objects
├── Middleware/
│   └── ClaimsExtensions.cs  # JWT claim helpers
├── Migrations/           # EF Core database migrations
├── Models/               # Entity models matching the DB schema
├── Services/
│   ├── AuthService.cs    # Sign-up, sign-in, JWT generation
│   └── RoleService.cs    # has_role() equivalent
├── appsettings.json
└── Program.cs            # App bootstrap, DI, middleware pipeline
```

---

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download) or higher
- PostgreSQL 14+
- `dotnet-ef` CLI tool: `dotnet tool install --global dotnet-ef`

---

## Setup & running

### 1. Configure connection string

Edit `appsettings.json` (or use environment variables / user secrets):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=adu;Username=postgres;Password=yourpassword"
  },
  "Jwt": {
    "Key": "your-very-long-secret-key-at-least-32-chars",
    "Issuer": "adu-api",
    "Audience": "adu-frontend",
    "ExpiryHours": "24"
  }
}
```

For production, use environment variables instead of editing the file:

```bash
export ConnectionStrings__DefaultConnection="Host=...;Database=adu;..."
export Jwt__Key="your-production-secret"
```

### 2. Create the database

```bash
# Create the database in PostgreSQL
createdb adu

# Apply EF Core migrations
cd AfricanDigitalUniversity.Api
dotnet ef database update
```

### 3. Run the API

```bash
cd AfricanDigitalUniversity.Api
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `http://localhost:5000/swagger`

---

## Authentication

All protected endpoints require a Bearer JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Obtain a token via `POST /auth/signin` or `POST /auth/signup`.

---

## API Endpoints Reference

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/signup` | No | Register new user + auto-create profile |
| `POST` | `/auth/signin` | No | Sign in, returns JWT |
| `POST` | `/auth/signout` | Yes | Sign out (client discards token) |
| `GET`  | `/auth/session` | Yes | Get current session user |

**Signup request:**
```json
{ "email": "user@example.com", "password": "secret", "fullName": "Jane Doe" }
```

**Signin request:**
```json
{ "email": "user@example.com", "password": "secret" }
```

**Auth response:**
```json
{
  "accessToken": "eyJ...",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "user": { "id": "...", "email": "...", "createdAt": "..." }
}
```

### Profiles
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/profiles?user_id=<uuid>` | Get own profile |
| `PATCH`| `/profiles/<id>` | Update own profile |

### Courses
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/courses` | Published courses (all for admins) |
| `GET` | `/courses/<id>` | Get course by ID |

### Enrollments
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/enrollments?user_id=<uuid>` | Get own enrollments (with course data) |
| `POST` | `/enrollments` | Enroll in a course |

### Lessons
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/lessons?course_id=<uuid>` | List published lessons for enrolled course |
| `GET` | `/lessons/<id>` | Get lesson by ID |

### Lesson Progress
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/lesson_progress?user_id=<uuid>` | Get progress for lessons |
| `POST` | `/lesson_progress` | Upsert lesson progress |

### Assignments
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/assignments?course_id=<uuid>` | List published assignments |

### Assignment Submissions
| Method | Path | Description |
|--------|------|-------------|
| `GET`   | `/assignment_submissions?user_id=<uuid>` | Get own submissions |
| `POST`  | `/assignment_submissions` | Submit an assignment |
| `PATCH` | `/assignment_submissions/<id>` | Update ungraded submission |

### Quizzes
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/quizzes?course_id=<uuid>` | List published quizzes |

### Quiz Questions
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/quiz_questions?quiz_id=<uuid>` | Get questions for a quiz |

### Quiz Attempts
| Method | Path | Description |
|--------|------|-------------|
| `GET`   | `/quiz_attempts?user_id=<uuid>` | Get own attempts |
| `POST`  | `/quiz_attempts` | Start a quiz attempt |
| `PATCH` | `/quiz_attempts/<id>` | Update incomplete attempt (submit answers/score) |

### User Roles
| Method   | Path | Auth | Description |
|----------|------|------|-------------|
| `GET`    | `/user_roles?user_id=<uuid>&role=admin` | Yes | View own / all roles |
| `POST`   | `/user_roles` | Admin | Assign role to user |
| `DELETE` | `/user_roles/<id>` | Admin | Remove role |

### Student Applications
| Method   | Path | Auth | Description |
|----------|------|------|-------------|
| `GET`    | `/student_applications` | Yes | Own application (or all for admins) |
| `POST`   | `/student_applications` | Yes | Submit application |
| `PATCH`  | `/student_applications/<id>` | Admin | Review (approve/reject) application |

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ConnectionStrings__DefaultConnection` | PostgreSQL connection string | `Host=localhost;Database=adu;Username=postgres;Password=postgres` |
| `DATABASE_URL` | Render/Neon URL fallback (postgresql://...) | unset |
| `NEON_DATABASE_URL` | Neon URL fallback (postgresql://...) | unset |
| `NEON_URL` | Neon URL fallback (postgresql://...) | unset |
| `Jwt__Key` | JWT signing key (min 32 chars) | `adu-super-secret-jwt-key-min-32-characters!!` |
| `Jwt__Issuer` | JWT issuer | `adu-api` |
| `Jwt__Audience` | JWT audience | `adu-frontend` |
| `Jwt__ExpiryHours` | Token expiry in hours | `24` |

> ⚠️ **Security:** Always override `Jwt__Key` in production with a strong random secret.

---

## Database migrations

```bash
# Create a new migration after model changes
dotnet ef migrations add <MigrationName>

# Apply all pending migrations
dotnet ef database update

# Rollback to a specific migration
dotnet ef database update <MigrationName>
```

---

## Connecting the React frontend

The frontend uses Supabase client. To point it at this API instead, you would:

1. Replace Supabase API calls with `fetch`/`axios` calls to this API's base URL
2. Store the JWT token from `/auth/signin` response and include it as `Authorization: Bearer <token>`
3. Map Supabase query syntax (e.g. `.select('*,courses(*)')`) to the equivalent REST endpoints

CORS is pre-configured to allow `localhost:5173`, `localhost:3000`, and `localhost:8080`.
