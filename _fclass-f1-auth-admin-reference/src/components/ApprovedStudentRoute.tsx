import type { ReactNode } from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function ApprovedStudentRoute({ children }: { children: ReactNode }) {
  return <ProtectedRoute requireApprovedStudent>{children}</ProtectedRoute>;
}
