-- Assign admin role to admin@adu.africa
INSERT INTO public.user_roles ("UserId", role, "CreatedAt")
VALUES ('903fdc79-06f5-4a0e-9632-297993a0f62b', 'admin', now())
ON CONFLICT ("UserId", role) DO NOTHING;

-- Assign student role to student@adu.africa
INSERT INTO public.user_roles ("UserId", role, "CreatedAt")
VALUES ('e009d757-018c-49fd-8c69-352f1b50b043', 'student', now())
ON CONFLICT ("UserId", role) DO NOTHING;

-- Check student_applications columns
SELECT column_name FROM information_schema.columns
WHERE table_name = 'student_applications' ORDER BY ordinal_position;
