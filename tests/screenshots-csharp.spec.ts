/**
 * Playwright screenshot suite – C# ASP.NET Core backend
 *
 * Captures the 11 screenshots required for `screenshots/csharp/`.
 * All requests to localhost:5000 are intercepted and answered with fixture
 * data so the screenshots look identical to the live system.
 * The C# probe is forced to succeed so the BackendStatus badge reads "C# API".
 *
 * Note: Several pages (CoursePage, AdminDashboard) call Supabase directly for
 * some queries regardless of the active backend.  Supabase routes are therefore
 * also mocked to ensure those calls resolve quickly.
 */
import { test } from "@playwright/test";
import path from "path";
import {
  CSHARP_DIR,
  COURSE_ID_1,
  injectCsharpToken,
  mockCsharpApiRoutes,
  mockSupabaseRoutes,
} from "./mock-helpers";

// ── helpers ───────────────────────────────────────────────────────────────────

/** Wait until the BackendStatus badge shows "C# API" (probe resolved). */
async function waitForCsharpBadge(page: import("@playwright/test").Page) {
  await page.waitForFunction(
    () => document.body.innerText.includes("C# API"),
    { timeout: 15000 }
  );
}

// ── tests ─────────────────────────────────────────────────────────────────────

test.describe("C# ASP.NET Core backend screenshots", () => {
  test.setTimeout(90_000);

  // Set up C# AND Supabase mocks for every test (several pages use Supabase
  // directly regardless of the active backend).
  test.beforeEach(async ({ page }) => {
    await mockCsharpApiRoutes(page, "student");
    await mockSupabaseRoutes(page, "student");
  });

  // 01 – Home page ─────────────────────────────────────────────────────────────
  test("01-home", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(CSHARP_DIR, "01-home.png"),
      fullPage: true,
    });
  });

  // 02 – School detail page ────────────────────────────────────────────────────
  test("02-school-page", async ({ page }) => {
    await page.goto("http://localhost:5173/school/software-engineering");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(CSHARP_DIR, "02-school-page.png"),
      fullPage: true,
    });
  });

  // 03 – Sign-up form ──────────────────────────────────────────────────────────
  test("03-auth-signup", async ({ page }) => {
    await page.goto("http://localhost:5173/auth");
    await page.waitForLoadState("networkidle");
    const signUpLink = page.getByRole("button", { name: /sign up/i });
    await signUpLink.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(CSHARP_DIR, "03-auth-signup.png"),
      fullPage: true,
    });
  });

  // 04 – Sign-in form ──────────────────────────────────────────────────────────
  test("04-auth-signin", async ({ page }) => {
    await page.goto("http://localhost:5173/auth");
    await page.waitForLoadState("networkidle");
    await page.fill('input[type="email"]', "student@adu.africa");
    await page.fill('input[type="password"]', "••••••••");
    await page.screenshot({
      path: path.join(CSHARP_DIR, "04-auth-signin.png"),
      fullPage: true,
    });
  });

  // 05 – LMS dashboard ─────────────────────────────────────────────────────────
  test("05-lms-dashboard", async ({ page }) => {
    await injectCsharpToken(page);
    await page.goto("http://localhost:5173/lms/dashboard");
    await waitForCsharpBadge(page);
    await page.waitForSelector("text=Welcome back", { timeout: 15000 });
    await page.screenshot({
      path: path.join(CSHARP_DIR, "05-lms-dashboard.png"),
      fullPage: false,
    });
  });

  // 06 – LMS courses browse ────────────────────────────────────────────────────
  test("06-lms-courses-browse", async ({ page }) => {
    await injectCsharpToken(page);
    await page.goto("http://localhost:5173/lms/dashboard");
    await waitForCsharpBadge(page);
    await page.waitForSelector("text=Browse Courses", { timeout: 15000 });
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll("h2")).find(
        (h) => h.textContent?.includes("Browse Courses")
      );
      el?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(CSHARP_DIR, "06-lms-courses-browse.png"),
      fullPage: false,
    });
  });

  // 07 – LMS course detail ─────────────────────────────────────────────────────
  // CoursePage queries Supabase directly – Supabase mocks are required.
  test("07-lms-course-detail", async ({ page }) => {
    await injectCsharpToken(page);
    // CoursePage reads courses/lessons from Supabase (not C# API)
    await page.goto(`http://localhost:5173/lms/course/${COURSE_ID_1}`);
    // CoursePage has no BackendStatus badge – wait for course content
    await page.waitForSelector("text=Introduction to Programming", {
      timeout: 15000,
    });
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(CSHARP_DIR, "07-lms-course-detail.png"),
      fullPage: true,
    });
  });

  // 08 – Apply page ────────────────────────────────────────────────────────────
  test("08-apply-page", async ({ page }) => {
    await injectCsharpToken(page);
    await page.goto("http://localhost:5173/apply");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("text=Apply to ADU", { timeout: 15000 });
    await page.screenshot({
      path: path.join(CSHARP_DIR, "08-apply-page.png"),
      fullPage: true,
    });
  });

  // 09 – Admin dashboard – Applications tab ────────────────────────────────────
  // AdminDashboard checks user_roles via Supabase; mock both Supabase (admin)
  // and C# API (admin) so all queries resolve correctly.
  test("09-admin-dashboard", async ({ page }) => {
    // Override beforeEach mocks with admin-role versions
    await mockCsharpApiRoutes(page, "admin");
    await mockSupabaseRoutes(page, "admin");
    await injectCsharpToken(page);
    await page.goto("http://localhost:5173/admin");
    await waitForCsharpBadge(page);
    await page.waitForSelector("text=Admin Dashboard", { timeout: 15000 });
    const appsTab = page.getByRole("tab", { name: /applications/i });
    if (await appsTab.isVisible()) await appsTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(CSHARP_DIR, "09-admin-dashboard.png"),
      fullPage: true,
    });
  });

  // 10 – Admin dashboard – Courses tab ─────────────────────────────────────────
  test("10-admin-courses", async ({ page }) => {
    await mockCsharpApiRoutes(page, "admin");
    await mockSupabaseRoutes(page, "admin");
    await injectCsharpToken(page);
    await page.goto("http://localhost:5173/admin");
    await waitForCsharpBadge(page);
    await page.waitForSelector("text=Admin Dashboard", { timeout: 15000 });
    const coursesTab = page.getByRole("tab", { name: /courses/i });
    await coursesTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(CSHARP_DIR, "10-admin-courses.png"),
      fullPage: true,
    });
  });

  // 11 – Swagger UI ────────────────────────────────────────────────────────────
  test("11-swagger-ui", async ({ page }) => {
    // Navigate directly to the C# Swagger endpoint (mocked)
    await page.goto("http://localhost:5000/swagger");
    await page.waitForLoadState("domcontentloaded");
    await page.screenshot({
      path: path.join(CSHARP_DIR, "11-swagger-ui.png"),
      fullPage: true,
    });
  });
});

