/**
 * Playwright screenshot suite – Lovable / Supabase backend
 *
 * Captures the 10 screenshots required for `screenshots/lovable/`.
 * All Supabase API calls are intercepted and answered with fixture data so
 * the screenshots look identical to the live system.
 * The C# probe is forced to fail so the BackendStatus badge reads "Supabase".
 */
import { test, expect } from "@playwright/test";
import path from "path";
import {
  LOVABLE_DIR,
  COURSE_ID_1,
  injectSupabaseSession,
  mockSupabaseRoutes,
  mockCsharpProbeFailure,
} from "./mock-helpers";

// ── helpers ───────────────────────────────────────────────────────────────────

/** Wait until the BackendStatus badge shows "Supabase" (probe resolved). */
async function waitForSupabaseBadge(page: import("@playwright/test").Page) {
  await page.waitForFunction(() => {
    return document.body.innerText.includes("Supabase");
  }, { timeout: 15000 });
}

// ── tests ─────────────────────────────────────────────────────────────────────

test.describe("Lovable / Supabase screenshots", () => {
  test.setTimeout(90_000);

  // Force C# probe to fail for every test in this suite
  test.beforeEach(async ({ page }) => {
    await mockCsharpProbeFailure(page);
  });

  // 01 – Home page ─────────────────────────────────────────────────────────────
  test("01-home", async ({ page }) => {
    await mockSupabaseRoutes(page);
    await page.goto("http://localhost:5173/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "01-home.png"),
      fullPage: true,
    });
  });

  // 02 – School detail page ────────────────────────────────────────────────────
  test("02-school-page", async ({ page }) => {
    await mockSupabaseRoutes(page);
    await page.goto("http://localhost:5173/school/software-engineering");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "02-school-page.png"),
      fullPage: true,
    });
  });

  // 03 – Sign-up form ──────────────────────────────────────────────────────────
  test("03-auth-signup", async ({ page }) => {
    await mockSupabaseRoutes(page);
    await page.goto("http://localhost:5173/auth");
    await page.waitForLoadState("networkidle");
    // Switch to Sign Up tab
    const signUpLink = page.getByRole("button", { name: /sign up/i });
    await signUpLink.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "03-auth-signup.png"),
      fullPage: true,
    });
  });

  // 04 – Sign-in form ──────────────────────────────────────────────────────────
  test("04-auth-signin", async ({ page }) => {
    await mockSupabaseRoutes(page);
    await page.goto("http://localhost:5173/auth");
    await page.waitForLoadState("networkidle");
    // Pre-fill the form to make the screenshot more informative
    await page.fill('input[type="email"]', "student@adu.africa");
    await page.fill('input[type="password"]', "••••••••");
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "04-auth-signin.png"),
      fullPage: true,
    });
  });

  // 05 – LMS dashboard (student) ───────────────────────────────────────────────
  test("05-lms-dashboard", async ({ page }) => {
    await injectSupabaseSession(page, "student");
    await mockSupabaseRoutes(page, "student");
    await page.goto("http://localhost:5173/lms/dashboard");
    await waitForSupabaseBadge(page);
    // Wait for the welcome message to render
    await page.waitForSelector("text=Welcome back", { timeout: 15000 });
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "05-lms-dashboard.png"),
      fullPage: false,
    });
  });

  // 06 – LMS courses browse ────────────────────────────────────────────────────
  test("06-lms-courses-browse", async ({ page }) => {
    await injectSupabaseSession(page, "student");
    await mockSupabaseRoutes(page, "student");
    await page.goto("http://localhost:5173/lms/dashboard");
    await waitForSupabaseBadge(page);
    await page.waitForSelector("text=Browse Courses", { timeout: 15000 });
    // Scroll to the Browse Courses section
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll("h2")).find(
        (h) => h.textContent?.includes("Browse Courses")
      );
      el?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "06-lms-courses-browse.png"),
      fullPage: false,
    });
  });

  // 07 – LMS course detail ─────────────────────────────────────────────────────
  test("07-lms-course-detail", async ({ page }) => {
    await injectSupabaseSession(page, "student");
    await mockSupabaseRoutes(page, "student");
    await page.goto(`http://localhost:5173/lms/course/${COURSE_ID_1}`);
    // CoursePage has no BackendStatus badge – wait for course content
    await page.waitForSelector("text=Introduction to Programming", {
      timeout: 15000,
    });
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "07-lms-course-detail.png"),
      fullPage: true,
    });
  });

  // 08 – Apply page ────────────────────────────────────────────────────────────
  test("08-apply-page", async ({ page }) => {
    await injectSupabaseSession(page, "student");
    await mockSupabaseRoutes(page, "student");
    await page.goto("http://localhost:5173/apply");
    await page.waitForLoadState("networkidle");
    // Wait for the form to appear (spinner gone)
    await page.waitForSelector("text=Apply to ADU", { timeout: 15000 });
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "08-apply-page.png"),
      fullPage: true,
    });
  });

  // 09 – Admin dashboard – Applications tab ────────────────────────────────────
  test("09-admin-dashboard", async ({ page }) => {
    await injectSupabaseSession(page, "admin");
    await mockSupabaseRoutes(page, "admin");
    await page.goto("http://localhost:5173/admin");
    await waitForSupabaseBadge(page);
    await page.waitForSelector("text=Admin Dashboard", { timeout: 15000 });
    // Make sure Applications tab is active
    const appsTab = page.getByRole("tab", { name: /applications/i });
    if (await appsTab.isVisible()) await appsTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "09-admin-dashboard.png"),
      fullPage: true,
    });
  });

  // 10 – Admin dashboard – Courses tab ─────────────────────────────────────────
  test("10-admin-courses", async ({ page }) => {
    await injectSupabaseSession(page, "admin");
    await mockSupabaseRoutes(page, "admin");
    await page.goto("http://localhost:5173/admin");
    await waitForSupabaseBadge(page);
    await page.waitForSelector("text=Admin Dashboard", { timeout: 15000 });
    // Switch to the Courses tab
    const coursesTab = page.getByRole("tab", { name: /courses/i });
    await coursesTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(LOVABLE_DIR, "10-admin-courses.png"),
      fullPage: true,
    });
  });
});
