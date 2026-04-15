/**
 * HTTP client for the C# ASP.NET Core backend (african-digital-university API).
 *
 * The base URL is read from the VITE_CSHARP_API_URL environment variable.
 * When the variable is not set the client is effectively disabled.
 *
 * Authentication is JWT-based: after sign-in the token is stored in
 * localStorage under the key "adu_csharp_token" and attached to every
 * subsequent request via the Authorization header.
 */

import type {
  AuthResponse,
  CourseDto,
  EnrollmentDto,
  LessonDto,
  LessonProgressDto,
  ProfileDto,
  SessionResponse,
  StudentApplicationDto,
  UserRoleDto,
} from "./types";

const BASE_URL = (import.meta.env.VITE_CSHARP_API_URL as string | undefined) ?? "";
const TOKEN_KEY = "adu_csharp_token";

// ── Token helpers ────────────────────────────────────────────────────────────

export function getCsharpToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setCsharpToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearCsharpToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ── Core fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getCsharpToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body?.error ?? message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as unknown as T;

  return res.json() as Promise<T>;
}

// ── Health check ─────────────────────────────────────────────────────────────

/**
 * Returns true when the C# backend is reachable.
 * Uses the Swagger JSON endpoint as a lightweight probe.
 */
export async function isCsharpBackendAvailable(): Promise<boolean> {
  if (!BASE_URL) return false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    // Use GET on the health endpoint — HEAD is not supported by Swagger middleware
    const res = await fetch(`${BASE_URL}/health`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export const csharpAuth = {
  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    const data = await request<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    });
    setCsharpToken(data.accessToken);
    return data;
  },

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const data = await request<AuthResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setCsharpToken(data.accessToken);
    return data;
  },

  async signOut(): Promise<void> {
    try {
      await request<void>("/auth/signout", { method: "POST" });
    } finally {
      clearCsharpToken();
    }
  },

  async getSession(): Promise<SessionResponse> {
    return request<SessionResponse>("/auth/session");
  },
};

// ── Courses ───────────────────────────────────────────────────────────────────

export const csharpCourses = {
  list(): Promise<CourseDto[]> {
    return request<CourseDto[]>("/courses");
  },
  get(id: string): Promise<CourseDto> {
    return request<CourseDto>(`/courses/${id}`);
  },
};

// ── Enrollments ───────────────────────────────────────────────────────────────

export const csharpEnrollments = {
  list(userId?: string): Promise<EnrollmentDto[]> {
    const qs = userId ? `?user_id=${userId}` : "";
    return request<EnrollmentDto[]>(`/enrollments${qs}`);
  },
  enroll(userId: string, courseId: string): Promise<EnrollmentDto> {
    return request<EnrollmentDto>("/enrollments", {
      method: "POST",
      body: JSON.stringify({ userId, courseId }),
    });
  },
};

// ── Lessons ───────────────────────────────────────────────────────────────────

export const csharpLessons = {
  listByCourse(courseId: string): Promise<LessonDto[]> {
    return request<LessonDto[]>(`/lessons?course_id=${courseId}`);
  },
};

// ── Lesson progress ───────────────────────────────────────────────────────────

export const csharpLessonProgress = {
  list(userId: string): Promise<LessonProgressDto[]> {
    return request<LessonProgressDto[]>(`/lesson-progress?user_id=${userId}`);
  },
  markComplete(userId: string, lessonId: string): Promise<LessonProgressDto> {
    return request<LessonProgressDto>("/lesson-progress", {
      method: "POST",
      body: JSON.stringify({ userId, lessonId }),
    });
  },
};

// ── Profiles ──────────────────────────────────────────────────────────────────

export const csharpProfiles = {
  get(userId: string): Promise<ProfileDto> {
    return request<ProfileDto>(`/profiles/${userId}`);
  },
  update(userId: string, data: Partial<ProfileDto>): Promise<ProfileDto> {
    return request<ProfileDto>(`/profiles/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

// ── Student applications ──────────────────────────────────────────────────────

export const csharpApplications = {
  list(): Promise<StudentApplicationDto[]> {
    return request<StudentApplicationDto[]>("/student_applications");
  },
  create(data: {
    fullName: string;
    email: string;
    schoolSlug: string;
    motivation?: string;
  }): Promise<StudentApplicationDto> {
    return request<StudentApplicationDto>("/student_applications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updateStatus(id: string, status: "approved" | "rejected"): Promise<StudentApplicationDto> {
    return request<StudentApplicationDto>(`/student_applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

// ── User roles ────────────────────────────────────────────────────────────────

export const csharpUserRoles = {
  listForUser(userId: string): Promise<UserRoleDto[]> {
    return request<UserRoleDto[]>(`/user_roles?user_id=${userId}`);
  },
};
