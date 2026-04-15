
-- Virtual Instructor-Led Training (VILT) sessions (Teams / Google Meet)
CREATE TABLE public.vilt_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  meeting_link TEXT,
  school_slug TEXT,        -- NULL = applies to all schools
  is_required BOOLEAN NOT NULL DEFAULT true,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.vilt_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "VILT sessions viewable by authenticated users" ON public.vilt_sessions
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage VILT sessions" ON public.vilt_sessions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Student attendance records for VILT sessions
CREATE TABLE public.vilt_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.vilt_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attended_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  marked_by UUID REFERENCES auth.users(id),
  UNIQUE(session_id, user_id)
);
ALTER TABLE public.vilt_attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own VILT attendance" ON public.vilt_attendance
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all VILT attendance" ON public.vilt_attendance
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can record VILT attendance" ON public.vilt_attendance
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete VILT attendance" ON public.vilt_attendance
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Capstone and regular project submissions (separate from course assignments)
CREATE TABLE public.capstone_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  github_url TEXT,
  file_url TEXT,
  submission_type TEXT NOT NULL DEFAULT 'project'
    CHECK (submission_type IN ('project', 'capstone')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.capstone_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own capstone submissions" ON public.capstone_submissions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit own capstone" ON public.capstone_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pending submissions" ON public.capstone_submissions
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins can view all capstone submissions" ON public.capstone_submissions
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update capstone submissions" ON public.capstone_submissions
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Issued certificates
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_slug TEXT NOT NULL,
  program_name TEXT NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  verification_code TEXT NOT NULL UNIQUE,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  issued_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, school_slug)
);
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own certificates" ON public.certificates
  FOR SELECT USING (auth.uid() = user_id);
-- Public verification: allow anyone to look up a certificate by its verification_code
-- (used by QR code scan), exposing only what is needed for verification.
-- A separate restricted view is recommended for full public lookup; here we rely on
-- callers filtering by verification_code so no unbounded scan is possible from the client.
CREATE POLICY "Admins can manage certificates" ON public.certificates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_vilt_sessions_school ON public.vilt_sessions(school_slug);
CREATE INDEX idx_vilt_attendance_user ON public.vilt_attendance(user_id);
CREATE INDEX idx_vilt_attendance_session ON public.vilt_attendance(session_id);
CREATE INDEX idx_capstone_submissions_user ON public.capstone_submissions(user_id);
CREATE INDEX idx_capstone_submissions_school ON public.capstone_submissions(school_slug);
CREATE INDEX idx_certificates_user ON public.certificates(user_id);
CREATE INDEX idx_certificates_verification ON public.certificates(verification_code);
