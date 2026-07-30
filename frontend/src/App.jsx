import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./hooks/useAuth";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import ProfilePage from "./pages/ProfilePage";
import ManageApplications from "./pages/ManageApplications";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RecruiterRoute } from "./components/auth/RecruiterRoute";
import NotFound from "./pages/NotFound";

// Recruiter Portal Pages & Layout
import CompanySetup from "./pages/recruiter/CompanySetup";
import RecruiterLayout from "./components/recruiter/RecruiterLayout";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterCompany from "./pages/recruiter/Company";
import RecruiterEditCompany from "./pages/recruiter/EditCompany";
import RecruiterJobs from "./pages/recruiter/Jobs";
import RecruiterCreateJob from "./pages/recruiter/CreateJob";
import RecruiterEditJob from "./pages/recruiter/EditJob";
import RecruiterApplicants from "./pages/recruiter/Applicants";
import RecruiterAnalytics from "./pages/recruiter/Analytics";
import RecruiterSettings from "./pages/recruiter/Settings";

function AppContent() {
  const location = useLocation();

  // Check if current route is part of Recruiter Portal dashboard or company setup
  const isRecruiterPortalRoute =
    location.pathname.startsWith("/recruiter") || location.pathname === "/company/setup";

  return (
    <div className="flex flex-col min-h-screen bg-background text-text selection:bg-accent selection:text-text">
      <Toaster position="top-right" richColors />

      {/* Hide standard navbar for Recruiter Portal layout */}
      {!isRecruiterPortalRoute && <Navbar />}

      <div className={isRecruiterPortalRoute ? "flex-1" : "flex-1"}>
        <Routes>
          {/* Public Candidate & Static Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Job Seeker Protected Routes */}
          <Route
            path="/applications"
            element={
              <ProtectedRoute allowedRoles={["jobseeker"]}>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["jobseeker"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Legacy Manage Applications Route (Redirects or renders) */}
          <Route
            path="/manage-applications"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
                <ManageApplications />
              </ProtectedRoute>
            }
          />

          {/* Recruiter Company Setup (Mandatory onboarding step before dashboard access) */}
          <Route
            path="/company/setup"
            element={
              <RecruiterRoute requireCompany={false}>
                <CompanySetup />
              </RecruiterRoute>
            }
          />

          {/* Recruiter Portal Dashboard Routes (Nested inside RecruiterLayout) */}
          <Route
            path="/recruiter"
            element={
              <RecruiterRoute requireCompany={true}>
                <RecruiterLayout />
              </RecruiterRoute>
            }
          >
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="company" element={<RecruiterCompany />} />
            <Route path="company/edit" element={<RecruiterEditCompany />} />
            <Route path="jobs" element={<RecruiterJobs />} />
            <Route path="jobs/create" element={<RecruiterCreateJob />} />
            <Route path="jobs/:id/edit" element={<RecruiterEditJob />} />
            <Route path="applicants" element={<RecruiterApplicants />} />
            <Route path="analytics" element={<RecruiterAnalytics />} />
            <Route path="settings" element={<RecruiterSettings />} />
          </Route>

          {/* 404 Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Hide standard footer for Recruiter Portal layout */}
      {!isRecruiterPortalRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
