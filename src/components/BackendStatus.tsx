/**
 * BackendStatus
 *
 * A small pill/badge displayed in the navigation bars that shows which backend
 * is currently active.  This makes it easy to verify end-to-end that failover
 * is working correctly.
 */

import { useBackend } from "@/lib/backendProvider";
import { Server, Cloud, Loader2 } from "lucide-react";

export const BackendStatus = () => {
  const { activeBackend, checking } = useBackend();

  if (checking) {
    return (
      <span className="flex items-center gap-1 text-xs text-primary-foreground/50 px-2 py-0.5 rounded-full border border-primary-foreground/20">
        <Loader2 className="w-3 h-3 animate-spin" />
        checking…
      </span>
    );
  }

  if (activeBackend === "csharp") {
    return (
      <span
        title="Using C# ASP.NET Core backend (adu-africa database)"
        className="flex items-center gap-1 text-xs text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-400/10"
      >
        <Server className="w-3 h-3" />
        C# API
      </span>
    );
  }

  return (
    <span
      title="Using Lovable Cloud / Supabase backend"
      className="flex items-center gap-1 text-xs text-sky-400 px-2 py-0.5 rounded-full border border-sky-400/40 bg-sky-400/10"
    >
      <Cloud className="w-3 h-3" />
      Supabase
    </span>
  );
};
