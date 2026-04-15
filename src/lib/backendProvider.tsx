/**
 * Backend abstraction layer.
 *
 * Provides a React context and hook that tracks which backend (Supabase or the
 * C# API) is currently active.  On mount the hook probes the C# backend; if it
 * is reachable it becomes the active backend, otherwise Supabase is used.  The
 * probe is re-run every 30 seconds so the frontend adapts automatically when a
 * backend recovers.
 *
 * Components that need to behave differently based on the active backend can
 * read `useBackend().activeBackend`.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { isCsharpBackendAvailable } from "@/integrations/csharp/client";

export type BackendType = "supabase" | "csharp";

interface BackendContextType {
  /** The backend that is currently being used */
  activeBackend: BackendType;
  /** Whether the C# backend API URL has been configured */
  csharpConfigured: boolean;
  /** True while the initial health-check has not yet completed */
  checking: boolean;
  /** Force a manual re-check */
  recheck: () => void;
}

const BackendContext = createContext<BackendContextType>({
  activeBackend: "supabase",
  csharpConfigured: false,
  checking: true,
  recheck: () => {},
});

export const useBackend = () => useContext(BackendContext);

const CSHARP_URL = (import.meta.env.VITE_CSHARP_API_URL as string | undefined) ?? "";
const PROBE_INTERVAL_MS = 30_000;

export const BackendProvider = ({ children }: { children: ReactNode }) => {
  const csharpConfigured = Boolean(CSHARP_URL);
  const [activeBackend, setActiveBackend] = useState<BackendType>("supabase");
  const [checking, setChecking] = useState(csharpConfigured);

  const probe = async () => {
    if (!csharpConfigured) {
      setActiveBackend("supabase");
      setChecking(false);
      return;
    }

    const available = await isCsharpBackendAvailable();
    setActiveBackend(available ? "csharp" : "supabase");
    setChecking(false);
  };

  useEffect(() => {
    probe();
    const interval = setInterval(probe, PROBE_INTERVAL_MS);
    return () => clearInterval(interval);
    // probe is stable (no deps change between renders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BackendContext.Provider
      value={{ activeBackend, csharpConfigured, checking, recheck: probe }}
    >
      {children}
    </BackendContext.Provider>
  );
};
