# Screenshots – C# ASP.NET Core Backend (adu-africa database)

This folder contains end-to-end screenshots captured while the platform is
running against the **C# ASP.NET Core** backend connected to the local
`adu-africa` PostgreSQL database.

## Prerequisites

1. **PostgreSQL**: Install PostgreSQL and create the `adu-africa` database:
   ```sql
   CREATE USER admin WITH PASSWORD 'admin2026@#*';
   CREATE DATABASE "adu-africa" OWNER admin;
   GRANT ALL PRIVILEGES ON DATABASE "adu-africa" TO admin;
   ```

2. **Run migrations** against the new database:
   ```bash
   cd backend-csharp/AfricanDigitalUniversity.Api
   dotnet ef database update
   ```
   The `appsettings.json` `DefaultConnection` already points to `adu-africa`
   with the `admin` credentials.

3. **Start the C# API**:
   ```bash
   cd backend-csharp/AfricanDigitalUniversity.Api
   dotnet run
   ```
   The API starts on `http://localhost:5000` by default.

4. **Ensure `VITE_CSHARP_API_URL` is set** in `.env`:
   ```
   VITE_CSHARP_API_URL=http://localhost:5000
   ```

5. **Start the frontend**:
   ```bash
   npm run dev
   ```
   The backend probe will detect the running C# API and the navigation badge
   will switch to **C# API** (green server icon).

## Capture journey

| Filename | Page / Action |
|---|---|
| `01-home.png` | Landing page (homepage) |
| `02-school-page.png` | A school detail page |
| `03-auth-signup.png` | Sign-up form (creates user in adu-africa DB) |
| `04-auth-signin.png` | Sign-in (returns JWT from C# backend) |
| `05-lms-dashboard.png` | LMS dashboard (backend badge shows **C# API**) |
| `06-lms-courses-browse.png` | Browse courses (loaded from adu-africa DB) |
| `07-lms-course-detail.png` | Individual course page with lessons |
| `08-apply-page.png` | Student application form |
| `09-admin-dashboard.png` | Admin dashboard – Applications tab |
| `10-admin-courses.png` | Admin dashboard – Courses tab showing all captured courses |
| `11-swagger-ui.png` | Swagger UI at `http://localhost:5000/swagger` |

> **Note**: The navigation bar badge should read **C# API** (green server icon)
> in all screenshots in this folder.

## Dual-write verification

After creating data via the C# API, you can verify the Supabase replication
by opening the Supabase Studio (`https://app.supabase.com`) and checking
the same tables.  Both databases should contain identical records once the
`SupabaseConnection` string in `appsettings.json` is configured with the
correct Supabase database password.
