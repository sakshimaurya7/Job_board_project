import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * ProtectedRoute Component
 * Restricts access to authenticated users and optionally filters by role.
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Normalize role string comparison
  const userRole = (user.role || "").toLowerCase().replace(/[\s_]/g, "");

  if (allowedRoles && allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase().replace(/[\s_]/g, ""));
    const isAuthorized = normalizedAllowed.some(
      (role) =>
        userRole === role ||
        (role === "jobseeker" && (userRole === "jobseeker" || userRole === "jobseeker")) ||
        (role === "recruiter" && (userRole === "recruiter" || userRole === "employer"))
    );

    if (!isAuthorized) {
      // Redirect job seekers to /applications and recruiters to /manage-applications
      if (userRole === "recruiter" || userRole === "employer") {
        return <Navigate to="/manage-applications" replace />;
      } else {
        return <Navigate to="/applications" replace />;
      }
    }
  }

  return children;
}

export default ProtectedRoute;
