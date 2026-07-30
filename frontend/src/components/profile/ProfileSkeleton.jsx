import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ProfileSkeleton — shown while profile data is loading
// Mirrors the real layout: header card → completion bar → tabs → content
// ─────────────────────────────────────────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-orange-100/60 ${className}`} />
);

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] py-8 px-4">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* ── Header Card Skeleton ── */}
        <div className="rounded-2xl border border-orange-100 bg-white shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <Pulse className="h-28 w-28 shrink-0 rounded-full" />

            {/* Info lines */}
            <div className="flex-1 space-y-3 pt-2">
              <Pulse className="h-7 w-48" />
              <Pulse className="h-4 w-64" />
              <Pulse className="h-5 w-24 rounded-full" />
              <div className="flex gap-4 mt-2">
                <Pulse className="h-4 w-32" />
                <Pulse className="h-4 w-28" />
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-3 sm:text-right">
              <Pulse className="h-9 w-28 rounded-xl" />
              <Pulse className="h-16 w-36 rounded-xl" />
            </div>
          </div>
        </div>

        {/* ── Completion Bar Skeleton ── */}
        <div className="rounded-2xl border border-orange-100 bg-white shadow-md p-6 space-y-4">
          <Pulse className="h-5 w-40" />
          <Pulse className="h-3 w-full rounded-full" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <Pulse key={i} className="h-8 rounded-xl" />
            ))}
          </div>
        </div>

        {/* ── Tab Bar Skeleton ── */}
        <div className="flex gap-2 border-b border-orange-100 pb-0">
          {["Personal Info", "Professional", "Resume", "Account"].map((t) => (
            <Pulse key={t} className="h-10 w-32 rounded-t-xl" />
          ))}
        </div>

        {/* ── Tab Content Skeleton ── */}
        <div className="rounded-2xl border border-orange-100 bg-white shadow-md p-6 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Pulse className="h-4 w-24" />
              <Pulse className="h-11 w-full rounded-xl" />
            </div>
          ))}
          <div className="flex gap-3 justify-end pt-2">
            <Pulse className="h-10 w-24 rounded-xl" />
            <Pulse className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
