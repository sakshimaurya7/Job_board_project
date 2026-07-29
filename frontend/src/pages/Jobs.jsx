import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jobService } from "../services/jobService";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "../components/jobs/SearchBar";
import FeaturedJobs from "../components/jobs/FeaturedJobs";
import JobFilters from "../components/jobs/JobFilters";
import SortDropdown from "../components/jobs/SortDropdown";
import JobGrid from "../components/jobs/JobGrid";
import Pagination from "../components/jobs/Pagination";
import { Sheet } from "../components/ui/sheet";
import { toast } from "sonner";

export default function Jobs() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Data states
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile Filter Drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search input states
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [jobTypeQuery, setJobTypeQuery] = useState("");

  // Filter sidebar states
  const [filters, setFilters] = useState({
    remoteOnly: false,
    jobTypes: [],
    experienceLevels: [],
    minSalary: 0,
    postedWithin: "all",
    companyId: "",
  });

  // Sorting & Pagination states
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch Jobs and Applied Jobs on Mount
  const fetchJobsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getAllJobs();
      if (data.success) {
        setJobs(data.jobs || []);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Error loading jobs:", err);
      setError(err.response?.data?.message || "Failed to load job listings.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    if (!isAuthenticated || user?.role !== "jobseeker") return;
    try {
      const data = await jobService.getAppliedJobs();
      if (data.success && data.applications) {
        const ids = data.applications.map((app) =>
          typeof app.job === "object" ? app.job._id : app.job
        );
        setAppliedJobIds(ids);
      }
    } catch (err) {
      console.warn("Could not load user applied jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobsData();
    fetchAppliedJobs();
  }, [isAuthenticated, user?.role]);

  // Extract unique companies for filter dropdown
  const companiesList = useMemo(() => {
    const map = new Map();
    jobs.forEach((job) => {
      if (job.company && job.company._id) {
        map.set(job.company._id, job.company);
      }
    });
    return Array.from(map.values());
  }, [jobs]);

  // Reset all search and filter values
  const handleResetAll = () => {
    setSearchQuery("");
    setLocationQuery("");
    setJobTypeQuery("");
    setFilters({
      remoteOnly: false,
      jobTypes: [],
      experienceLevels: [],
      minSalary: 0,
      postedWithin: "all",
      companyId: "",
    });
    setCurrentPage(1);
    toast.info("All filters have been reset.");
  };

  // Count active filter conditions
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.remoteOnly) count++;
    if (filters.jobTypes && filters.jobTypes.length > 0) count += filters.jobTypes.length;
    if (filters.experienceLevels && filters.experienceLevels.length > 0) count += filters.experienceLevels.length;
    if (filters.minSalary > 0) count++;
    if (filters.postedWithin !== "all") count++;
    if (filters.companyId) count++;
    if (jobTypeQuery) count++;
    return count;
  }, [filters, jobTypeQuery]);

  // Apply Filter, Search & Sorting
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Keyword Search (title, skills/requirements, description, company name)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = job.title?.toLowerCase().includes(q);
          const companyMatch = job.company?.name?.toLowerCase().includes(q);
          const descMatch = job.description?.toLowerCase().includes(q);
          const reqMatch = job.requirements?.some((r) => r.toLowerCase().includes(q));
          if (!titleMatch && !companyMatch && !descMatch && !reqMatch) return false;
        }

        // Location Search
        if (locationQuery.trim()) {
          const loc = locationQuery.toLowerCase().trim();
          if (!job.location?.toLowerCase().includes(loc)) return false;
        }

        // Job Type from Hero search or Filter checkbox
        const selectedTypes = [...(filters.jobTypes || [])];
        if (jobTypeQuery) selectedTypes.push(jobTypeQuery);

        if (selectedTypes.length > 0) {
          const matchType = selectedTypes.some((t) => {
            if (t === "Remote") return job.location?.toLowerCase().includes("remote") || job.jobType === "Remote";
            return job.jobType?.toLowerCase() === t.toLowerCase();
          });
          if (!matchType) return false;
        }

        // Remote Only
        if (filters.remoteOnly) {
          if (!job.location?.toLowerCase().includes("remote") && job.jobType !== "Remote") {
            return false;
          }
        }

        // Experience Level
        if (filters.experienceLevels && filters.experienceLevels.length > 0) {
          const expStr = (job.experienceLevel || "").toLowerCase();
          const matchExp = filters.experienceLevels.some((lvl) => {
            if (lvl === "entry") return expStr.includes("0") || expStr.includes("fresher") || expStr.includes("entry");
            if (lvl === "mid") return expStr.includes("1") || expStr.includes("2") || expStr.includes("mid");
            if (lvl === "senior") return expStr.includes("senior") || expStr.includes("5") || expStr.includes("sr");
            return true;
          });
          if (!matchExp) return false;
        }

        // Minimum Salary
        if (filters.minSalary > 0) {
          if (Number(job.salary || 0) < filters.minSalary) return false;
        }

        // Date Posted
        if (filters.postedWithin && filters.postedWithin !== "all") {
          const days = Number(filters.postedWithin);
          const jobDate = new Date(job.createdAt);
          const now = new Date();
          const diffDays = (now - jobDate) / (1000 * 60 * 60 * 24);
          if (diffDays > days) return false;
        }

        // Company filter
        if (filters.companyId) {
          const cId = typeof job.company === "object" ? job.company?._id : job.company;
          if (cId !== filters.companyId) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "salary-high") return Number(b.salary || 0) - Number(a.salary || 0);
        if (sortBy === "salary-low") return Number(a.salary || 0) - Number(b.salary || 0);
        if (sortBy === "az") return a.title.localeCompare(b.title);
        if (sortBy === "za") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [jobs, searchQuery, locationQuery, jobTypeQuery, filters, sortBy]);

  // Paginated subset
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  // Handle Job Application
  const handleApplyJob = async (job) => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for jobs.", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }

    if (user?.role !== "jobseeker") {
      toast.error("Recruiters cannot apply for jobs. Please switch to a candidate account.");
      return;
    }

    try {
      const response = await jobService.applyJob(job._id);
      if (response.success) {
        toast.success(`Application submitted for ${job.title}!`);
        setAppliedJobIds((prev) => [...prev, job._id]);
      } else {
        toast.error(response.message || "Failed to submit application.");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to submit application.";
      if (errMsg.toLowerCase().includes("already applied")) {
        toast.error("You have already applied for this job.");
        setAppliedJobIds((prev) => (prev.includes(job._id) ? prev : [...prev, job._id]));
      } else {
        toast.error(errMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
            Find Your <span className="text-primary">Dream Career</span>
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Discover thousands of verified tech, product, and design roles with top companies.
          </p>
        </div>

        {/* Hero Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          jobTypeQuery={jobTypeQuery}
          setJobTypeQuery={setJobTypeQuery}
          onSearch={() => setCurrentPage(1)}
          onClear={handleResetAll}
          activeFilterCount={activeFilterCount}
          onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
        />

        {/* Featured Jobs Section */}
        {!loading && !error && jobs.length > 0 && <FeaturedJobs jobs={jobs} />}

        {/* Main Content Layout (Desktop Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
            <JobFilters
              filters={filters}
              setFilters={setFilters}
              onClearFilters={handleResetAll}
              activeFilterCount={activeFilterCount}
              companiesList={companiesList}
            />
          </div>

          {/* Job Listings Column */}
          <div className="lg:col-span-3">
            {/* Results Header Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
              <div className="text-sm font-bold text-text">
                Showing{" "}
                <span className="text-primary">{filteredJobs.length}</span>{" "}
                {filteredJobs.length === 1 ? "Job Available" : "Jobs Available"}
              </div>

              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {/* Jobs Grid */}
            <JobGrid
              jobs={paginatedJobs}
              appliedJobIds={appliedJobIds}
              loading={loading}
              error={error}
              onRetry={fetchJobsData}
              onResetFilters={handleResetAll}
              onApplyJob={handleApplyJob}
            />

            {/* Pagination */}
            {!loading && !error && filteredJobs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                totalItems={filteredJobs.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>

        {/* Mobile Filters Sheet Drawer */}
        <Sheet
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          title="Filter Jobs"
        >
          <JobFilters
            filters={filters}
            setFilters={setFilters}
            onClearFilters={handleResetAll}
            activeFilterCount={activeFilterCount}
            companiesList={companiesList}
          />
        </Sheet>
      </div>
    </div>
  );
}
