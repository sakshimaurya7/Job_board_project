import React from "react";
import {
  Mail,
  ShieldCheck,
  Calendar,
  Lock,
  Trash2,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// AccountInfo — Tab 4: Account Information
// Display read-only account details, status badges, and future action placeholders
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function AccountInfo({ profile }) {
  if (!profile) return null;

  return (
    <div className="space-y-6">

      {/* ── Account Details Summary ── */}
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" /> Account Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary">Email Address</p>
              <p className="text-sm font-bold text-text-primary mt-0.5">{profile.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary">Account Role</p>
              <p className="text-sm font-bold text-text-primary mt-0.5 capitalize">
                {profile.role || "Job Seeker"}
              </p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary">Member Since</p>
              <p className="text-sm font-bold text-text-primary mt-0.5">
                {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>

          {/* Account Status */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary">Account Status</p>
              <div className="flex items-center gap-2 mt-1">
                {profile.isVerified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                    Standard
                  </span>
                )}

                {profile.isActive !== false && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Security & Future Options ── */}
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" /> Password & Security
        </h4>
        <p className="text-xs text-text-secondary">
          Manage your login credentials and security settings.
        </p>

        <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50/50 border border-orange-100">
          <div>
            <p className="text-xs font-bold text-text-primary">Change Password</p>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Update your account password regularly for enhanced security.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="rounded-xl border border-orange-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-text-secondary opacity-60 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-error flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-error" /> Danger Zone
        </h4>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-text-primary">Delete Account</p>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Permanently delete your profile, job applications, and account data.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 rounded-xl bg-red-100 px-4 py-2 text-xs font-bold text-red-500 opacity-60 cursor-not-allowed shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete Account (Disabled)
          </button>
        </div>
      </div>

    </div>
  );
}
