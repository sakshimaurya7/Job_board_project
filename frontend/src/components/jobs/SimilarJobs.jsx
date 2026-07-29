import React from "react";
import { Sparkles } from "lucide-react";
import JobCard from "./JobCard";

export const SimilarJobs = ({ jobs = [], currentJobId, appliedJobIds = [], onApplyJob }) => {
  // Filter out current job and select top 3 similar jobs
  const similarList = jobs
    .filter((j) => j._id !== currentJobId)
    .slice(0, 3);

  if (similarList.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border/80">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Sparkles className="w-5 h-5 fill-primary/20" />
        </div>
        <h2 className="text-2xl font-extrabold text-text">Similar Job Opportunities</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarList.map((job) => {
          const isApplied = appliedJobIds.includes(job._id);
          return (
            <JobCard
              key={`similar-${job._id}`}
              job={job}
              isApplied={isApplied}
              onApply={onApplyJob}
            />
          );
        })}
      </div>
    </div>
  );
};

{/* This will actually do not show the show the similar jobs to the user ,
  instead it removes the current job from the array by checking the applied jobs list and displays the remaining first three jobs to the user,
  if after removing no jobs left then do not show any job 
  Because this actually do not compare job titles, company, category, salary etc. */}

export default SimilarJobs;
