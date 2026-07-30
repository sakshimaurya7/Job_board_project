import React from "react";
import { BarChart3, PieChart, TrendingUp, Users, Award, Target, Briefcase } from "lucide-react";

export function AnalyticsCharts({ stats = {}, recentJobs = [], recentApplications = [] }) {
  const total = stats.totalApplicants || 1;
  const pending = stats.pending || 0;
  const reviewed = stats.reviewed || 0;
  const interview = stats.interview || 0;
  const selected = stats.selected || 0;
  const rejected = stats.rejected || 0;

  const pendingPct = Math.round((pending / total) * 100);
  const reviewedPct = Math.round((reviewed / total) * 100);
  const interviewPct = Math.round((interview / total) * 100);
  const selectedPct = Math.round((selected / total) * 100);
  const rejectedPct = Math.round((rejected / total) * 100);

  const conversionRate = Math.round((selected / total) * 100) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Application Status Distribution Pipeline */}
      <div className="p-6 bg-surface rounded-2xl border border-border space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold text-text flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Candidate Pipeline Distribution
            </h3>
            <p className="text-xs text-text-secondary">Current status of all submitted applications</p>
          </div>
          <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
            {stats.totalApplicants || 0} Total
          </span>
        </div>

        <div className="space-y-4">
          {/* Pending */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-amber-600 flex items-center gap-1.5">
                ⏳ Pending Review ({pending})
              </span>
              <span className="text-text">{pendingPct}%</span>
            </div>
            <div className="w-full h-3 bg-section rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${pendingPct}%` }}
              />
            </div>
          </div>

          {/* Reviewed */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-blue-600 flex items-center gap-1.5">
                👀 Reviewed ({reviewed})
              </span>
              <span className="text-text">{reviewedPct}%</span>
            </div>
            <div className="w-full h-3 bg-section rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${reviewedPct}%` }}
              />
            </div>
          </div>

          {/* Interview */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-purple-600 flex items-center gap-1.5">
                📹 Interview Scheduled ({interview})
              </span>
              <span className="text-text">{interviewPct}%</span>
            </div>
            <div className="w-full h-3 bg-section rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${interviewPct}%` }}
              />
            </div>
          </div>

          {/* Selected */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-emerald-600 flex items-center gap-1.5">
                ✅ Selected / Accepted ({selected})
              </span>
              <span className="text-text">{selectedPct}%</span>
            </div>
            <div className="w-full h-3 bg-section rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${selectedPct}%` }}
              />
            </div>
          </div>

          {/* Rejected */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-rose-600 flex items-center gap-1.5">
                ❌ Rejected ({rejected})
              </span>
              <span className="text-text">{rejectedPct}%</span>
            </div>
            <div className="w-full h-3 bg-section rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${rejectedPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hiring Conversion & Efficiency Metrics */}
      <div className="space-y-6">
        {/* Conversion Rate Card */}
        <div className="p-6 bg-gradient-to-br from-surface to-section rounded-2xl border border-border space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Hiring Conversion Rate
              </p>
              <h3 className="text-3xl font-black text-text mt-1 flex items-center gap-2">
                {conversionRate}%
                <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-200">
                  Top 15% ATS
                </span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Percentage of total candidates who successfully advanced from application to offer/selection.
          </p>
        </div>

        {/* Top Job Listings Breakdown */}
        <div className="p-6 bg-surface rounded-2xl border border-border space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-text flex items-center gap-2 border-b border-border pb-3">
            <Award className="w-4 h-4 text-primary" />
            Top Performing Job Listings
          </h3>

          <div className="space-y-3">
            {recentJobs.slice(0, 4).map((job) => {
              const appCount = job.applications?.length || 0;
              return (
                <div
                  key={job._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-section border border-border/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-text line-clamp-1">{job.title}</h4>
                      <span className="text-[10px] text-text-secondary">{job.location}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-lg">
                    {appCount} Applicants
                  </span>
                </div>
              );
            })}

            {recentJobs.length === 0 && (
              <p className="text-xs text-text-secondary text-center py-4">
                No active jobs to display statistics.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;
