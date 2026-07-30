import React from "react";
import { FilterX, SlidersHorizontal } from "lucide-react";
import { Select } from "../ui/select";
import { Button } from "../ui/button";

export function ApplicationFilters({
  filters,
  onFilterChange,
  onClearFilters,
  companyOptions = [],
  jobOptions = [],
  isEmployer = false,
}) {
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.jobType !== "all" ||
    filters.company !== "all" ||
    filters.jobId !== "all" ||
    filters.sort !== "newest" ||
    !!filters.search;

  return (
    <div className="flex flex-wrap items-center gap-3 bg-surface p-4 rounded-2xl border border-border mb-6">
      <div className="flex items-center gap-2 text-xs font-bold text-text-secondary uppercase tracking-wider pr-2 border-r border-border">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <span>Filters</span>
      </div>

      {/* Status Filter */}
      <div className="w-40">
        <Select
          value={filters.status || "all"}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="h-9 text-xs rounded-xl"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="interview">Interview</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </Select>
      </div>

      {/* Employer Job Filter */}
      {isEmployer && jobOptions.length > 0 && (
        <div className="w-48">
          <Select
            value={filters.jobId || "all"}
            onChange={(e) => onFilterChange("jobId", e.target.value)}
            className="h-9 text-xs rounded-xl"
          >
            <option value="all">All Posted Jobs</option>
            {jobOptions.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Job Seeker Company Filter */}
      {!isEmployer && companyOptions.length > 0 && (
        <div className="w-44">
          <Select
            value={filters.company || "all"}
            onChange={(e) => onFilterChange("company", e.target.value)}
            className="h-9 text-xs rounded-xl"
          >
            <option value="all">All Companies</option>
            {companyOptions.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Job Type Filter */}
      <div className="w-40">
        <Select
          value={filters.jobType || "all"}
          onChange={(e) => onFilterChange("jobType", e.target.value)}
          className="h-9 text-xs rounded-xl"
        >
          <option value="all">All Workplaces</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </Select>
      </div>

      {/* Sort Order */}
      <div className="w-36 ml-auto">
        <Select
          value={filters.sort || "newest"}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className="h-9 text-xs rounded-xl"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </Select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="h-9 px-3 text-xs font-medium text-rose-600 hover:bg-rose-50 border-rose-200 rounded-xl gap-1.5"
        >
          <FilterX className="w-3.5 h-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}

export default ApplicationFilters;
