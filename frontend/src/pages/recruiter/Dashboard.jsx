import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Briefcase,
  Building2,
  Users,
  BarChart3,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { recruiterService } from "../../services/recruiterService";
import DashboardCards from "../../components/recruiter/DashboardCards";
import RecentApplications from "../../components/recruiter/RecentApplications";
import RecentJobs from "../../components/recruiter/RecentJobs";
import AnalyticsCharts from "../../components/recruiter/AnalyticsCharts";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";
import ApplicationDetails from "../../components/application/ApplicationDetails";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState({
    stats: {},
    recentJobs: [],
    recentApplications: [],
  });

  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recruiterService.getDashboardStats();
      if (res.success) {
        setStatsData({
          stats: res.stats || {},
          recentJobs: res.recentJobs || [],
          recentApplications: res.recentApplications || [],
        });
      } else {
        setError(res.message || "Failed to load dashboard statistics.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error loading recruiter dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = (appId, newStatus) => {
    setStatsData((prev) => ({
      ...prev,
      recentApplications: prev.recentApplications.map((app) =>
        app._id === appId ? { ...app, status: newStatus } : app
      ),
    }));
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        title="Dashboard Loading Error"
        description={error}
        actionText="Retry Loading"
        onAction={fetchDashboardData}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Employer Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            Welcome back, {user?.fullname || "Recruiter"}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl">
            Here is a real-time summary of your hiring pipeline, job postings, and candidate applications.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            onClick={() => navigate("/recruiter/jobs/create")}
            className="h-11 px-5 text-xs font-bold rounded-xl gap-2 shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            Post New Job
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/recruiter/company")}
            className="h-11 px-4 text-xs font-semibold rounded-xl gap-2"
          >
            <Building2 className="w-4 h-4 text-primary" />
            My Company
          </Button>

          <Button
            variant="ghost"
            onClick={fetchDashboardData}
            className="h-11 w-11 p-0 rounded-xl"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4 text-text-secondary" />
          </Button>
        </div>
      </div>

      {/* Quick Statistics Cards */}
      <DashboardCards
        stats={statsData.stats}
        onSelectFilter={(filterKey) => navigate(`/recruiter/applicants?status=${filterKey}`)}
      />

      {/* Analytics Charts & Pipeline Distribution */}
      <AnalyticsCharts
        stats={statsData.stats}
        recentJobs={statsData.recentJobs}
        recentApplications={statsData.recentApplications}
      />

      {/* Tables Row: Recent Applications & Recently Posted Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentApplications
          applications={statsData.recentApplications}
          onStatusChange={handleStatusChange}
          onViewDetails={(app) => setSelectedApplication(app)}
        />

        <RecentJobs jobs={statsData.recentJobs} />
      </div>

      {/* Application Drawer */}
      <ApplicationDetails
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        onStatusChange={handleStatusChange}
        isEmployer={true}
      />
    </div>
  );
}

export default Dashboard;
