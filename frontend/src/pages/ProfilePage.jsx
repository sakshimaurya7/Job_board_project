import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileCompletion } from "../components/profile/ProfileCompletion";
import { PersonalInfoForm } from "../components/profile/PersonalInfoForm";
import { ProfessionalInfoForm } from "../components/profile/ProfessionalInfoForm";
import { ResumeCard } from "../components/profile/ResumeCard";
import { AccountInfo } from "../components/profile/AccountInfo";
import { ProfileSkeleton } from "../components/profile/ProfileSkeleton";
import { User, Briefcase, FileText, Shield, AlertCircle } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ProfilePage — Main Job Seeker Profile Settings module
// Responsive design with tabbed navigation, header card, completion progress.
// Color Palette: Primary #F97316, Hover #EA580C, Background #FFFBF5, Cards White
// ─────────────────────────────────────────────────────────────────────────────

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    profile,
    loading,
    error,
    saving,
    updateProfile,
    completionPercent,
    completionFields,
  } = useProfile();

  const [activeTab, setActiveTab] = useState("personal");

  // ── Guard: Ensure only Job Seekers access this page ──
  useEffect(() => {
    if (user && (user.role === "recruiter" || user.role === "employer")) {
      navigate("/recruiter/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#FFFBF5]">
        <div className="rounded-2xl border border-red-200 bg-white p-8 max-w-md text-center shadow-md space-y-4">
          <AlertCircle className="h-12 w-12 text-error mx-auto" />
          <h3 className="text-lg font-bold text-text-primary">Unable to load profile</h3>
          <p className="text-xs text-text-secondary">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "professional", label: "Professional Information", icon: Briefcase },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "account", label: "Account", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* ── Page Title / Header ── */}
        <div>
          <h1 className="text-2xl font-black text-text-primary">Profile Settings</h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage your candidate profile, resume, and recruiter visibility settings.
          </p>
        </div>

        {/* ── Section 1: Profile Header Card ── */}
        <ProfileHeader
          profile={profile}
          completionPercent={completionPercent}
          onEditClick={() => setActiveTab("personal")}
        />

        {/* ── Section 2: Profile Completion Progress ── */}
        <ProfileCompletion
          percent={completionPercent}
          fields={completionFields}
        />

        {/* ── Section 3: Navigation Tabs ── */}
        <div className="rounded-2xl border border-orange-100 bg-white shadow-md overflow-hidden">

          {/* Tab buttons bar */}
          <div className="flex border-b border-orange-100 bg-orange-50/40 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  id={`tab-btn-${tab.id}`}
                  className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition-all shrink-0 border-b-2 ${
                    isActive
                      ? "border-primary bg-white text-primary shadow-sm"
                      : "border-transparent text-text-secondary hover:text-primary hover:bg-orange-100/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-text-secondary"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content area */}
          <div className="p-6 sm:p-8">
            {activeTab === "personal" && (
              <PersonalInfoForm
                profile={profile}
                onSave={updateProfile}
                saving={saving}
              />
            )}

            {activeTab === "professional" && (
              <ProfessionalInfoForm
                profile={profile}
                onSave={updateProfile}
                saving={saving}
              />
            )}

            {activeTab === "resume" && (
              <ResumeCard
                profile={profile}
                onSave={updateProfile}
                saving={saving}
              />
            )}

            {activeTab === "account" && (
              <AccountInfo profile={profile} />
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
