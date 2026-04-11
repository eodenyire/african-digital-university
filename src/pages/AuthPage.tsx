import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import aduLogo from "@/assets/adu-logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    // Check if admin
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const roles = data?.map((r: any) => r.role) ?? [];
        if (roles.includes("admin")) {
          navigate("/admin");
        } else {
          // Check student application status
          supabase
            .from("student_applications")
            .select("status")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .then(({ data: apps }) => {
              if (apps && apps.length > 0 && apps[0].status === "approved") {
                navigate("/lms/dashboard");
              } else {
                navigate("/apply");
              }
            });
        }
      });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setSignupSuccess(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <img src={aduLogo} alt="ADU Logo" className="w-20 h-20 mx-auto mb-6" />
          <div className="bg-card rounded-2xl p-8 shadow-elevated">
            <h2 className="text-xl font-bold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground text-sm">
              We've sent a verification link to <strong>{email}</strong>. Please verify your email to continue.
            </p>
            <Button className="mt-4" variant="outline" onClick={() => { setSignupSuccess(false); setIsLogin(true); }}>
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={aduLogo} alt="ADU Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-primary-foreground">
            {isLogin ? "Welcome Back" : "Join ADU"}
          </h1>
          <p className="text-primary-foreground/50 mt-2">
            {isLogin ? "Sign in to your portal" : "Create your account to apply"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-elevated space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" required={!isLogin} />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@adu.africa" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
          </div>

          {error && <div className="text-sm text-accent bg-accent/10 px-3 py-2 rounded-lg">{error}</div>}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-secondary font-semibold hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
