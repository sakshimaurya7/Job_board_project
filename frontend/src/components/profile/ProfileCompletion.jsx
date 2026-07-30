import React from "react";
import { CheckCircle2, Circle, TrendingUp } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ProfileCompletion
// Animated progress bar + field checklist
// Props:
//   percent  — 0-100 integer
//   fields   — [{ key, label, done }]
// ─────────────────────────────────────────────────────────────────────────────
export function ProfileCompletion({ percent = 0, fields = [] }) {
  const isComplete = percent === 100;

  // Bar color
  const barColor = isComplete
    ? "bg-gradient-to-r from-green-400 to-green-500"
    : "bg-gradient-to-r from-orange-400 to-primary";

  // Label color
  const percentColor = isComplete ? "text-green-600" : "text-primary";

  return (
    <div className="rounded-2xl border border-orange-100 bg-white shadow-md p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-text-primary">Profile Completion</h3>
        </div>
        <span className={`text-2xl font-black ${percentColor}`}>{percent}%</span>
      </div>

      {/* ── Progress bar ── */}
      <div className="relative mb-4">
        <div className="h-3 w-full rounded-full bg-orange-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* ── CTA message ── */}
      {!isComplete && (
        <p className="mb-4 text-xs text-text-secondary">
          <span className="font-semibold text-primary">
            Complete your profile
          </span>{" "}
          to increase recruiter visibility and stand out in searches.
        </p>
      )}
      {isComplete && (
        <p className="mb-4 text-xs font-semibold text-green-600">
          🎉 Your profile is 100% complete! Recruiters can find you easily.
        </p>
      )}

      {/* ── Field checklist ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {fields.map(({ key, label, done }) => (
          <div
            key={key}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-200 ${
              done
                ? "bg-green-50 text-green-700"
                : "bg-orange-50 text-text-secondary"
            }`}
          >
            {done ? (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
            ) : (
              <Circle className="h-3.5 w-3.5 shrink-0 text-orange-300" />
            )}
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
