import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * RecruiterRoute Component
 * Restricts access strictly to recruiters and optionally enforces company setup completion.
 */
export function RecruiterRoute({ children, requireCompany = true }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Must be authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = (user.role || "").toLowerCase().replace(/[\s_]/g, "");

  // Must be recruiter or admin
  if (userRole !== "recruiter" && userRole !== "admin" && userRole !== "employer") {
    return <Navigate to="/applications" replace />;
  }

  // If requireCompany is true, check if recruiter has completed company setup
  const hasCompany = Boolean(user.profile?.company);
  
  if (requireCompany && !hasCompany && location.pathname !== "/company/setup") {
    return <Navigate to="/company/setup" replace />;
  }

  return children;
}

export default RecruiterRoute;
