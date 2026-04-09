import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, CheckCircle, Circle, Clock, FileText, Play, Code } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import aduLogo from "@/assets/adu-logo.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LessonTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "video": return <Play className="w-4 h-4" />;
    case "code": return <Code className="w-4 h-4" />;
    case "text": return <FileText className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId!)
        .single();
      return data;
    },
  });

  const { data: lessons } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId!)
        .eq("is_published", true)
        .order("order_index");
      return data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id, courseId],
    queryFn: async () => {
      const lessonIds = lessons?.map((l: any) => l.id) ?? [];
      if (lessonIds.length === 0) return [];
      const { data } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", user!.id)
        .in("lesson_id", lessonIds);
      return data;
    },
    enabled: !!user && !!lessons && lessons.length > 0,
  });

  const completedIds = new Set(progress?.filter((p: any) => p.completed).map((p: any) => p.lesson_id) ?? []);
  const progressPct = lessons && lessons.length > 0 ? Math.round((completedIds.size / lessons.length) * 100) : 0;

  const markComplete = useMutation({
    mutationFn: async (lessonId: string) => {
      await supabase.from("lesson_progress").upsert({
        user_id: user!.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", user?.id, courseId] });
    },
  });

  const currentLesson = lessons?.find((l: any) => l.id === activeLesson);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-foreground border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/lms/dashboard" className="flex items-center gap-2">
            <img src={aduLogo} alt="ADU" className="w-7 h-7" />
          </Link>
          <ArrowLeft className="w-4 h-4 text-primary-foreground/40" />
          <span className="text-sm text-primary-foreground font-medium truncate">
            {course?.title ?? "Course"}
          </span>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="lg:w-80 bg-card border-r border-border overflow-y-auto lg:sticky lg:top-14 lg:h-[calc(100vh-56px)]">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-foreground text-sm">{course?.course_code}</h2>
            <p className="text-xs text-muted-foreground mt-1">{course?.title}</p>
            <div className="mt-3">
              <Progress value={progressPct} className="h-2" />
              <span className="text-xs text-muted-foreground mt-1 block">{progressPct}% complete</span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {lessons?.map((lesson: any, i: number) => {
              const isComplete = completedIds.has(lesson.id);
              const isActive = activeLesson === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                    isActive ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Lesson {i + 1}</div>
                    <div className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                      {lesson.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <LessonTypeIcon type={lesson.lesson_type} />
                      <span className="capitalize">{lesson.lesson_type}</span>
                      {lesson.duration_minutes && (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration_minutes} min</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            {(!lessons || lessons.length === 0) && (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No lessons available yet
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-10">
          {currentLesson ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <LessonTypeIcon type={currentLesson.lesson_type} />
                  <span className="text-xs text-muted-foreground capitalize">{currentLesson.lesson_type} lesson</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground">{currentLesson.title}</h1>
              </div>

              {currentLesson.video_url && (
                <div className="aspect-video bg-foreground rounded-xl mb-6 flex items-center justify-center">
                  <iframe
                    src={currentLesson.video_url}
                    className="w-full h-full rounded-xl"
                    allowFullScreen
                    title={currentLesson.title}
                  />
                </div>
              )}

              {currentLesson.content && (
                <div className="prose prose-sm max-w-none text-foreground/80 bg-card rounded-xl p-6 border border-border">
                  <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                </div>
              )}

              <div className="mt-8 flex items-center gap-4">
                {!completedIds.has(currentLesson.id) ? (
                  <Button
                    onClick={() => markComplete.mutate(currentLesson.id)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <CheckCircle className="w-5 h-5" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                {course?.title ?? "Course"}
              </h2>
              <p className="text-muted-foreground max-w-md">
                {course?.description ?? "Select a lesson from the sidebar to start learning."}
              </p>
              {lessons && lessons.length > 0 && (
                <Button
                  className="mt-6 bg-primary hover:bg-primary/90"
                  onClick={() => setActiveLesson(lessons[0].id)}
                >
                  Start First Lesson
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
