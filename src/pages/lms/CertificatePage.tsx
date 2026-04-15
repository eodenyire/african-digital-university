import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, Award, BookOpen, Users, FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import aduLogo from "@/assets/adu-logo.png";
import CertificateTemplate from "@/components/CertificateTemplate";

const SCHOOL_PROGRAM_LABELS: Record<string, string> = {
  "software-engineering": "3-Year Software Engineering Bootcamp Program",
  "ai-data-science": "3-Year AI & Data Science Bootcamp Program",
  "backend-engineering": "3-Year Backend Engineering Bootcamp Program",
  "frontend-engineering": "3-Year Frontend Engineering Bootcamp Program",
  "cloud-engineering": "3-Year Cloud Engineering Bootcamp Program",
  "data-engineering": "3-Year Data Engineering Bootcamp Program",
  "fintech-digital-banking": "3-Year FinTech & Digital Banking Bootcamp Program",
  "internet-systems": "3-Year Internet Systems Bootcamp Program",
  "cybersecurity": "3-Year Cybersecurity Bootcamp Program",
  "product-design": "3-Year Product Design & UX Bootcamp Program",
};

const CertificatePage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newSub, setNewSub] = useState({
    title: "",
    description: "",
    github_url: "",
    submission_type: "project" as "project" | "capstone",
  });

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: certificate, isLoading: certLoading } = useQuery({
    queryKey: ["certificate", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  // Courses and lesson completion
  const { data: enrollments } = useQuery({
    queryKey: ["cert-enrollments", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*, courses(*)")
        .eq("user_id", user!.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: allLessons } = useQuery({
    queryKey: ["cert-lessons", user?.id, enrollments],
    queryFn: async () => {
      const courseIds = (enrollments ?? []).map((e: any) => e.course_id);
      if (courseIds.length === 0) return [];
      const { data } = await supabase
        .from("lessons")
        .select("id, course_id")
        .in("course_id", courseIds)
        .eq("is_published", true);
      return data ?? [];
    },
    enabled: !!user && !!enrollments && enrollments.length > 0,
  });

  const { data: lessonProgress } = useQuery({
    queryKey: ["cert-progress", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed")
        .eq("user_id", user!.id)
        .eq("completed", true);
      return data ?? [];
    },
    enabled: !!user,
  });

  // VILT sessions and attendance
  const { data: viltSessions } = useQuery({
    queryKey: ["cert-vilt-sessions"],
    queryFn: async () => {
      const { data } = await supabase
        .from("vilt_sessions")
        .select("*")
        .eq("is_required", true);
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: viltAttendance } = useQuery({
    queryKey: ["cert-vilt-attendance", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("vilt_attendance")
        .select("session_id")
        .eq("user_id", user!.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  // Capstone and project submissions
  const { data: capstoneSubs } = useQuery({
    queryKey: ["cert-capstone", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("capstone_submissions")
        .select("*")
        .eq("user_id", user!.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  // Get student's school from approved application
  const { data: application } = useQuery({
    queryKey: ["cert-application", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_applications")
        .select("school_slug")
        .eq("user_id", user!.id)
        .eq("status", "approved")
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const submitProject = useMutation({
    mutationFn: async () => {
      await supabase.from("capstone_submissions").insert({
        user_id: user!.id,
        school_slug: application?.school_slug ?? "general",
        title: newSub.title,
        description: newSub.description || null,
        github_url: newSub.github_url || null,
        submission_type: newSub.submission_type,
      });
    },
    onSuccess: () => {
      setNewSub({ title: "", description: "", github_url: "", submission_type: "project" });
      setShowSubmitForm(false);
      queryClient.invalidateQueries({ queryKey: ["cert-capstone", user?.id] });
    },
  });

  // Compute eligibility
  const totalLessons = (allLessons ?? []).length;
  const completedLessonIds = new Set((lessonProgress ?? []).map((p: any) => p.lesson_id));
  const completedLessons = (allLessons ?? []).filter((l: any) => completedLessonIds.has(l.id)).length;
  const coursesComplete = totalLessons > 0 && completedLessons === totalLessons;

  const requiredVilt = (viltSessions ?? []).length;
  const attendedViltIds = new Set((viltAttendance ?? []).map((a: any) => a.session_id));
  const attendedVilt = (viltSessions ?? []).filter((s: any) => attendedViltIds.has(s.id)).length;
  const viltComplete = requiredVilt > 0 && attendedVilt === requiredVilt;

  const approvedCapstone = (capstoneSubs ?? []).some((s: any) => s.submission_type === "capstone" && s.status === "approved");
  const approvedProjects = (capstoneSubs ?? []).filter((s: any) => s.submission_type === "project" && s.status === "approved").length;
  const projectsComplete = approvedCapstone && approvedProjects >= 1;

  const isEligible = coursesComplete && viltComplete && projectsComplete;

  if (certLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-foreground border-b border-border sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/lms/dashboard" className="flex items-center gap-2">
            <img src={aduLogo} alt="ADU" className="w-7 h-7 brightness-0 invert" />
          </Link>
          <ArrowLeft className="w-4 h-4 text-primary-foreground/40" />
          <span className="text-sm text-primary-foreground font-medium">My Certificate</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {certificate ? (
          /* ── Certificate issued ── */
          <div>
            <div className="text-center mb-6 print:hidden">
              <h1 className="text-2xl font-extrabold text-foreground">Your Certificate of Completion</h1>
              <p className="text-muted-foreground mt-1">Congratulations on completing the program!</p>
            </div>
            <CertificateTemplate
              studentName={profile?.full_name || "Student"}
              programName={
                SCHOOL_PROGRAM_LABELS[certificate.school_slug] ||
                certificate.program_name
              }
              certificateNumber={certificate.certificate_number}
              verificationCode={certificate.verification_code}
              issuedAt={certificate.issued_at}
            />
          </div>
        ) : (
          /* ── Not yet issued ── */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Award className="w-14 h-14 text-secondary mx-auto mb-3" />
              <h1 className="text-2xl font-extrabold text-foreground">Certificate of Completion</h1>
              <p className="text-muted-foreground mt-2">
                Complete all the requirements below to earn your ADU certificate.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-5">
              <h2 className="font-bold text-foreground text-lg">Eligibility Checklist</h2>

              {/* Courses */}
              <RequirementRow
                icon={BookOpen}
                done={coursesComplete}
                label="Online Course Modules"
                detail={
                  totalLessons === 0
                    ? "No courses enrolled yet"
                    : `${completedLessons} / ${totalLessons} lessons completed across all enrolled courses`
                }
              />

              {/* VILT */}
              <RequirementRow
                icon={Users}
                done={viltComplete}
                label="Virtual Instructor-Led Sessions"
                detail={
                  requiredVilt === 0
                    ? "No sessions scheduled yet"
                    : `${attendedVilt} / ${requiredVilt} required sessions attended`
                }
              />

              {/* Projects + Capstone */}
              <RequirementRow
                icon={FolderOpen}
                done={projectsComplete}
                label="Projects & Capstone Submission"
                detail={
                  approvedCapstone
                    ? `Capstone approved · ${approvedProjects} project(s) approved`
                    : `Capstone: ${approvedCapstone ? "✓" : "pending"} · Approved projects: ${approvedProjects}`
                }
              />
            </div>

            {/* Submit project/capstone form */}
            <div className="mt-6 bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-secondary" />
                  Submit a Project or Capstone
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSubmitForm((v) => !v)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {showSubmitForm ? "Cancel" : "New Submission"}
                </Button>
              </div>

              {/* Existing submissions list */}
              {(capstoneSubs ?? []).length > 0 && (
                <div className="space-y-2 mb-4">
                  {(capstoneSubs ?? []).map((sub: any) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between bg-muted rounded-lg px-3 py-2 text-sm"
                    >
                      <div>
                        <span className="font-medium text-foreground">{sub.title}</span>
                        <span className="ml-2 text-xs text-muted-foreground capitalize">
                          ({sub.submission_type})
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          sub.status === "approved"
                            ? "text-primary"
                            : sub.status === "rejected"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {showSubmitForm && (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <select
                      className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
                      value={newSub.submission_type}
                      onChange={(e) =>
                        setNewSub((v) => ({
                          ...v,
                          submission_type: e.target.value as "project" | "capstone",
                        }))
                      }
                    >
                      <option value="project">Project</option>
                      <option value="capstone">Capstone</option>
                    </select>
                    <Input
                      placeholder="Project title"
                      value={newSub.title}
                      onChange={(e) => setNewSub((v) => ({ ...v, title: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                  <Input
                    placeholder="GitHub URL (optional)"
                    value={newSub.github_url}
                    onChange={(e) => setNewSub((v) => ({ ...v, github_url: e.target.value }))}
                  />
                  <Input
                    placeholder="Brief description (optional)"
                    value={newSub.description}
                    onChange={(e) => setNewSub((v) => ({ ...v, description: e.target.value }))}
                  />
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => submitProject.mutate()}
                    disabled={submitProject.isPending || !newSub.title}
                  >
                    {submitProject.isPending ? "Submitting…" : "Submit"}
                  </Button>
                </div>
              )}
            </div>

            {isEligible ? (
              <div className="mt-6 bg-primary/10 border border-primary rounded-xl p-5 text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">
                  You have met all requirements!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your certificate is being processed by the admin team. Check back soon.
                </p>
              </div>
            ) : (
              <div className="mt-6 bg-muted rounded-xl p-4 text-center text-sm text-muted-foreground">
                Complete all requirements above to qualify for your certificate of completion.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface RequirementRowProps {
  icon: React.ElementType;
  done: boolean;
  label: string;
  detail: string;
}

const RequirementRow = ({ icon: Icon, done, label, detail }: RequirementRowProps) => (
  <div className="flex items-start gap-4">
    <div className={`mt-0.5 shrink-0 ${done ? "text-primary" : "text-muted-foreground"}`}>
      {done ? (
        <CheckCircle className="w-6 h-6" />
      ) : (
        <Circle className="w-6 h-6" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${done ? "text-secondary" : "text-muted-foreground"}`} />
        <span className={`font-semibold text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>
          {label}
        </span>
        {done && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            Complete
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
    </div>
  </div>
);

export default CertificatePage;
