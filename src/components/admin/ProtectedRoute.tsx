import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { adminAuth } from "@/services/adminAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Fast path: backup-flag login is synchronous. Otherwise check Supabase session.
  const [status, setStatus] = useState<"loading" | "authed" | "anon">(
    adminAuth.hasFlag() ? "authed" : "loading",
  );

  useEffect(() => {
    if (adminAuth.hasFlag()) {
      setStatus("authed");
      return;
    }
    let mounted = true;
    adminAuth.hasSession().then((ok) => {
      if (mounted) setStatus(ok ? "authed" : "anon");
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-cyan-400/80">
        Checking access…
      </div>
    );
  }
  if (status === "anon") {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
