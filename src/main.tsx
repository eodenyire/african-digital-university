import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Catch unhandled errors and show them instead of a blank page
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
});

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

try {
  createRoot(rootEl).render(<App />);
} catch (err) {
  console.error("React render error:", err);
  rootEl.innerHTML = `<div style="padding:40px;font-family:monospace;color:red">
    <h2>App failed to start</h2>
    <pre>${err instanceof Error ? err.message : String(err)}</pre>
  </div>`;
}
