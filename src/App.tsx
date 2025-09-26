import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/auth/AuthPage";
import TeacherLayout from "./components/layout/TeacherLayout";
import StudentLayout from "./components/layout/StudentLayout";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherBatches from "./pages/teacher/TeacherBatches";
import StudentDashboard from "./components/student/StudentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'teacher' | 'student' }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Route wrapper for authenticated users
const AuthenticatedRoutes = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (user?.role === 'teacher') {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/teacher" replace />} />
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="batches" element={<TeacherBatches />} />
          <Route path="students" element={<div className="p-6 text-center">Student Management - Coming Soon</div>} />
          <Route path="materials" element={<div className="p-6 text-center">Study Materials - Coming Soon</div>} />
          <Route path="attendance" element={<div className="p-6 text-center">Attendance - Coming Soon</div>} />
          <Route path="payments" element={<div className="p-6 text-center">Payment Status - Coming Soon</div>} />
          <Route path="notifications" element={<div className="p-6 text-center">Notifications - Coming Soon</div>} />
        </Route>
        <Route path="/student/*" element={<Navigate to="/teacher" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  if (user?.role === 'student') {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/student" replace />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="batches" element={<div className="p-6 text-center">Batch Access - Coming Soon</div>} />
          <Route path="materials" element={<div className="p-6 text-center">Study Materials - Coming Soon</div>} />
          <Route path="payments" element={<div className="p-6 text-center">Payment History - Coming Soon</div>} />
        </Route>
        <Route path="/teacher/*" element={<Navigate to="/student" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AuthenticatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
