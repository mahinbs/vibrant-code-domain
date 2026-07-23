import { Navigate, useLocation } from "react-router-dom";
import { pipelineAuth } from "@/services/pipelineAuth";

/** Gate for /dashboard — redirects to login, preserving the target (e.g. a shared lead link). */
export default function DashboardProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!pipelineAuth.isAuthed()) {
    return <Navigate to="/dashboard/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
