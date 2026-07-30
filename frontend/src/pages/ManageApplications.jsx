import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { applicationService } from "../services/applicationService";
import { ApplicationStats } from "../components/application/ApplicationStats";
import { ApplicationSearch } from "../components/application/ApplicationSearch";
import { ApplicationFilters } from "../components/application/ApplicationFilters";
import { ApplicantTable } from "../components/application/ApplicantTable";
import { ApplicationDetails } from "../components/application/ApplicationDetails";
import { EmptyState } from "../components/application/EmptyState";
import { ErrorState } from "../components/application/ErrorState";
import { LoadingSkeleton } from "../components/application/LoadingSkeleton";
import { Users, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

const ITEMS_PER_PAGE = 8;

export function ManageApplications() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    jobId: "all",
    jobType: "all",
    sort: "newest",
  });

  // Selected applicant for drawer
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-redirect jobseekers if they visit /manage-applications
  useEffect(() => {
    if (user && user.role === "jobseeker") {
      navigate("/applications", { replace: true });
    }
  }, [user, navigate]);

  const fetchApplicantsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationService.getApplicants(filters.jobId);
      if (data.success) {
        setApplications(data.applications || []);
        if (data.jobs) {
          setJobs(data.jobs);
        }
      } else {
        setError(data.message || "Failed to load applicant data.");
      }
    } catch (err) {
      setError(err.message || "Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsData();
  }, [filters.jobId]);

  // Statistic counter calculation
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

  // Filtered & Searched applicants list
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const applicantName = (app.applicant?.fullname || "").toLowerCase();
        const applicantEmail = (app.applicant?.email || "").toLowerCase();
        const jobTitle = (app.job?.title || "").toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        // Search match
        const matchesSearch =
          !searchQuery ||
          applicantName.includes(searchLower) ||
          applicantEmail.includes(searchLower) ||
          jobTitle.includes(searchLower);

        // Status match
        const appStatus = (app.status || "pending").toLowerCase();
        const matchesStatus =
          filters.status === "all" ||
          (filters.status === "selected"
            ? appStatus === "selected" || appStatus === "accepted"
            : appStatus === filters.status);

        // Job match (if not already handled by API)
        const matchesJob =
          filters.jobId === "all" ||
          app.job?._id === filters.jobId ||
          app.job === filters.jobId;

        // Job Type match
        const appJobType = (app.job?.jobType || "").toLowerCase();
        const matchesJobType =
          filters.jobType === "all" || appJobType.includes(filters.jobType.toLowerCase());

        return matchesSearch && matchesStatus && matchesJob && matchesJobType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return filters.sort === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [applications, searchQuery, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

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
      jobId: "all",
      jobType: "all",
      sort: "newest",
    });
  };

  const handleStatusChange = async (appId, newStatus) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApplication?._id === appId) {
      setSelectedApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    // API call is handled by StatusDropdown internally via onStatusChange prop
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.jobId !== "all" ||
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
              <Users className="w-3.5 h-3.5" />
              <span>Recruiter Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text tracking-tight">
              Applicants Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Review candidates, track hiring pipelines, and update applicant statuses in real-time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="primary"
              onClick={() => navigate("/jobs")}
              className="h-11 px-5 text-sm font-semibold rounded-xl gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Manage Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {loading ? (
          <LoadingSkeleton isEmployer={true} />
        ) : error ? (
          <ErrorState error={error} onRetry={fetchApplicantsData} />
        ) : (
          <>
            {/* Statistics */}
            <ApplicationStats
              stats={stats}
              activeFilter={filters.status}
              onSelectFilter={handleSelectStatFilter}
              isEmployer={true}
            />

            {/* Search and Filters */}
            <div className="space-y-4 mb-8">
              <ApplicationSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search candidates by name, email, or job title..."
              />

              <ApplicationFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                jobOptions={jobs}
                isEmployer={true}
              />
            </div>

            {/* Applicants Content */}
            {applications.length === 0 ? (
              <EmptyState isEmployer={true} />
            ) : filteredApplications.length === 0 ? (
              <EmptyState
                isEmployer={true}
                isFiltered={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <>
                <ApplicantTable
                  applications={paginatedApplications}
                  onStatusChange={handleStatusChange}
                  onViewDetails={(app) => setSelectedApplication(app)}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-border mt-8">
                    <span className="text-xs font-semibold text-text-secondary">
                      Showing page {currentPage} of {totalPages} ({filteredApplications.length} total applicants)
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
        onStatusChange={handleStatusChange}
        isEmployer={true}
      />
    </div>
  );
}

export default ManageApplications;
