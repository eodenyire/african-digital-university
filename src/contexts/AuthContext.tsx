import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import {
  csharpAuth,
  getCsharpToken,
  clearCsharpToken,
} from "@/integrations/csharp/client";
import { useBackend } from "@/lib/backendProvider";
import type { UserDto } from "@/integrations/csharp/types";

// ── Unified user shape ─────────────────────────────────────────────────────

interface UnifiedUser {
  id: string;
  email: string;
}

interface AuthContextType {
  /** Supabase session (null when using C# backend) */
  session: Session | null;
  /** Supabase user or a minimal object synthesised from the C# JWT */
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Helper – synthesise a Supabase-compatible User from a C# UserDto ───────

function toFakeUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: dto.createdAt,
  } as unknown as User;
}

// ── Provider ────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { activeBackend, checking } = useBackend();
  const [session, setSession] = useState<Session | null>(null);
  const [csharpUser, setCsharpUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Supabase auth state ──────────────────────────────────────────────────
  useEffect(() => {
    if (checking) return; // wait until backend probe is done
    if (activeBackend !== "supabase") return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [activeBackend, checking]);

  // ── C# backend auth state ────────────────────────────────────────────────
  useEffect(() => {
    if (checking) return;
    if (activeBackend !== "csharp") return;

    const token = getCsharpToken();
    if (!token) {
      setLoading(false);
      return;
    }

    csharpAuth
      .getSession()
      .then((res) => {
        setCsharpUser(res.user ? toFakeUser(res.user) : null);
      })
      .catch(() => {
        clearCsharpToken();
        setCsharpUser(null);
      })
      .finally(() => setLoading(false));
  }, [activeBackend, checking]);

  // Reset loading when backend check completes
  useEffect(() => {
    if (!checking) return;
    setLoading(true);
  }, [checking]);

  const signOut = async () => {
    if (activeBackend === "csharp") {
      await csharpAuth.signOut();
      setCsharpUser(null);
    } else {
      await supabase.auth.signOut();
    }
  };

  const user = activeBackend === "csharp"
    ? csharpUser
    : (session?.user ?? null);

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
