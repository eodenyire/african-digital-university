
-- Assignments
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  max_score INTEGER NOT NULL DEFAULT 100,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published assignments viewable by enrolled" ON public.assignments FOR SELECT USING (
  is_published = true AND EXISTS (
    SELECT 1 FROM public.enrollments e WHERE e.user_id = auth.uid() AND e.course_id = assignments.course_id
  )
);

-- Assignment submissions
CREATE TABLE public.assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  graded_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(assignment_id, user_id)
);
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own submissions" ON public.assignment_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit own work" ON public.assignment_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own submissions" ON public.assignment_submissions FOR UPDATE USING (auth.uid() = user_id AND graded_at IS NULL);

-- Quizzes
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER,
  pass_percentage INTEGER NOT NULL DEFAULT 60,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published quizzes viewable by enrolled" ON public.quizzes FOR SELECT USING (
  is_published = true AND EXISTS (
    SELECT 1 FROM public.enrollments e WHERE e.user_id = auth.uid() AND e.course_id = quizzes.course_id
  )
);

-- Quiz questions
CREATE TYPE public.question_type AS ENUM ('multiple_choice', 'true_false', 'short_answer');
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type public.question_type NOT NULL DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER NOT NULL DEFAULT 0
);
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz questions viewable by enrolled" ON public.quiz_questions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.quizzes q
    JOIN public.enrollments e ON e.course_id = q.course_id
    WHERE q.id = quiz_questions.quiz_id AND e.user_id = auth.uid() AND q.is_published = true
  )
);

-- Quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}',
  score INTEGER,
  passed BOOLEAN,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attempts" ON public.quiz_attempts FOR UPDATE USING (auth.uid() = user_id AND completed_at IS NULL);

CREATE INDEX idx_assignments_course ON public.assignments(course_id);
CREATE INDEX idx_quizzes_course ON public.quizzes(course_id);
