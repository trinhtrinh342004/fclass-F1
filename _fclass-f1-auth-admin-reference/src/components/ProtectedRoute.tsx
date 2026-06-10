import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthProfile } from "../hooks/useAuthProfile";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAdmin?: boolean;
  requireApprovedStudent?: boolean;
};

function LoadingScreen() {
  return (
    <main className="min-h-screen grid place-items-center bg-slate-50 text-slate-700">
      <div className="rounded-lg border bg-white px-5 py-4 shadow-sm">Đang kiểm tra tài khoản...</div>
    </main>
  );
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  requireApprovedStudent = false,
}: ProtectedRouteProps) {
  const location = useLocation();
  const { session, profile, loading, isAdmin, isApprovedStudent } = useAuthProfile();

  if (loading) return <LoadingScreen />;

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!profile) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (profile.status === "rejected") {
    return <Navigate to="/rejected" replace />;
  }

  if (profile.status === "pending" && !isAdmin) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireApprovedStudent && !isApprovedStudent) {
    return <Navigate to={isAdmin ? "/admin" : "/pending-approval"} replace />;
  }

  return <>{children}</>;
}
