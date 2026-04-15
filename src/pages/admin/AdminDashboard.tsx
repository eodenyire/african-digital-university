import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Users, BookOpen, GraduationCap, LogOut, CheckCircle, XCircle,
  Clock, Shield, BarChart3, Award, Video, FolderOpen, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import aduLogo from "@/assets/adu-logo.png";
import { useState } from "react";
import { BackendStatus } from "@/components/BackendStatus";

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

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [newVilt, setNewVilt] = useState({ title: "", scheduled_at: "", meeting_link: "", description: "" });
  const [addingVilt, setAddingVilt] = useState(false);

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

  // VILT sessions
  const { data: viltSessions } = useQuery({
    queryKey: ["admin-vilt-sessions"],
    queryFn: async () => {
      const { data } = await supabase
        .from("vilt_sessions")
        .select("*")
        .order("scheduled_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  // VILT attendance
  const { data: viltAttendance } = useQuery({
    queryKey: ["admin-vilt-attendance"],
    queryFn: async () => {
      const { data } = await supabase.from("vilt_attendance").select("session_id, user_id");
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  // Capstone submissions
  const { data: capstoneSubs } = useQuery({
    queryKey: ["admin-capstone-subs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("capstone_submissions")
        .select("*, profiles!inner(full_name)")
        .order("submitted_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!isAdmin,
  });

  // Issued certificates
  const { data: issuedCerts } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      const { data } = await supabase
        .from("certificates")
        .select("*, profiles!inner(full_name)")
        .order("issued_at", { ascending: false });
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

  const handleCreateVilt = async () => {
    if (!newVilt.title || !newVilt.scheduled_at) return;
    setAddingVilt(true);
    try {
      await supabase.from("vilt_sessions").insert({
        title: newVilt.title,
        scheduled_at: newVilt.scheduled_at,
        meeting_link: newVilt.meeting_link || null,
        description: newVilt.description || null,
        is_required: true,
      });
      setNewVilt({ title: "", scheduled_at: "", meeting_link: "", description: "" });
      queryClient.invalidateQueries({ queryKey: ["admin-vilt-sessions"] });
    } finally {
      setAddingVilt(false);
    }
  };

  const handleMarkAttendance = async (sessionId: string, userId: string) => {
    await supabase.from("vilt_attendance").insert({
      session_id: sessionId,
      user_id: userId,
      marked_by: user!.id,
    });
    queryClient.invalidateQueries({ queryKey: ["admin-vilt-attendance"] });
  };

  const handleCapstoneReview = async (subId: string, status: "approved" | "rejected") => {
    setProcessingId(subId);
    try {
      await supabase
        .from("capstone_submissions")
        .update({ status, reviewed_by: user!.id, reviewed_at: new Date().toISOString() })
        .eq("id", subId);
      queryClient.invalidateQueries({ queryKey: ["admin-capstone-subs"] });
    } finally {
      setProcessingId(null);
    }
  };

  const generateCertNumber = () => {
    const year = new Date().getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `ADU-${year}-${rand}`;
  };

  const generateVerificationCode = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });

  const handleIssueCertificate = async (appUserId: string, schoolSlug: string) => {
    setProcessingId(`cert-${appUserId}`);
    try {
      await supabase.from("certificates").insert({
        user_id: appUserId,
        school_slug: schoolSlug,
        program_name: SCHOOL_PROGRAM_LABELS[schoolSlug] || `${SCHOOL_LABELS[schoolSlug] || schoolSlug} Program`,
        certificate_number: generateCertNumber(),
        verification_code: generateVerificationCode(),
        issued_by: user!.id,
      });
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
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

  const attendanceCounts = (viltAttendance ?? []).reduce((acc: Record<string, number>, a: any) => {
    acc[a.session_id] = (acc[a.session_id] || 0) + 1;
    return acc;
  }, {});

  // Build a set of user_ids that already have a certificate
  const certifiedUserIds = new Set((issuedCerts ?? []).map((c: any) => c.user_id));

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-foreground border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={aduLogo} alt="ADU" className="w-8 h-8 brightness-0 invert" />
            <span className="font-bold text-primary-foreground">ADU Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <BackendStatus />
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
            { icon: Award, label: "Certificates Issued", value: issuedCerts?.length ?? 0, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 mb-6">
            <TabsTrigger value="applications">Applications ({pendingApps.length} pending)</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="vilt">
              <Video className="w-3 h-3 mr-1" />VILT Sessions
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FolderOpen className="w-3 h-3 mr-1" />Projects
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <Award className="w-3 h-3 mr-1" />Certificates
            </TabsTrigger>
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

          {/* VILT Sessions Tab */}
          <TabsContent value="vilt">
            <div className="space-y-6">
              {/* Create new VILT session */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Schedule New VILT Session
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <Input
                    placeholder="Session title"
                    value={newVilt.title}
                    onChange={(e) => setNewVilt((v) => ({ ...v, title: e.target.value }))}
                  />
                  <Input
                    type="datetime-local"
                    value={newVilt.scheduled_at}
                    onChange={(e) => setNewVilt((v) => ({ ...v, scheduled_at: e.target.value }))}
                  />
                  <Input
                    placeholder="Meeting link (Teams / Google Meet)"
                    value={newVilt.meeting_link}
                    onChange={(e) => setNewVilt((v) => ({ ...v, meeting_link: e.target.value }))}
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={newVilt.description}
                    onChange={(e) => setNewVilt((v) => ({ ...v, description: e.target.value }))}
                  />
                </div>
                <Button
                  onClick={handleCreateVilt}
                  disabled={addingVilt || !newVilt.title || !newVilt.scheduled_at}
                  className="bg-primary hover:bg-primary/90"
                >
                  {addingVilt ? "Scheduling…" : "Schedule Session"}
                </Button>
              </div>

              {/* Existing sessions */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Meeting Link</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Mark Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(viltSessions ?? []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No VILT sessions yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      (viltSessions ?? []).map((session: any) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.title}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(session.scheduled_at).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {session.meeting_link ? (
                              <a
                                href={session.meeting_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-xs underline"
                              >
                                Join
                              </a>
                            ) : (
                              <span className="text-muted-foreground text-xs">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={session.is_required ? "default" : "secondary"}>
                              {session.is_required ? "Required" : "Optional"}
                            </Badge>
                          </TableCell>
                          <TableCell>{attendanceCounts[session.id] || 0}</TableCell>
                          <TableCell>
                            <select
                              className="text-xs border border-border rounded px-2 py-1 bg-background text-foreground"
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleMarkAttendance(session.id, e.target.value);
                                  e.target.value = "";
                                }
                              }}
                            >
                              <option value="">Mark student…</option>
                              {approvedApps.map((app: any) => (
                                <option key={app.user_id} value={app.user_id}>
                                  {app.full_name}
                                </option>
                              ))}
                            </select>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Projects & Capstone Tab */}
          <TabsContent value="projects">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(capstoneSubs ?? []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No project submissions yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    (capstoneSubs ?? []).map((sub: any) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.profiles?.full_name ?? "—"}</TableCell>
                        <TableCell>
                          <div>{sub.title}</div>
                          {sub.github_url && (
                            <a
                              href={sub.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-xs underline"
                            >
                              GitHub
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={sub.submission_type === "capstone" ? "default" : "secondary"}>
                            {sub.submission_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {SCHOOL_LABELS[sub.school_slug] || sub.school_slug}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(sub.submitted_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.status === "approved"
                                ? "default"
                                : sub.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {sub.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleCapstoneReview(sub.id, "approved")}
                                disabled={processingId === sub.id}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleCapstoneReview(sub.id, "rejected")}
                                disabled={processingId === sub.id}
                              >
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

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-secondary" /> Issue Certificate to Approved Student
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Verify the student has completed all online modules, attended required VILT sessions,
                  and has an approved capstone and project before issuing their certificate.
                </p>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>School / Program</TableHead>
                        <TableHead>Certificate Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedApps.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No approved students yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        approvedApps.map((app: any) => {
                          const hasCert = certifiedUserIds.has(app.user_id);
                          return (
                            <TableRow key={app.id}>
                              <TableCell className="font-medium">{app.full_name}</TableCell>
                              <TableCell className="text-xs">
                                {SCHOOL_LABELS[app.school_slug] || app.school_slug}
                              </TableCell>
                              <TableCell>
                                {hasCert ? (
                                  <Badge variant="default">
                                    <GraduationCap className="w-3 h-3 mr-1" /> Issued
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">Not issued</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {!hasCert && (
                                  <Button
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90"
                                    disabled={processingId === `cert-${app.user_id}`}
                                    onClick={() => handleIssueCertificate(app.user_id, app.school_slug)}
                                  >
                                    <Award className="w-3 h-3 mr-1" />
                                    Issue Certificate
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {(issuedCerts ?? []).length > 0 && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground text-sm">Issued Certificates</h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Certificate No.</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Issued</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(issuedCerts ?? []).map((cert: any) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.profiles?.full_name ?? "—"}</TableCell>
                          <TableCell className="font-mono text-xs">{cert.certificate_number}</TableCell>
                          <TableCell className="text-xs">{cert.program_name}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(cert.issued_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
