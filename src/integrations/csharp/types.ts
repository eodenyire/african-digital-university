// Types mirroring the C# backend DTOs

export interface UserDto {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserDto;
}

export interface SessionResponse {
  user: UserDto | null;
}

export interface CourseDto {
  id: string;
  schoolSlug: string;
  courseCode: string;
  title: string;
  description: string | null;
  semester: number;
  year: number;
  credits: number;
  orderIndex: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileDto {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EnrollmentDto {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt: string | null;
  course: CourseDto | null;
}

export interface LessonDto {
  id: string;
  courseId: string;
  title: string;
  content: string | null;
  lessonType: string;
  orderIndex: number;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgressDto {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: string | null;
  isCompleted: boolean;
}

export interface StudentApplicationDto {
  id: string;
  userId: string | null;
  fullName: string;
  email: string;
  schoolSlug: string;
  motivation: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRoleDto {
  id: string;
  userId: string;
  role: string;
  createdAt: string;
}

export interface ApiError {
  error: string;
}
