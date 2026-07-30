import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../validation/profileSchema";
import { ProfileAvatarUpload } from "./ProfileAvatarUpload";
import { User, Phone, MapPin, Mail, Save, X } from "lucide-react";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// PersonalInfoForm — Tab 1: Personal Information
// Fields: Full Name, Email (read-only), Phone, Location, Profile Photo
// Validates with Zod. On save → calls onSave(payload).
// ─────────────────────────────────────────────────────────────────────────────

export function PersonalInfoForm({ profile, onSave, saving }) {
  // Track the selected avatar base64 separately (not in RHF)
  const [pendingPhoto, setPendingPhoto] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullname: profile?.fullname || "",
      phoneNumber: profile?.phoneNumber || "",
      location: profile?.profile?.location || "",
    },
  });

  // Reset form when profile data changes (e.g. after fetch)
  useEffect(() => {
    reset({
      fullname: profile?.fullname || "",
      phoneNumber: profile?.phoneNumber || "",
      location: profile?.profile?.location || "",
    });
    setPendingPhoto(null);
  }, [profile, reset]);

  // ── Form submit ──
  const onSubmit = async (data) => {
    const payload = {
      fullname: data.fullname,
      phoneNumber: data.phoneNumber || "",
      location: data.location || "",
    };

    // Include photo only if a new one was selected
    if (pendingPhoto) {
      payload.profilePhoto = pendingPhoto;
    }

    const result = await onSave(payload);
    if (result?.success) {
      toast.success("Personal information updated successfully! ✨");
      setPendingPhoto(null);
    } else {
      toast.error(result?.message || "Failed to update profile. Please try again.");
    }
  };

  // ── Cancel: reset form ──
  const handleCancel = () => {
    reset();
    setPendingPhoto(null);
  };

  const hasChanges = isDirty || Boolean(pendingPhoto);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

      {/* ── Avatar section ── */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
        <ProfileAvatarUpload
          currentPhoto={profile?.profile?.profilePhoto}
          name={profile?.fullname || ""}
          onImageSelect={setPendingPhoto}
          size="lg"
        />
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-text-primary">Profile Photo</p>
          <p className="mt-1 text-xs text-text-secondary">
            JPG or PNG · Max 2 MB
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Click the avatar to select a new photo.
          </p>
          {pendingPhoto && (
            <span className="mt-2 inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              New photo ready to save
            </span>
          )}
        </div>
      </div>

      {/* ── Fields grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullname" className="block text-sm font-semibold text-text-primary">
            Full Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
            <input
              id="fullname"
              type="text"
              placeholder="Your full name"
              {...register("fullname")}
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-text-primary placeholder-placeholder transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                errors.fullname
                  ? "border-error focus:border-error"
                  : "border-orange-200 focus:border-primary"
              }`}
            />
          </div>
          {errors.fullname && (
            <p className="text-xs text-error">{errors.fullname.message}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div className="space-y-1.5">
          <label htmlFor="email-readonly" className="block text-sm font-semibold text-text-primary">
            Email Address
            <span className="ml-2 text-[10px] font-normal text-text-secondary">(read-only)</span>
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-200" />
            <input
              id="email-readonly"
              type="email"
              value={profile?.email || ""}
              readOnly
              className="w-full rounded-xl border border-orange-100 bg-orange-50/50 py-3 pl-10 pr-4 text-sm text-text-secondary cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-text-secondary">Contact support to change email.</p>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-text-primary">
            Phone Number
            <span className="ml-2 text-[10px] font-normal text-text-secondary">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
            <input
              id="phoneNumber"
              type="tel"
              placeholder="10-digit phone number"
              {...register("phoneNumber")}
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-text-primary placeholder-placeholder transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                errors.phoneNumber
                  ? "border-error focus:border-error"
                  : "border-orange-200 focus:border-primary"
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-error">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label htmlFor="location" className="block text-sm font-semibold text-text-primary">
            Location
            <span className="ml-2 text-[10px] font-normal text-text-secondary">(optional)</span>
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
            <input
              id="location"
              type="text"
              placeholder="City, State or Remote"
              {...register("location")}
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-text-primary placeholder-placeholder transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                errors.location
                  ? "border-error focus:border-error"
                  : "border-orange-200 focus:border-primary"
              }`}
            />
          </div>
          {errors.location && (
            <p className="text-xs text-error">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex items-center justify-end gap-3 border-t border-orange-100 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !hasChanges}
          id="save-personal-info-btn"
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
        >
          {saving ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
