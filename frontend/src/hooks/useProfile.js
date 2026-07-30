import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profileService";
import { useAuth } from "./useAuth";

// ─────────────────────────────────────────────────────────────────────────────
// Profile Completion Calculation
// 7 fields: fullname, phoneNumber, location, bio, skills, resume, profilePhoto
// Returns a percentage (0-100) rounded to the nearest integer
// ─────────────────────────────────────────────────────────────────────────────
function calculateCompletion(user) {
  if (!user) return 0;

  const checks = [
    Boolean(user.fullname?.trim()),
    Boolean(user.phoneNumber?.trim()),
    Boolean(user.profile?.location?.trim()),
    Boolean(user.profile?.bio?.trim()),
    Array.isArray(user.profile?.skills) && user.profile.skills.length > 0,
    Boolean(user.profile?.resume?.trim()),
    Boolean(user.profile?.profilePhoto?.trim()),
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}

// ─────────────────────────────────────────────────────────────────────────────
// useProfile — custom hook for Profile Settings page
// ─────────────────────────────────────────────────────────────────────────────
export function useProfile() {
  const { user: authUser, updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // ── Fetch fresh profile from API ──
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile();
      if (data.success) {
        setProfile(data.user);
        // Sync AuthContext so Navbar updates immediately
        updateUser(data.user);
      } else {
        setError(data.message || "Failed to load profile.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [updateUser]);

  // Fetch on mount
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update profile via API ──
  const updateProfile = useCallback(
    async (payload) => {
      setSaving(true);
      try {
        const data = await profileService.updateProfile(payload);
        if (data.success) {
          setProfile(data.user);
          // Sync AuthContext — Navbar photo/name refreshes instantly
          updateUser(data.user);
          return { success: true };
        } else {
          return { success: false, message: data.message };
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Failed to update profile. Please try again.";
        return { success: false, message };
      } finally {
        setSaving(false);
      }
    },
    [updateUser]
  );

  // ── Computed: profile completion percentage ──
  const completionPercent = calculateCompletion(profile || authUser);

  // ── Computed: which fields are complete (for checklist) ──
  const completionFields = [
    {
      key: "fullname",
      label: "Full Name",
      done: Boolean((profile || authUser)?.fullname?.trim()),
    },
    {
      key: "phone",
      label: "Phone Number",
      done: Boolean((profile || authUser)?.phoneNumber?.trim()),
    },
    {
      key: "location",
      label: "Location",
      done: Boolean((profile || authUser)?.profile?.location?.trim()),
    },
    {
      key: "bio",
      label: "Bio",
      done: Boolean((profile || authUser)?.profile?.bio?.trim()),
    },
    {
      key: "skills",
      label: "Skills",
      done:
        Array.isArray((profile || authUser)?.profile?.skills) &&
        (profile || authUser).profile.skills.length > 0,
    },
    {
      key: "resume",
      label: "Resume",
      done: Boolean((profile || authUser)?.profile?.resume?.trim()),
    },
    {
      key: "photo",
      label: "Profile Photo",
      done: Boolean((profile || authUser)?.profile?.profilePhoto?.trim()),
    },
  ];

  return {
    profile: profile || authUser,
    loading,
    error,
    saving,
    refetch: fetchProfile,
    updateProfile,
    completionPercent,
    completionFields,
  };
}
