import { useAuth } from "@/contexts/AuthContext";
import { useBackend } from "@/lib/backendProvider";
import { supabase } from "@/integrations/supabase/client";
import { csharpCourses, csharpEnrollments, csharpProfiles } from "@/integrations/csharp/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, LogOut, Trophy, Clock, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import aduLogo from "@/assets/adu-logo.png";
import { BackendStatus } from "@/components/BackendStatus";
import { useState } from "react";

const SCHOOL_LABELS: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "ai-data-science": "AI & Data Science",
  "backend-engineering": "Backend Engineering",
  "frontend-engineering": "Frontend Engineering",
  "cloud-engineering": "Cloud Engineering",
  "data-engineering": "Data Engineering",
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { activeBackend } = useBackend();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const isCsharp = activeBackend === "csharp";

  // ── Profile ──────────────────────────────────────────────────────────────
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id, activeBackend],
    queryFn: async () => {
      if (isCsharp) {
        return await csharpProfiles.get(user!.id);
      }
      const { data } = await supabase
        .from("profiles").select("*").eq("user_id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  // ── Enrollments ───────────────────────────────────────────────────────────
  const { data: enrollments } = useQuery({
    queryKey: ["enrollments", user?.id, activeBackend],
    queryFn: async () => {
      if (isCsharp) {
        return await csharpEnrollments.list(user!.id);
      }
      const { data } = await supabase
        .from("enrollments").select("*, courses(*)").eq("user_id", user!.id);
      return data;
    },
    enabled: !!user,
  });

  // ── All published courses ─────────────────────────────────────────────────
  const { data: allCourses } = useQuery({
    queryKey: ["all-courses", activeBackend],
    queryFn: async () => {
      if (isCsharp) {
        return await csharpCourses.list();
      }
      const { data } = await supabase
        .from("courses").select("*").eq("is_published", true)
        .order("year").order("semester").order("order_index");
      return data;
    },
  });

  // ── Certificate (Supabase only for now) ───────────────────────────────────
  const { data: certificate } = useQuery({
    queryKey: ["certificate", user?.id],
    queryFn: async () => {
      if (isCsharp) return null; // C# certificate endpoint TBD
      const { data } = await supabase
        .from("certificates").select("id").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  // ── Normalise enrollment data for both backends ───────────────────────────
  // Supabase returns: { id, course_id, courses: { id, course_code, ... } }
  // C# returns:       { id, courseId, course: { id, courseCode, ... } }
  const normalisedEnrollments = (enrollments ?? []).map((e: any) => ({
    id: e.id,
    courseId: e.courseId ?? e.course_id,
    course: e.course ?? e.courses,
  }));

  const enrolledCourseIds = new Set(normalisedEnrollments.map((e) => e.courseId));

  // ── Normalise course data ─────────────────────────────────────────────────
  // Supabase: snake_case  |  C#: camelCase
  const normaliseCourse = (c: any) => ({
    id: c.id,
    schoolSlug: c.schoolSlug ?? c.school_slug,
    courseCode: c.courseCode ?? c.course_code,
    title: c.title,
    description: c.description,
    year: c.year,
    semester: c.semester,
    credits: c.credits,
    orderIndex: c.orderIndex ?? c.order_index,
    isPublished: c.isPublished ?? c.is_published,
  });

  const normalisedCourses = (allCourses ?? []).map(normaliseCourse);

  // Group by school
  const coursesBySchool = normalisedCourses.reduce((acc: Record<string, any[]>, course) => {
    if (!acc[course.schoolSlug]) acc[course.schoolSlug] = [];
    acc[course.schoolSlug].push(course);
    return acc;
  }, {});

  const groupBySemester = (courses: any[]) => {
    const groups: Record<string, any[]> = {};
    for (const c of courses) {
      const key = `Year ${c.year} · Semester ${c.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    }
    return groups;
  };

  // ── Enroll ────────────────────────────────────────────────────────────────
  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    setEnrollError(null);
    try {
      if (isCsharp) {
        await csharpEnrollments.enroll(user!.id, courseId);
      } else {
        const { error } = await supabase
          .from("enrollments").insert({ user_id: user!.id, course_id: courseId });
        if (error) throw error;
      }
      // Refresh enrollments
      queryClient.invalidateQueries({ queryKey: ["enrollments", user?.id, activeBackend] });
    } catch (err: any) {
      setEnrollError(err.message ?? "Enrollment failed");
    } finally {
      setEnrollingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const schoolSlugs = Object.keys(coursesBySchool);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="bg-foreground border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={aduLogo} alt="ADU" className="w-8 h-8 brightness-0 invert" />
            <span className="font-bold text-primary-foreground">ADU Learning Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <BackendStatus />
            <span className="text-primary-foreground/60 text-sm hidden sm:block">
              {(profile as any)?.fullName ?? (profile as any)?.full_name ?? user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}
              className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">
            Welcome back, {(profile as any)?.fullName ?? (profile as any)?.full_name ?? "Student"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Your learning journey at African Digital University</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Enrolled Courses", value: normalisedEnrollments.length },
            { icon: Trophy, label: "Completed", value: 0 },
            { icon: Clock, label: "Hours Studied", value: 0 },
            { icon: GraduationCap, label: "Certificates", value: certificate ? 1 : 0 },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <s.icon className="w-5 h-5 text-secondary mb-2" />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Certificate banner */}
        <Link to="/lms/certificate"
          className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 mb-8 hover:shadow-card transition-shadow group">
          <Award className="w-10 h-10 text-secondary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-foreground">Certificate of Completion</div>
            <div className="text-sm text-muted-foreground">
              {certificate
                ? "View and download your certificate"
                : "Check your eligibility and track your progress toward your certificate"}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        {/* Enroll error */}
        {enrollError && (
          <div className="mb-4 text-sm text-accent bg-accent/10 px-4 py-3 rounded-lg">
            {enrollError}
          </div>
        )}

        {/* My Enrolled Courses */}
        {normalisedEnrollments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">My Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {normalisedEnrollments.map((enrollment) => {
                const c = enrollment.course;
                if (!c) return null;
                return (
                  <Link key={enrollment.id} to={`/lms/course/${c.id}`}
                    className="bg-card rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {c.courseCode ?? c.course_code}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Year {c.year} · Sem {c.semester}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{c.description}</p>
                    <Progress value={0} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">0% complete</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Browse Courses by School */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Browse Courses</h2>
          {schoolSlugs.length > 0 ? (
            <Tabs defaultValue={schoolSlugs[0]} className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 mb-6">
                {schoolSlugs.map((slug) => (
                  <TabsTrigger key={slug} value={slug} className="text-xs sm:text-sm whitespace-nowrap">
                    {SCHOOL_LABELS[slug] || slug}
                  </TabsTrigger>
                ))}
              </TabsList>

              {schoolSlugs.map((slug) => {
                const semesterGroups = groupBySemester(coursesBySchool[slug]);
                return (
                  <TabsContent key={slug} value={slug}>
                    {Object.entries(semesterGroups).map(([semLabel, courses]) => (
                      <div key={semLabel} className="mb-8">
                        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-secondary" />
                          {semLabel}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {courses.map((course) => {
                            const isEnrolled = enrolledCourseIds.has(course.id);
                            const isEnrolling = enrollingId === course.id;
                            return (
                              <div key={course.id} className="bg-card rounded-xl border border-border p-5">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                    {course.courseCode}
                                  </span>
                                  <span className="text-xs text-muted-foreground">{course.credits} credits</span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2">{course.title}</h4>
                                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                                {isEnrolled ? (
                                  <Link to={`/lms/course/${course.id}`}>
                                    <Button size="sm" variant="outline" className="w-full">
                                      Continue <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                  </Link>
                                ) : (
                                  <Button size="sm" onClick={() => handleEnroll(course.id)}
                                    disabled={isEnrolling}
                                    className="w-full bg-primary hover:bg-primary/90">
                                    {isEnrolling ? "Enrolling..." : "Enroll Now"}
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                );
              })}
            </Tabs>
          ) : (
            <div className="text-center py-16">
              <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">No courses available yet</h2>
              <p className="text-muted-foreground">Courses are being prepared. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
