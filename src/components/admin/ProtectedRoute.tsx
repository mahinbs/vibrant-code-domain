import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [status, setStatus] = useState<"loading" | "authed" | "anon">("loading");

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setStatus(data.session ? "authed" : "anon");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setStatus(session ? "authed" : "anon");
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
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
