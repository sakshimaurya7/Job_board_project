import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

export const JobCardSkeleton = () => {
  return (
    <Card className="p-6 flex flex-col justify-between h-[320px] bg-surface border border-border">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-8 w-8 rounded-xl" />
        </div>

        <Skeleton className="h-6 w-3/4 mb-3" />

        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
      </div>

      <div className="space-y-4 pt-3 border-t border-border/50">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-xl" />
          <Skeleton className="h-10 flex-1 rounded-xl" />
        </div>
      </div>
    </Card>
  );
};

export const JobGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const JobDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Skeleton: Represents the top section */}
      <Card className="p-8 bg-surface border border-border">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-start gap-5">
            {/*Company Logo */}
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <div className="space-y-3">
              {/* Job title */}
              <Skeleton className="h-8 w-64" />
              {/* Company name and location */}
              <Skeleton className="h-5 w-40" />
              <div className="flex gap-3">
                {/* Job type */}
                <Skeleton className="h-6 w-24 rounded-full" />
                {/* Job salary */}
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {/* Buttons (Apply & Save job) */}
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </Card>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-40 pt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobGridSkeleton;
