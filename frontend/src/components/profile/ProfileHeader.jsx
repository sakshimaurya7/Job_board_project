import React from "react";
import {
  MapPin,
  Mail,
  Calendar,
  Shield,
  FileText,
  Edit3,
  CheckCircle2,
} from "lucide-react";
import { ProfileAvatarUpload } from "./ProfileAvatarUpload";

// ─────────────────────────────────────────────────────────────────────────────
// ProfileHeader — the large hero card at the top of the profile page
// Shows: avatar, name, email, role badge, location, member since,
//        completion %, resume status, and an Edit button
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function ProfileHeader({ profile, completionPercent, onEditClick }) {
  if (!profile) return null;

  const hasResume = Boolean(profile.profile?.resume?.trim());
  const location = profile.profile?.location?.trim();

  return (
    <div className="rounded-2xl border border-orange-100 bg-white shadow-md overflow-hidden">
      {/* ── Orange gradient banner ── */}
      <div className="h-24 w-full bg-gradient-to-r from-orange-400 via-primary to-orange-600 relative">
        {/* Completion ring overlay */}
        <div className="absolute right-6 top-4 flex flex-col items-center">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FED7AA" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                strokeDasharray={`${completionPercent} ${100 - completionPercent}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="z-10 text-xs font-black text-primary">{completionPercent}%</span>
          </div>
          <span className="mt-1 text-[10px] font-semibold text-white drop-shadow">
            Complete
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="px-6 pb-6">
        {/* Avatar overlapping the banner */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="-mt-14 flex items-end gap-4">
            {/* Avatar (view-only in header; editing is in the form tab) */}
            <div className="relative">
              <div className="h-28 w-28 rounded-full border-4 border-white bg-orange-50 overflow-hidden shadow-lg flex items-center justify-center">
                {profile.profile?.profilePhoto ? (
                  <img
                    src={profile.profile.profilePhoto}
                    alt={profile.fullname}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-primary">
                    {(profile.fullname || "U")
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2)}
                  </span>
                )}
              </div>
              {/* Verified badge on avatar */}
              {profile.isVerified && (
                <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </span>
              )}
            </div>

            {/* Name + role */}
            <div className="pb-1">
              <h1 className="text-2xl font-black text-text-primary leading-tight">
                {profile.fullname || "Your Name"}
              </h1>
              <span className="inline-block mt-1 rounded-full bg-orange-100 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-primary">
                Job Seeker
              </span>
            </div>
          </div>

          {/* ── Right: Edit button ── */}
          <div className="sm:pb-1">
            <button
              type="button"
              onClick={onEditClick}
              id="profile-edit-btn"
              className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-orange-100 hover:shadow-sm active:scale-95"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* ── Meta info row ── */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Mail className="h-4 w-4 text-orange-400" />
            <span>{profile.email}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin className="h-4 w-4 text-orange-400" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Calendar className="h-4 w-4 text-orange-400" />
            <span>Member since {formatDate(profile.createdAt)}</span>
          </div>
        </div>

        {/* ── Resume status ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {hasResume ? (
            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <FileText className="h-3.5 w-3.5" />
              Resume uploaded
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
              <FileText className="h-3.5 w-3.5" />
              No resume — upload to get noticed
            </div>
          )}

          {profile.isActive && (
            <div className="flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Active
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
