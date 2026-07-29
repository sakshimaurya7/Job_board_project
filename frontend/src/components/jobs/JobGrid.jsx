import React from "react";
import JobCard from "./JobCard";
import { JobGridSkeleton } from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export const JobGrid = ({
  jobs = [],
  appliedJobIds = [],
  loading = false,
  error = null,
  onRetry,
  onResetFilters,
  onApplyJob,
}) => {
  if (loading) {
    return <JobGridSkeleton count={6} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!jobs || jobs.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => {
        const isApplied = appliedJobIds.includes(job._id);
        return (
          <JobCard
            key={job._id}
            job={job}
            isApplied={isApplied}
            onApply={onApplyJob}
          />
        );
      })}
    </div>
  );
};

export default JobGrid;
