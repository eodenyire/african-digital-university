import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for capturing live-system screenshots.
 *
 * Both test suites (lovable & csharp) share the same Vite dev server.
 * The VITE_CSHARP_API_URL env-var is set to http://localhost:5000 so the
 * BackendProvider is "configured" for C#; individual spec files then use
 * page.route() to either succeed or fail the probe, selecting which backend
 * the app uses for that screenshot run.
 */
export default defineConfig({
  testDir: "./",
  testMatch: /screenshots-(lovable|csharp)\.spec\.ts/,
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  use: {
    viewport: { width: 1280, height: 800 },
    ...devices["Desktop Chrome"],
    screenshot: "off",
    video: "off",
    trace: "off",
  },
  webServer: {
    command:
      "VITE_CSHARP_API_URL=http://localhost:5000 npm run dev -- --port 5173",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
