import React from "react";
import { Skeleton } from "../ui/skeleton";

export const CompanyCardSkeleton = () => (
  <div className="p-6 bg-surface border border-border rounded-2xl shadow-soft space-y-4">
    <div className="flex items-center gap-3.5">
      <Skeleton className="w-14 h-14 rounded-2xl" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-24 rounded-lg" />
      <Skeleton className="h-6 w-20 rounded-lg" />
    </div>
    <Skeleton className="h-10 w-full rounded-xl" />
    <div className="pt-4 border-t border-border flex justify-between items-center">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-28 rounded-xl" />
    </div>
  </div>
);

export const CompanyListSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    {/* Skeleton Search */}
    <Skeleton className="h-16 w-full rounded-2xl" />

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Skeleton Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>

      {/* Skeleton Cards Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CompanyCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  </div>
);

export const CompanyDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    {/* Skeleton Header */}
    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-soft">
      <Skeleton className="h-48 w-full" />
      <div className="p-8 space-y-6">
        <div className="flex items-end gap-6 -mt-16">
          <Skeleton className="w-32 h-32 rounded-3xl border-4 border-surface" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </div>

    {/* Skeleton Overview */}
    <Skeleton className="h-64 w-full rounded-3xl" />
    <Skeleton className="h-48 w-full rounded-3xl" />
  </div>
);

export default CompanyListSkeleton;
