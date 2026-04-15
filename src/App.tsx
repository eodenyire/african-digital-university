import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackendProvider } from "@/lib/backendProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import SchoolPage from "./pages/SchoolPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ApplyPage from "./pages/ApplyPage.tsx";
import Dashboard from "./pages/lms/Dashboard.tsx";
import CoursePage from "./pages/lms/CoursePage.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BackendProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/school/:slug" element={<SchoolPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
              <Route path="/lms/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/lms/course/:courseId" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BackendProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
