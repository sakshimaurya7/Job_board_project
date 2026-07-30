import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Award, RefreshCw } from "lucide-react";
import { recruiterService } from "../../services/recruiterService";
import DashboardCards from "../../components/recruiter/DashboardCards";
import AnalyticsCharts from "../../components/recruiter/AnalyticsCharts";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";
import { Button } from "../../components/ui/button";

export function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState({
    stats: {},
    recentJobs: [],
    recentApplications: [],
  });

  const fetchAnalytics = async () => {
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
        setError(res.message || "Failed to load analytics data.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error loading analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <EmptyState
        title="Analytics Error"
        description={error}
        actionText="Retry Loading"
        onAction={fetchAnalytics}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Recruitment Analytics & Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            Hiring Performance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Track candidate pipeline conversions, job listing engagement, and recruitment metrics.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchAnalytics}
          className="h-10 px-4 text-xs font-semibold rounded-xl gap-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4 text-primary" />
          Refresh Analytics
        </Button>
      </div>

      {/* Cards Breakdown */}
      <DashboardCards stats={statsData.stats} />

      {/* Visual Charts & Funnel */}
      <AnalyticsCharts
        stats={statsData.stats}
        recentJobs={statsData.recentJobs}
        recentApplications={statsData.recentApplications}
      />
    </div>
  );
}

export default Analytics;
