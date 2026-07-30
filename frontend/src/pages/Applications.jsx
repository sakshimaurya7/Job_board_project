import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { applicationService } from "../services/applicationService";
import { ApplicationStats } from "../components/application/ApplicationStats";
import { ApplicationSearch } from "../components/application/ApplicationSearch";
import { ApplicationFilters } from "../components/application/ApplicationFilters";
import { MyApplicationCard } from "../components/application/MyApplicationCard";
import { ApplicationDetails } from "../components/application/ApplicationDetails";
import { EmptyState } from "../components/application/EmptyState";
import { ErrorState } from "../components/application/ErrorState";
import { LoadingSkeleton } from "../components/application/LoadingSkeleton";
import { Briefcase, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

const ITEMS_PER_PAGE = 6;

export function Applications() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    company: "all",
    jobType: "all",
    sort: "newest",
  });

  // Selected application for detail drawer
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-redirect recruiter if they hit /applications
  useEffect(() => {
    if (user && (user.role === "recruiter" || user.role === "employer")) {
      navigate("/manage-applications", { replace: true });
    }
  }, [user, navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationService.getMyApplications();
      if (data.success) {
        setApplications(data.applications || []);
      } else {
        setError(data.message || "Failed to load applications.");
      }
    } catch (err) {
      setError(err.message || "Network error loading applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Compute statistic counts
  const stats = useMemo(() => {
    const total = applications.length;
    let pending = 0;
    let reviewed = 0;
    let interview = 0;
    let selected = 0;
    let rejected = 0;

    applications.forEach((app) => {
      const st = (app.status || "pending").toLowerCase();
      if (st === "pending") pending++;
      else if (st === "reviewed") reviewed++;
      else if (st === "interview") interview++;
      else if (st === "accepted" || st === "selected") selected++;
      else if (st === "rejected") rejected++;
    });

    return { total, pending, reviewed, interview, selected, rejected };
  }, [applications]);

  // Unique list of companies for filter dropdown
  const companyOptions = useMemo(() => {
    const list = new Set();
    applications.forEach((app) => {
      const cName = app.job?.company?.name || app.job?.companyName;
      if (cName) list.add(cName);
    });
    return Array.from(list);
  }, [applications]);

  // Filtered & Searched applications list
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const jobTitle = (app.job?.title || "").toLowerCase();
        const companyName = (app.job?.company?.name || app.job?.companyName || "").toLowerCase();
        const location = (app.job?.location || "").toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        // Search match
        const matchesSearch =
          !searchQuery ||
          jobTitle.includes(searchLower) ||
          companyName.includes(searchLower) ||
          location.includes(searchLower);

        // Status match
        const appStatus = (app.status || "pending").toLowerCase();
        const matchesStatus =
          filters.status === "all" ||
          (filters.status === "selected"
            ? appStatus === "selected" || appStatus === "accepted"
            : appStatus === filters.status);

        // Company match
        const matchesCompany =
          filters.company === "all" || companyName === filters.company.toLowerCase();

        // Job Type match
        const appJobType = (app.job?.jobType || "").toLowerCase();
        const matchesJobType =
          filters.jobType === "all" || appJobType.includes(filters.jobType.toLowerCase());

        return matchesSearch && matchesStatus && matchesCompany && matchesJobType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return filters.sort === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [applications, searchQuery, filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredApplications, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectStatFilter = (statusId) => {
    setFilters((prev) => ({ ...prev, status: statusId }));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({
      status: "all",
      company: "all",
      jobType: "all",
      sort: "newest",
    });
  };

  const handleWithdrawSuccess = async (appId) => {
    // Call backend to withdraw the application
    await applicationService.withdrawApplication(appId);
    // Remove from local state on success
    setApplications((prev) => prev.filter((a) => a._id !== appId));
    if (selectedApplication?._id === appId) {
      setSelectedApplication(null);
    }
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.company !== "all" ||
    filters.jobType !== "all" ||
    filters.sort !== "newest" ||
    !!searchQuery;

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero / Header Section */}
      <section className="bg-surface border-b border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Job Seeker Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text tracking-tight">
              My Applications
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Track, filter, and manage every job you've applied for in real-time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/jobs")}
              className="h-11 px-5 text-sm font-semibold rounded-xl gap-2"
            >
              <Briefcase className="w-4 h-4 text-primary" />
              Find More Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {loading ? (
          <LoadingSkeleton isEmployer={false} />
        ) : error ? (
          <ErrorState error={error} onRetry={fetchApplications} />
        ) : (
          <>
            {/* Statistics Cards */}
            <ApplicationStats
              stats={stats}
              activeFilter={filters.status}
              onSelectFilter={handleSelectStatFilter}
              isEmployer={false}
            />

            {/* Search & Filter Bar */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <ApplicationSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by job title, company name, or location..."
                />
              </div>

              <ApplicationFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                companyOptions={companyOptions}
                isEmployer={false}
              />
            </div>

            {/* Applications Grid / States */}
            {applications.length === 0 ? (
              <EmptyState isEmployer={false} />
            ) : filteredApplications.length === 0 ? (
              <EmptyState
                isEmployer={false}
                isFiltered={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedApplications.map((app) => (
                    <MyApplicationCard
                      key={app._id}
                      application={app}
                      onWithdraw={handleWithdrawSuccess}
                      onViewDetails={(selected) => setSelectedApplication(selected)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-border mt-8">
                    <span className="text-xs font-semibold text-text-secondary">
                      Showing page {currentPage} of {totalPages} ({filteredApplications.length} total applications)
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="h-9 px-3 text-xs font-semibold rounded-xl gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="h-9 px-3 text-xs font-semibold rounded-xl gap-1"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Application Details Drawer */}
      <ApplicationDetails
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        isEmployer={false}
      />
    </div>
  );
}

export default Applications;
