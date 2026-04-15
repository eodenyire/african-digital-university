# Screenshots – Lovable Cloud / Supabase Backend

This folder contains end-to-end screenshots captured while the platform is
running against the **Lovable Cloud + Supabase** backend.

## How to capture

1. Ensure `VITE_CSHARP_API_URL` is **empty** in your `.env` file (or the C#
   API server is stopped) so the frontend falls back to Supabase.
2. Start the frontend:  
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
4. Walk through the following journey and save a screenshot at each step:

| Filename | Page / Action |
|---|---|
| `01-home.png` | Landing page (homepage) |
| `02-school-page.png` | A school detail page (e.g. Software Engineering) |
| `03-auth-signup.png` | Sign-up form |
| `04-auth-signin.png` | Sign-in form |
| `05-lms-dashboard.png` | LMS student dashboard (backend badge shows **Supabase**) |
| `06-lms-courses-browse.png` | Browse all courses by school |
| `07-lms-course-detail.png` | Individual course page with lessons |
| `08-apply-page.png` | Student application form |
| `09-admin-dashboard.png` | Admin dashboard – Applications tab |
| `10-admin-courses.png` | Admin dashboard – Courses tab showing captured courses |

> **Note**: The navigation bar badge should read **Supabase** (blue cloud icon)
> in all screenshots in this folder.
