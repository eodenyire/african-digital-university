/**
 * Shared mock data and helpers for the screenshot Playwright tests.
 *
 * Because the sandbox environment cannot reach the live Supabase project or a
 * running C# backend, every outbound API call is intercepted with
 * page.route() and answered with realistic fixture data.  The resulting
 * screenshots look identical to the live system.
 */
import { Page } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Output directories ────────────────────────────────────────────────────────

export const LOVABLE_DIR = path.resolve(
  __dirname,
  "../screenshots/lovable"
);
export const CSHARP_DIR = path.resolve(
  __dirname,
  "../screenshots/csharp"
);

// ── Fake IDs ──────────────────────────────────────────────────────────────────

export const STUDENT_ID = "00000000-0000-0000-0000-000000000001";
export const ADMIN_ID = "00000000-0000-0000-0000-000000000002";
export const COURSE_ID_1 = "aaaaaaaa-0000-0000-0000-000000000001";
export const COURSE_ID_2 = "aaaaaaaa-0000-0000-0000-000000000002";
export const COURSE_ID_3 = "aaaaaaaa-0000-0000-0000-000000000003";
export const COURSE_ID_4 = "aaaaaaaa-0000-0000-0000-000000000004";
export const COURSE_ID_5 = "aaaaaaaa-0000-0000-0000-000000000005";
export const COURSE_ID_6 = "aaaaaaaa-0000-0000-0000-000000000006";
export const COURSE_ID_7 = "aaaaaaaa-0000-0000-0000-000000000007";
export const LESSON_ID_1 = "bbbbbbbb-0000-0000-0000-000000000001";
export const LESSON_ID_2 = "bbbbbbbb-0000-0000-0000-000000000002";
export const LESSON_ID_3 = "bbbbbbbb-0000-0000-0000-000000000003";
export const APP_ID_1 = "cccccccc-0000-0000-0000-000000000001";
export const APP_ID_2 = "cccccccc-0000-0000-0000-000000000002";
export const APP_ID_3 = "cccccccc-0000-0000-0000-000000000003";

// ── Fixture data ──────────────────────────────────────────────────────────────

export const courses = [
  {
    id: COURSE_ID_1,
    school_slug: "software-engineering",
    course_code: "SE101",
    title: "Introduction to Programming (Python)",
    description:
      "Core programming concepts, algorithms, and problem-solving using Python.",
    semester: 1,
    year: 1,
    credits: 4,
    order_index: 0,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: COURSE_ID_2,
    school_slug: "software-engineering",
    course_code: "SE102",
    title: "Web Fundamentals (HTML/CSS/JS)",
    description:
      "Modern web development foundations including responsive design.",
    semester: 1,
    year: 1,
    credits: 3,
    order_index: 1,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: COURSE_ID_3,
    school_slug: "software-engineering",
    course_code: "SE103",
    title: "Mathematics for Computing",
    description: "Discrete mathematics, logic, and foundational algebra for CS.",
    semester: 1,
    year: 1,
    credits: 3,
    order_index: 2,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: COURSE_ID_4,
    school_slug: "software-engineering",
    course_code: "SE106",
    title: "Data Structures & Algorithms",
    description:
      "Arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis.",
    semester: 2,
    year: 1,
    credits: 4,
    order_index: 0,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: COURSE_ID_5,
    school_slug: "software-engineering",
    course_code: "SE107",
    title: "Object-Oriented Programming (Java)",
    description: "OOP principles, design patterns, and Java ecosystem.",
    semester: 2,
    year: 1,
    credits: 4,
    order_index: 1,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: COURSE_ID_6,
    school_slug: "ai-data-science",
    course_code: "AI101",
    title: "Introduction to Machine Learning",
    description:
      "Supervised, unsupervised and reinforcement learning fundamentals.",
    semester: 1,
    year: 1,
    credits: 4,
    order_index: 0,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: COURSE_ID_7,
    school_slug: "backend-engineering",
    course_code: "BE101",
    title: "Backend Development Fundamentals",
    description: "Server-side programming, REST APIs, and databases.",
    semester: 1,
    year: 1,
    credits: 4,
    order_index: 0,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export const lessons = [
  {
    id: LESSON_ID_1,
    course_id: COURSE_ID_1,
    title: "Introduction to Python Syntax",
    content:
      "In this lesson we cover the fundamental building blocks of Python: variables, expressions, and the REPL.",
    video_url: null,
    lesson_type: "text",
    order_index: 0,
    duration_minutes: 45,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: LESSON_ID_2,
    course_id: COURSE_ID_1,
    title: "Variables and Data Types",
    content: "Explore Python's type system: int, float, str, bool, list, dict.",
    video_url: null,
    lesson_type: "text",
    order_index: 1,
    duration_minutes: 60,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: LESSON_ID_3,
    course_id: COURSE_ID_1,
    title: "Control Flow and Functions",
    content:
      "Learn if/elif/else, for/while loops, and how to define reusable functions.",
    video_url: null,
    lesson_type: "code",
    order_index: 2,
    duration_minutes: 90,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export const studentApplications = [
  {
    id: APP_ID_1,
    user_id: STUDENT_ID,
    full_name: "Amara Diallo",
    email: "amara.diallo@adu.africa",
    phone: "+221 77 123 4567",
    school_slug: "software-engineering",
    motivation:
      "I want to build technology that solves real problems for African communities.",
    status: "pending",
    reviewed_by: null,
    reviewed_at: null,
    created_at: "2026-04-10T08:00:00Z",
    updated_at: "2026-04-10T08:00:00Z",
  },
  {
    id: APP_ID_2,
    user_id: "student-2",
    full_name: "Kwame Mensah",
    email: "kwame.mensah@adu.africa",
    phone: "+233 24 456 7890",
    school_slug: "ai-data-science",
    motivation:
      "Africa's AI revolution starts with well-trained engineers. I want to be part of it.",
    status: "approved",
    reviewed_by: ADMIN_ID,
    reviewed_at: "2026-04-12T10:00:00Z",
    created_at: "2026-04-08T10:00:00Z",
    updated_at: "2026-04-12T10:00:00Z",
  },
  {
    id: APP_ID_3,
    user_id: "student-3",
    full_name: "Fatima Al-Rashid",
    email: "fatima.alrashid@adu.africa",
    phone: "+254 712 345 678",
    school_slug: "backend-engineering",
    motivation: "I aspire to build the infrastructure for Africa's digital economy.",
    status: "pending",
    reviewed_by: null,
    reviewed_at: null,
    created_at: "2026-04-11T14:00:00Z",
    updated_at: "2026-04-11T14:00:00Z",
  },
];

export const adminEnrollments = [
  { course_id: COURSE_ID_1 },
  { course_id: COURSE_ID_1 },
  { course_id: COURSE_ID_2 },
  { course_id: COURSE_ID_6 },
];

export const adminLessons = lessons.map((l) => ({
  id: l.id,
  course_id: l.course_id,
}));

// ── Supabase session injection ─────────────────────────────────────────────────

/**
 * Build a minimal Supabase session object and inject it into localStorage
 * before the page's scripts execute.  The fake access_token has `exp` set to
 * year 2286 so the supabase-js client never tries to refresh it.
 */
export function buildSupabaseSession(role: "student" | "admin") {
  const id = role === "admin" ? ADMIN_ID : STUDENT_ID;
  const email = role === "admin" ? "admin@adu.africa" : "student@adu.africa";
  const fullName = role === "admin" ? "ADU Administrator" : "Amara Diallo";

  // Header: {"alg":"HS256","typ":"JWT"}
  const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  // Payload with far-future exp
  const payloadObj = {
    sub: id,
    email,
    role: "authenticated",
    aud: "authenticated",
    exp: 9999999999,
  };
  const payload = btoa(JSON.stringify(payloadObj))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const fakeToken = `${header}.${payload}.fake_sig`;

  return {
    access_token: fakeToken,
    token_type: "bearer",
    expires_in: 3600,
    expires_at: 9999999999,
    refresh_token: "fake-refresh-token",
    user: {
      id,
      aud: "authenticated",
      role: "authenticated",
      email,
      email_confirmed_at: "2026-01-01T00:00:00.000Z",
      phone: "",
      confirmed_at: "2026-01-01T00:00:00.000Z",
      last_sign_in_at: "2026-04-15T00:00:00.000Z",
      app_metadata: { provider: "email", providers: ["email"] },
      user_metadata: { full_name: fullName },
      identities: [],
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-04-15T00:00:00.000Z",
    },
  };
}

/** Inject a Supabase session into the page's localStorage. */
export async function injectSupabaseSession(
  page: Page,
  role: "student" | "admin" = "student"
) {
  const session = buildSupabaseSession(role);
  const storageKey = "sb-ixswfwzseawgdkmdomkk-auth-token";
  await page.addInitScript(
    ({ key, value }) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    { key: storageKey, value: session }
  );
}

// ── Supabase REST mock router ──────────────────────────────────────────────────

/**
 * Intercept all requests to the Supabase project and return fixture data.
 *
 * The handler inspects the URL path to identify the table/endpoint and the
 * query-string to identify filters (e.g. user_id, course_id).
 */
export async function mockSupabaseRoutes(
  page: Page,
  role: "student" | "admin" = "student"
) {
  const id = role === "admin" ? ADMIN_ID : STUDENT_ID;

  // Auth endpoints
  await page.route("**/auth/v1/**", async (route) => {
    const url = route.request().url();
    if (url.includes("/token")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(buildSupabaseSession(role)),
      });
    } else if (url.includes("/logout")) {
      await route.fulfill({ status: 204 });
    } else if (url.includes("/user")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(buildSupabaseSession(role).user),
      });
    } else {
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    }
  });

  // REST API endpoints
  await page.route("**/rest/v1/**", async (route) => {
    const url = new URL(route.request().url());
    const table = url.pathname.split("/rest/v1/")[1]?.split("?")[0];
    const params = url.searchParams;

    // profiles
    if (table === "profiles") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: "profile-1",
            user_id: id,
            full_name: role === "admin" ? "ADU Administrator" : "Amara Diallo",
            avatar_url: null,
            bio: null,
            created_at: "2026-01-01T00:00:00Z",
            updated_at: "2026-04-15T00:00:00Z",
          },
        ]),
      });
      return;
    }

    // user_roles
    if (table === "user_roles") {
      const roleData =
        role === "admin"
          ? [{ id: "role-1", user_id: id, role: "admin", created_at: "2026-01-01T00:00:00Z" }]
          : [];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(roleData),
      });
      return;
    }

    // courses – handle both list and single (.eq("id", ...).single())
    if (table === "courses") {
      const isSingle =
        route.request().headers()["accept"]?.includes("pgrst.object");
      const idFilter = params.get("id");
      if (isSingle && idFilter) {
        const courseId = idFilter.replace("eq.", "");
        const course = courses.find((c) => c.id === courseId) ?? courses[0];
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(course),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(courses),
        });
      }
      return;
    }

    // enrollments
    if (table === "enrollments") {
      if (role === "admin") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(adminEnrollments),
        });
        return;
      }
      // Student: return one enrolled course with nested courses data
      const enrolled = [
        {
          id: "enroll-1",
          user_id: STUDENT_ID,
          course_id: COURSE_ID_1,
          enrolled_at: "2026-04-01T00:00:00Z",
          completed_at: null,
          courses: courses[0],
        },
      ];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(enrolled),
      });
      return;
    }

    // lessons
    if (table === "lessons") {
      const courseFilter = params.get("course_id");
      const filtered = courseFilter
        ? lessons.filter((l) => l.course_id === courseFilter.replace("eq.", ""))
        : lessons;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(filtered),
      });
      return;
    }

    // lesson_progress
    if (table === "lesson_progress") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: "progress-1",
            user_id: STUDENT_ID,
            lesson_id: LESSON_ID_1,
            completed: true,
            completed_at: "2026-04-14T10:00:00Z",
          },
        ]),
      });
      return;
    }

    // student_applications
    if (table === "student_applications") {
      if (role === "admin") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(studentApplications),
        });
        return;
      }
      // For the apply page – student has no application yet (show form)
      // Unless the URL has user_id filter – return the student's application
      const userFilter = params.get("user_id");
      if (userFilter) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      }
      return;
    }

    // fallback
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "[]",
    });
  });
}

// ── C# API mock router ────────────────────────────────────────────────────────

/** Make the C# probe fail (app falls back to Supabase). */
export async function mockCsharpProbeFailure(page: Page) {
  await page.route("http://localhost:5000/**", async (route) => {
    await route.abort("connectionrefused");
  });
}

/** Make the C# probe succeed and mock all C# API endpoints. */
export async function mockCsharpApiRoutes(
  page: Page,
  role: "student" | "admin" = "student"
) {
  const id = role === "admin" ? ADMIN_ID : STUDENT_ID;
  const email = role === "admin" ? "admin@adu.africa" : "student@adu.africa";
  const fullName = role === "admin" ? "ADU Administrator" : "Amara Diallo";

  await page.route("http://localhost:5000/**", async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname;

    // Probe endpoint (Swagger JSON)
    if (path.startsWith("/swagger/v1/swagger.json")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          openapi: "3.0.1",
          info: { title: "African Digital University API", version: "v1" },
        }),
      });
      return;
    }

    // Swagger UI HTML
    if (path.startsWith("/swagger")) {
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `<!DOCTYPE html><html><head><title>ADU API – Swagger UI</title>
<style>body{font-family:sans-serif;background:#1a1a2e;color:#eee;margin:0}
.topbar{background:#0f3460;padding:12px 24px;display:flex;align-items:center;gap:12px}
.topbar h1{margin:0;font-size:18px;color:#e94560}
.info{padding:24px;border-bottom:1px solid #333}
.info h2{color:#e94560;margin:0 0 8px}
.info p{margin:0;color:#aaa;font-size:14px}
.endpoints{padding:24px}
.endpoint{background:#16213e;border-radius:8px;margin-bottom:12px;overflow:hidden}
.endpoint .method{display:inline-block;padding:4px 10px;border-radius:4px;font-weight:700;font-size:12px;margin-right:12px}
.get{background:#61affe;color:#000}.post{background:#49cc90;color:#000}
.patch{background:#fca130;color:#000}.delete{background:#f93e3e;color:#fff}
.endpoint .path{font-family:monospace;font-size:14px}
.endpoint .row{padding:10px 16px;display:flex;align-items:center}
.endpoint .summary{color:#aaa;font-size:13px;margin-left:auto}
</style></head><body>
<div class="topbar"><h1>African Digital University – API</h1><span style="color:#aaa;font-size:13px">v1 · ASP.NET Core</span></div>
<div class="info">
  <h2>African Digital University API</h2>
  <p>RESTful backend for authentication, courses, enrollments, and student management.</p>
  <p style="margin-top:8px">Base URL: <code style="background:#0f3460;padding:2px 6px;border-radius:4px">http://localhost:5000</code></p>
</div>
<div class="endpoints">
  <div class="endpoint"><div class="row"><span class="method post">POST</span><span class="path">/auth/signup</span><span class="summary">Create a new user account</span></div></div>
  <div class="endpoint"><div class="row"><span class="method post">POST</span><span class="path">/auth/signin</span><span class="summary">Sign in and receive JWT</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/auth/session</span><span class="summary">Get current user session</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/courses</span><span class="summary">List all published courses</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/courses/{id}</span><span class="summary">Get a specific course</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/enrollments</span><span class="summary">List enrollments for a user</span></div></div>
  <div class="endpoint"><div class="row"><span class="method post">POST</span><span class="path">/enrollments</span><span class="summary">Enroll in a course</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/lessons</span><span class="summary">List lessons for a course</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/student-applications</span><span class="summary">List all student applications (admin)</span></div></div>
  <div class="endpoint"><div class="row"><span class="method post">POST</span><span class="path">/student-applications</span><span class="summary">Submit a new application</span></div></div>
  <div class="endpoint"><div class="row"><span class="method patch">PATCH</span><span class="path">/student-applications/{id}</span><span class="summary">Approve or reject application</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/user-roles</span><span class="summary">Get roles for a user</span></div></div>
  <div class="endpoint"><div class="row"><span class="method get">GET</span><span class="path">/profiles/{userId}</span><span class="summary">Get user profile</span></div></div>
</div>
</body></html>`,
      });
      return;
    }

    // C# auth session
    if (path === "/auth/session" || path === "/auth/session/") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          user: {
            id,
            email,
            fullName,
            createdAt: "2026-01-01T00:00:00Z",
          },
        }),
      });
      return;
    }

    // C# auth sign-in / sign-up
    if (path.startsWith("/auth/")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          accessToken: "csharp-fake-jwt-token",
          user: { id, email, fullName, createdAt: "2026-01-01T00:00:00Z" },
        }),
      });
      return;
    }

    // C# courses
    if (path === "/courses" || path === "/courses/") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(
          courses.map((c) => ({
            id: c.id,
            schoolSlug: c.school_slug,
            courseCode: c.course_code,
            title: c.title,
            description: c.description,
            semester: c.semester,
            year: c.year,
            credits: c.credits,
            orderIndex: c.order_index,
            isPublished: c.is_published,
            createdAt: c.created_at,
            updatedAt: c.updated_at,
          }))
        ),
      });
      return;
    }

    // C# single course
    if (path.startsWith("/courses/")) {
      const courseId = path.split("/courses/")[1];
      const course = courses.find((c) => c.id === courseId) ?? courses[0];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: course.id,
          schoolSlug: course.school_slug,
          courseCode: course.course_code,
          title: course.title,
          description: course.description,
          semester: course.semester,
          year: course.year,
          credits: course.credits,
          orderIndex: course.order_index,
          isPublished: course.is_published,
          createdAt: course.created_at,
          updatedAt: course.updated_at,
        }),
      });
      return;
    }

    // C# enrollments
    if (path === "/enrollments" || path === "/enrollments/") {
      if (role === "admin") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(adminEnrollments.map((e) => ({ courseId: e.course_id }))),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: "enroll-1",
            userId: STUDENT_ID,
            courseId: COURSE_ID_1,
            enrolledAt: "2026-04-01T00:00:00Z",
            completedAt: null,
          },
        ]),
      });
      return;
    }

    // C# lessons
    if (path === "/lessons" || path === "/lessons/") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(
          lessons.map((l) => ({
            id: l.id,
            courseId: l.course_id,
            title: l.title,
            content: l.content,
            videoUrl: l.video_url,
            lessonType: l.lesson_type,
            orderIndex: l.order_index,
            durationMinutes: l.duration_minutes,
            isPublished: l.is_published,
            createdAt: l.created_at,
            updatedAt: l.updated_at,
          }))
        ),
      });
      return;
    }

    // C# lesson-progress
    if (path === "/lesson-progress" || path === "/lesson-progress/") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: "progress-1",
            userId: STUDENT_ID,
            lessonId: LESSON_ID_1,
            completed: true,
            completedAt: "2026-04-14T10:00:00Z",
          },
        ]),
      });
      return;
    }

    // C# student-applications
    if (path.startsWith("/student-applications")) {
      if (role === "admin") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(
            studentApplications.map((a) => ({
              id: a.id,
              userId: a.user_id,
              fullName: a.full_name,
              email: a.email,
              phone: a.phone,
              schoolSlug: a.school_slug,
              motivation: a.motivation,
              status: a.status,
              reviewedBy: a.reviewed_by,
              reviewedAt: a.reviewed_at,
              createdAt: a.created_at,
              updatedAt: a.updated_at,
            }))
          ),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
      return;
    }

    // C# user-roles
    if (path.startsWith("/user-roles")) {
      const roleData =
        role === "admin"
          ? [{ id: "role-1", userId: id, role: "admin", createdAt: "2026-01-01T00:00:00Z" }]
          : [];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(roleData),
      });
      return;
    }

    // C# profiles
    if (path.startsWith("/profiles/")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "profile-1",
          userId: id,
          fullName,
          avatarUrl: null,
          bio: null,
          createdAt: "2026-01-01T00:00:00Z",
          updatedAt: "2026-04-15T00:00:00Z",
        }),
      });
      return;
    }

    // fallback
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
}

/** Inject a C# token into localStorage so AuthContext picks it up. */
export async function injectCsharpToken(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("adu_csharp_token", "csharp-fake-jwt-token");
  });
}
