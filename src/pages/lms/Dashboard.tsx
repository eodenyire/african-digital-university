import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, LogOut, Trophy, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import aduLogo from "@/assets/adu-logo.png";
import { BackendStatus } from "@/components/BackendStatus";

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
  const navigate = useNavigate();

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

  const { data: enrollments } = useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*, courses(*)")
        .eq("user_id", user!.id);
      return data;
    },
    enabled: !!user,
  });

  const { data: allCourses } = useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("year")
        .order("semester")
        .order("order_index");
      return data;
    },
  });

  const enrolledCourseIds = new Set(enrollments?.map((e: any) => e.course_id) ?? []);

  // Group courses by school
  const coursesBySchool = (allCourses ?? []).reduce((acc: Record<string, any[]>, course: any) => {
    if (!acc[course.school_slug]) acc[course.school_slug] = [];
    acc[course.school_slug].push(course);
    return acc;
  }, {});

  // Group courses within a school by year+semester
  const groupBySemester = (courses: any[]) => {
    const groups: Record<string, any[]> = {};
    for (const c of courses) {
      const key = `Year ${c.year} · Semester ${c.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    }
    return groups;
  };

  const handleEnroll = async (courseId: string) => {
    await supabase.from("enrollments").insert({ user_id: user!.id, course_id: courseId });
    navigate(0);
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
              {profile?.full_name || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">
            Welcome back, {profile?.full_name || "Student"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Your learning journey at African Digital University</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Enrolled Courses", value: enrollments?.length ?? 0 },
            { icon: Trophy, label: "Completed", value: 0 },
            { icon: Clock, label: "Hours Studied", value: 0 },
            { icon: GraduationCap, label: "Certificates", value: 0 },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <s.icon className="w-5 h-5 text-secondary mb-2" />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Enrolled Courses */}
        {enrollments && enrollments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">My Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrollments.map((enrollment: any) => (
                <Link
                  key={enrollment.id}
                  to={`/lms/course/${enrollment.courses.id}`}
                  className="bg-card rounded-xl border border-border p-5 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {enrollment.courses.course_code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Year {enrollment.courses.year} · Sem {enrollment.courses.semester}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{enrollment.courses.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {enrollment.courses.description}
                  </p>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">0% complete</div>
                </Link>
              ))}
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
                          {courses.map((course: any) => {
                            const isEnrolled = enrolledCourseIds.has(course.id);
                            return (
                              <div key={course.id} className="bg-card rounded-xl border border-border p-5">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                    {course.course_code}
                                  </span>
                                  <span className="text-xs text-muted-foreground">{course.credits} credits</span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2">{course.title}</h4>
                                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                                  {course.description}
                                </p>
                                {isEnrolled ? (
                                  <Link to={`/lms/course/${course.id}`}>
                                    <Button size="sm" variant="outline" className="w-full">
                                      Continue <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                  </Link>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => handleEnroll(course.id)}
                                    className="w-full bg-primary hover:bg-primary/90"
                                  >
                                    Enroll Now
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
