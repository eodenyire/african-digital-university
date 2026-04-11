import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Users, BookOpen, GraduationCap, LogOut, CheckCircle, XCircle, Clock, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import aduLogo from "@/assets/adu-logo.png";
import { useState } from "react";

const SCHOOL_LABELS: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "ai-data-science": "AI & Data Science",
  "backend-engineering": "Backend Engineering",
  "frontend-engineering": "Frontend Engineering",
  "cloud-engineering": "Cloud Engineering",
  "data-engineering": "Data Engineering",
  "fintech-digital-banking": "FinTech & Digital Banking",
  "internet-systems": "Internet Systems",
  "cybersecurity": "Cybersecurity",
  "product-design": "Product Design & UX",
};

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Check admin role
  const { data: isAdmin, isLoading: checkingRole } = useQuery({
    queryKey: ["admin-role", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin");
      return (data?.length ?? 0) > 0;
    },
    enabled: !!user,
  });

  // Fetch applications
  const { data: applications } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_applications")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  // Fetch all courses
  const { data: courses } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").order("school_slug").order("year").order("semester").order("order_index");
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  // Fetch enrollment counts
  const { data: enrollments } = useQuery({
    queryKey: ["admin-enrollments"],
    queryFn: async () => {
      const { data } = await supabase.from("enrollments").select("course_id");
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  // Fetch lessons count
  const { data: lessons } = useQuery({
    queryKey: ["admin-lessons"],
    queryFn: async () => {
      const { data } = await supabase.from("lessons").select("id, course_id");
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  const handleApplication = async (appId: string, status: "approved" | "rejected") => {
    setProcessingId(appId);
    try {
      // Update application status
      await supabase
        .from("student_applications")
        .update({ status, reviewed_by: user!.id, reviewed_at: new Date().toISOString() })
        .eq("id", appId);

      // If approved, add student role
      if (status === "approved") {
        const app = applications?.find((a: any) => a.id === appId);
        if (app) {
          await supabase.from("user_roles").insert({ user_id: app.user_id, role: "student" });
        }
      }

      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
    } finally {
      setProcessingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
          <Link to="/lms/dashboard"><Button>Go to Student Dashboard</Button></Link>
        </div>
      </div>
    );
  }

  const pendingApps = applications?.filter((a: any) => a.status === "pending") ?? [];
  const approvedApps = applications?.filter((a: any) => a.status === "approved") ?? [];
  const enrollmentCounts = (enrollments ?? []).reduce((acc: Record<string, number>, e: any) => {
    acc[e.course_id] = (acc[e.course_id] || 0) + 1;
    return acc;
  }, {});
  const lessonCounts = (lessons ?? []).reduce((acc: Record<string, number>, l: any) => {
    acc[l.course_id] = (acc[l.course_id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-foreground border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={aduLogo} alt="ADU" className="w-8 h-8 brightness-0 invert" />
            <span className="font-bold text-primary-foreground">ADU Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/lms/dashboard"><Button variant="ghost" size="sm" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">Student View</Button></Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Manage applications, courses, and view analytics</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock, label: "Pending Applications", value: pendingApps.length, color: "text-secondary" },
            { icon: Users, label: "Approved Students", value: approvedApps.length, color: "text-primary" },
            { icon: BookOpen, label: "Total Courses", value: courses?.length ?? 0, color: "text-secondary" },
            { icon: BarChart3, label: "Total Enrollments", value: enrollments?.length ?? 0, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="applications">Applications ({pendingApps.length} pending)</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(applications ?? []).length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No applications yet</TableCell></TableRow>
                  ) : (
                    (applications ?? []).map((app: any) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell><span className="text-xs">{SCHOOL_LABELS[app.school_slug] || app.school_slug}</span></TableCell>
                        <TableCell>
                          <Badge variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {app.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="default" onClick={() => handleApplication(app.id, "approved")} disabled={processingId === app.id}>
                                <CheckCircle className="w-3 h-3 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleApplication(app.id, "rejected")} disabled={processingId === app.id}>
                                <XCircle className="w-3 h-3 mr-1" /> Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Year/Sem</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Published</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(courses ?? []).map((course: any) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-mono text-xs">{course.course_code}</TableCell>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell className="text-xs">{SCHOOL_LABELS[course.school_slug] || course.school_slug}</TableCell>
                      <TableCell className="text-xs">Y{course.year} S{course.semester}</TableCell>
                      <TableCell>{lessonCounts[course.id] || 0}</TableCell>
                      <TableCell>{enrollmentCounts[course.id] || 0}</TableCell>
                      <TableCell>
                        <Badge variant={course.is_published ? "default" : "secondary"}>
                          {course.is_published ? "Live" : "Draft"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(approvedApps).length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No approved students yet</TableCell></TableRow>
                  ) : (
                    approvedApps.map((app: any) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell className="text-xs">{SCHOOL_LABELS[app.school_slug] || app.school_slug}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</TableCell>
                        <TableCell><Badge variant="default">Active</Badge></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
