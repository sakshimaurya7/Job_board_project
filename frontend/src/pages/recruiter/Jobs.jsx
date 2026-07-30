import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusCircle, Search, Briefcase, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { recruiterService } from "../../services/recruiterService";
import JobTable from "../../components/recruiter/JobTable";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";

const ITEMS_PER_PAGE = 8;

export function Jobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recruiterService.getJobs();
      if (res.success) {
        setJobs(res.jobs || []);
      } else {
        setError(res.message || "Failed to load job listings.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const location = (job.location || "").toLowerCase();
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        !searchQuery || title.includes(searchLower) || location.includes(searchLower);

      const matchesType =
        jobTypeFilter === "all" || (job.jobType || "").toLowerCase() === jobTypeFilter.toLowerCase();

      const matchesExperience =
        experienceFilter === "all" ||
        (job.experienceLevel || "").toLowerCase() === experienceFilter.toLowerCase();

      return matchesSearch && matchesType && matchesExperience;
    });
  }, [jobs, searchQuery, jobTypeFilter, experienceFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, jobTypeFilter, experienceFilter]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleDeleteSuccess = (deletedId) => {
    setJobs((prev) => prev.filter((j) => j._id !== deletedId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Job Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            My Posted Jobs ({jobs.length})
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Create, edit, search, and manage candidate position listings.
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

      {/* Search & Filter Bar */}
      <div className="bg-surface p-4 rounded-2xl border border-border grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title or location..."
            icon={Search}
            className="h-10 text-xs font-medium"
          />
        </div>

        <div>
          <Select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="h-10 text-xs font-semibold"
          >
            <option value="all">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </Select>
        </div>

        <div>
          <Select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="h-10 text-xs font-semibold"
          >
            <option value="all">All Experience Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Executive">Executive</option>
          </Select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <EmptyState
          title="Error Loading Jobs"
          description={error}
          actionText="Retry"
          onAction={fetchJobs}
        />
      ) : (
        <>
          <JobTable jobs={paginatedJobs} onDeleteSuccess={handleDeleteSuccess} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-border">
              <span className="text-xs font-semibold text-text-secondary">
                Showing page {currentPage} of {totalPages} ({filteredJobs.length} total jobs)
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
    </div>
  );
}

export default Jobs;
