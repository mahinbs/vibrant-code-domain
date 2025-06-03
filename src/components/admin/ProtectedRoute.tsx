
import { adminAuth } from '@/services/adminAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!adminAuth.isAuthenticated()) {
    return <Navigate to="/secure-management-portal-x7k9/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
