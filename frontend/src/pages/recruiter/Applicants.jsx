import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Users, Search, Filter, ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { recruiterService } from "../../services/recruiterService";
import { ApplicantTable } from "../../components/recruiter/ApplicantTable";
import { ApplicationStats } from "../../components/application/ApplicationStats";
import { ApplicationSearch } from "../../components/application/ApplicationSearch";
import { ApplicationFilters } from "../../components/application/ApplicationFilters";
import { ApplicationDetails } from "../../components/application/ApplicationDetails";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";
import { Button } from "../../components/ui/button";

const ITEMS_PER_PAGE = 8;

export function Applicants() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialJobId = searchParams.get("jobId") || "all";
  const initialStatus = searchParams.get("status") || "all";

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: initialStatus,
    jobId: initialJobId,
    jobType: "all",
    sort: "newest",
  });

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchApplicantsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recruiterService.getApplicants(filters.jobId);
      if (res.success) {
        setApplications(res.applications || []);
        if (res.jobs) {
          setJobs(res.jobs);
        }
      } else {
        setError(res.message || "Failed to load applicant data.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsData();
  }, [filters.jobId]);

  // Calculated Stats
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

  // Filtered List
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const applicantName = (app.applicant?.fullname || "").toLowerCase();
        const applicantEmail = (app.applicant?.email || "").toLowerCase();
        const jobTitle = (app.job?.title || "").toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        const matchesSearch =
          !searchQuery ||
          applicantName.includes(searchLower) ||
          applicantEmail.includes(searchLower) ||
          jobTitle.includes(searchLower);

        const appStatus = (app.status || "pending").toLowerCase();
        const matchesStatus =
          filters.status === "all" ||
          (filters.status === "selected"
            ? appStatus === "selected" || appStatus === "accepted"
            : appStatus === filters.status);

        const matchesJob =
          filters.jobId === "all" ||
          app.job?._id === filters.jobId ||
          app.job === filters.jobId;

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

  const handleStatusChange = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApplication?._id === appId) {
      setSelectedApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.jobId !== "all" ||
    filters.jobType !== "all" ||
    filters.sort !== "newest" ||
    !!searchQuery;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Applicant Tracking System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            Candidate Applications ({applications.length})
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Review candidate resumes, evaluate profiles, and update hiring statuses.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate("/recruiter/jobs/create")}
          className="h-11 px-5 text-xs font-bold rounded-xl gap-2 shadow-md shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <EmptyState
          title="Error Loading Applicants"
          description={error}
          actionText="Retry"
          onAction={fetchApplicantsData}
        />
      ) : (
        <>
          {/* Pipeline Stats */}
          <ApplicationStats
            stats={stats}
            activeFilter={filters.status}
            onSelectFilter={handleSelectStatFilter}
            isEmployer={true}
          />

          {/* Search & Filters */}
          <div className="space-y-4">
            <ApplicationSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search candidate by name, email, or job title..."
            />

            <ApplicationFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              jobOptions={jobs}
              isEmployer={true}
            />
          </div>

          {/* Applicant Content */}
          {applications.length === 0 ? (
            <EmptyState
              title="No Candidates Applied Yet"
              description="Your posted jobs haven't received applications yet. Share your job listings to reach candidates."
              actionText="View Job Listings"
              onAction={() => navigate("/recruiter/jobs")}
            />
          ) : filteredApplications.length === 0 ? (
            <EmptyState
              title="No Matching Candidates"
              description="No applicant matches your current filter criteria."
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
                <div className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-border mt-6">
                  <span className="text-xs font-semibold text-text-secondary">
                    Showing page {currentPage} of {totalPages} ({filteredApplications.length} candidates)
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

      {/* Candidate Details Drawer */}
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

export default Applicants;
