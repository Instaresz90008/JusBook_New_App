import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/utils/logger";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

/**
 * A wrapper component that handles route protection based on authentication status
 */
const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Log route access attempts
  useEffect(() => {
    logger.info(`Route access: ${location.pathname}`, {
      module: 'routes',
      data: { 
        authenticated: isAuthenticated, 
        requiresAuth: requireAuth, 
        loading: isLoading 
      }
    });
  }, [location.pathname, isAuthenticated, requireAuth, isLoading]);

  // Show nothing while authentication state is loading
  if (isLoading) {
    return null;
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but the route is for non-authenticated users only (like login page)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise render the children
  return <>{children}</>;
};

export default ProtectedRoute;
