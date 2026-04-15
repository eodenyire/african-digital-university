import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import aduLogo from "@/assets/adu-logo.png";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const SCHOOLS = [
  { slug: "software-engineering", label: "Software Engineering" },
  { slug: "ai-data-science", label: "AI & Data Science" },
  { slug: "fullstack-development", label: "Full Stack Development" },
  { slug: "backend-development", label: "Backend Development" },
  { slug: "frontend-engineering", label: "Frontend Engineering" },
  { slug: "cloud-engineering", label: "Cloud Engineering" },
  { slug: "data-engineering", label: "Data Engineering" },
  { slug: "fintech-digital-banking", label: "FinTech & Digital Banking" },
  { slug: "internet-systems", label: "Internet Systems" },
  { slug: "cybersecurity", label: "Cybersecurity" },
  { slug: "product-design", label: "Product Design & UX" },
];

const ApplyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolSlug, setSchoolSlug] = useState("");
  const [motivation, setMotivation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (user?.user_metadata?.full_name) setFullName(user.user_metadata.full_name);
  }, [user]);

  const { data: existingApplication, isLoading: checkingApp } = useQuery({
    queryKey: ["application", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_applications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(1);
      return data?.[0] ?? null;
    },
    enabled: !!user,
  });

  // If approved, redirect to dashboard
  useEffect(() => {
    if (existingApplication?.status === "approved") {
      navigate("/lms/dashboard");
    }
  }, [existingApplication, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: insertError } = await supabase.from("student_applications").insert({
        user_id: user!.id,
        full_name: fullName,
        email,
        phone: phone || null,
        school_slug: schoolSlug,
        motivation: motivation || null,
      });
      if (insertError) throw insertError;
      navigate(0); // refresh to show status
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show application status if already applied
  if (existingApplication) {
    const statusConfig = {
      pending: { icon: Clock, color: "text-secondary", bg: "bg-secondary/10", label: "Application Under Review", desc: "Your application is being reviewed by our admissions team. You'll be notified once a decision is made." },
      approved: { icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", label: "Application Approved!", desc: "Congratulations! You've been accepted. Redirecting to your dashboard..." },
      rejected: { icon: XCircle, color: "text-accent", bg: "bg-accent/10", label: "Application Not Approved", desc: "Unfortunately, your application was not approved at this time. Please contact admissions for more information." },
    };
    const cfg = statusConfig[existingApplication.status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = cfg.icon;

    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <img src={aduLogo} alt="ADU Logo" className="w-20 h-20 mx-auto mb-6" />
          <div className={`${cfg.bg} rounded-2xl p-8`}>
            <Icon className={`w-16 h-16 mx-auto mb-4 ${cfg.color}`} />
            <h2 className="text-xl font-bold text-foreground mb-2">{cfg.label}</h2>
            <p className="text-muted-foreground text-sm">{cfg.desc}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Applied to: {SCHOOLS.find(s => s.slug === existingApplication.school_slug)?.label}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img src={aduLogo} alt="ADU Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-primary-foreground">Apply to ADU</h1>
          <p className="text-primary-foreground/50 mt-2">Submit your application to join the university</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-elevated space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Phone (optional)</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 700 000 000" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">School / Program</label>
            <Select value={schoolSlug} onValueChange={setSchoolSlug} required>
              <SelectTrigger><SelectValue placeholder="Select a school" /></SelectTrigger>
              <SelectContent>
                {SCHOOLS.map(s => (
                  <SelectItem key={s.slug} value={s.slug}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Why do you want to join ADU?</label>
            <Textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} placeholder="Tell us about your goals and motivation..." rows={4} />
          </div>

          {error && <div className="text-sm text-accent bg-accent/10 px-3 py-2 rounded-lg">{error}</div>}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading || !schoolSlug}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
