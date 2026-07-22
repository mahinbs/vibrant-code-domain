import { Navigate } from "react-router-dom";
import { pipelineAuth } from "@/services/pipelineAuth";

/** Gate for /dashboard — redirects to the dashboard login when not signed in. */
export default function DashboardProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!pipelineAuth.isAuthed()) {
    return <Navigate to="/dashboard/login" replace />;
  }
  return <>{children}</>;
}
