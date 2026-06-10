import { Navigate, Route, Routes } from "react-router-dom";
import AuthErrorBoundary from "./components/AuthErrorBoundary";
import AuthNavbarExample from "./components/AuthNavbarExample";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuthProfile";
import AdminApprovalPage from "./pages/AdminApprovalPage";
import AdminClassesPage from "./pages/AdminClassesPage";
import AdminLayoutExample from "./pages/AdminLayoutExample";
import AdminStudentsPage from "./pages/AdminStudentsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
import RegisterPage from "./pages/RegisterPage";
import RejectedPage from "./pages/RejectedPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import StudentHomeGuardExample from "./pages/StudentHomeGuardExample";

export default function RouterExample() {
  return (
    <AuthErrorBoundary>
      <AuthProvider>
        <AuthNavbarExample />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/pending-approval" element={<PendingApprovalPage />} />
          <Route path="/rejected" element={<RejectedPage />} />

          <Route path="/" element={<StudentHomeGuardExample />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayoutExample />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/approvals" replace />} />
            <Route path="approvals" element={<AdminApprovalPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="classes" element={<AdminClassesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AuthErrorBoundary>
  );
}
