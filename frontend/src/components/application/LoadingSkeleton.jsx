import React from "react";
import { Skeleton } from "../ui/skeleton";

export function LoadingSkeleton({ isEmployer = false }) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 rounded-2xl border border-border bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-12 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="flex flex-wrap items-center gap-3 bg-surface p-4 rounded-2xl border border-border">
        <Skeleton className="h-9 flex-1 min-w-[200px] rounded-xl" />
        <Skeleton className="h-9 w-36 rounded-xl" />
        <Skeleton className="h-9 w-36 rounded-xl" />
      </div>

      {/* Content Skeleton (Cards vs Table) */}
      {isEmployer ? (
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-40 rounded-md" />
              <Skeleton className="h-8 w-28 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="p-6 bg-surface rounded-2xl border border-border space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded-md" />
                    <Skeleton className="h-5 w-36 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoadingSkeleton;
