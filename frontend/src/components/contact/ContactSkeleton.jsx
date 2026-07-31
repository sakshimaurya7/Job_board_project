import React from "react";
import { Skeleton } from "../ui/skeleton";

export function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse" aria-busy="true" aria-label="Loading Contact page">

      {/* Hero skeleton */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <Skeleton className="h-7 w-44 rounded-full" />
              <Skeleton className="h-14 w-full rounded-2xl" />
              <Skeleton className="h-10 w-4/5 rounded-2xl" />
              <Skeleton className="h-6 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-xl" />
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-12 w-40 rounded-xl" />
                <Skeleton className="h-12 w-36 rounded-xl" />
              </div>
            </div>
            <Skeleton className="h-72 w-full rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Info cards skeleton */}
      <section className="py-16 bg-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center space-y-3">
            <Skeleton className="mx-auto h-7 w-44 rounded-full" />
            <Skeleton className="mx-auto h-10 w-72 rounded-2xl" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-6 space-y-4">
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form skeleton */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left sidebar skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-7 w-44 rounded-full" />
              <Skeleton className="h-10 w-full rounded-2xl" />
              <Skeleton className="h-6 w-4/5 rounded-xl" />
              <Skeleton className="h-44 w-full rounded-2xl" />
            </div>
            {/* Form card skeleton */}
            <div className="rounded-3xl border border-border bg-surface p-8 space-y-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-12 w-28 rounded-xl" />
                <Skeleton className="h-12 flex-1 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
