import React from "react";
import { Skeleton } from "../ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center bg-surface p-6 rounded-2xl border border-border">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 bg-surface rounded-2xl border border-border space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
              <Skeleton className="w-12 h-12 rounded-2xl" />
            </div>
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
        <Skeleton className="h-6 w-40 rounded" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
