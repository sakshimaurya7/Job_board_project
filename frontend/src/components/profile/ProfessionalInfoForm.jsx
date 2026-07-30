import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalInfoSchema } from "../../validation/profileSchema";
import { SkillsInput } from "./SkillsInput";
import { Briefcase, FileText, Save, X, Lightbulb } from "lucide-react";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// ProfessionalInfoForm — Tab 2: Professional Information
// Fields: Bio (textarea, 500 char max with counter) + Skills (tag input)
// ─────────────────────────────────────────────────────────────────────────────

export function ProfessionalInfoForm({ profile, onSave, saving }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      bio: profile?.profile?.bio || "",
      skills: profile?.profile?.skills || [],
    },
  });

  // Reset when profile data changes
  useEffect(() => {
    reset({
      bio: profile?.profile?.bio || "",
      skills: profile?.profile?.skills || [],
    });
  }, [profile, reset]);

  const bioValue = watch("bio") || "";
  const bioLength = bioValue.length;
  const BIO_MAX = 500;

  // ── Submit ──
  const onSubmit = async (data) => {
    const result = await onSave({
      bio: data.bio || "",
      skills: data.skills || [],
    });
    if (result?.success) {
      toast.success("Professional information updated! 🚀");
    } else {
      toast.error(result?.message || "Failed to update. Please try again.");
    }
  };

  const handleCancel = () => reset();

  // Bio counter color
  const counterColor =
    bioLength >= BIO_MAX
      ? "text-error font-bold"
      : bioLength >= BIO_MAX * 0.8
      ? "text-warning"
      : "text-text-secondary";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

      {/* ── Bio field ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="bio" className="block text-sm font-semibold text-text-primary">
            <span className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-orange-400" />
              Professional Bio
            </span>
          </label>
          <span className={`text-xs ${counterColor}`}>
            {bioLength} / {BIO_MAX}
          </span>
        </div>
        <textarea
          id="bio"
          rows={5}
          placeholder="Write a short professional summary about yourself — your experience, strengths, and what you're looking for…"
          {...register("bio")}
          maxLength={BIO_MAX}
          className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-text-primary placeholder-placeholder transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/25 ${
            errors.bio
              ? "border-error focus:border-error"
              : "border-orange-200 focus:border-primary"
          }`}
        />
        {errors.bio && (
          <p className="text-xs text-error">{errors.bio.message}</p>
        )}
        {/* Tips hint */}
        <p className="text-xs text-text-secondary flex items-center gap-1">
          <Lightbulb className="h-3 w-3 text-orange-400 shrink-0" />
          Tip: Mention your key skills, years of experience, and career goals.
        </p>
      </div>

      {/* ── Skills field ── */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-text-primary">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4 text-orange-400" />
            Skills
          </span>
        </label>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <SkillsInput
              value={field.value || []}
              onChange={field.onChange}
            />
          )}
        />
        <p className="text-xs text-text-secondary">
          Type a skill and press <kbd className="rounded border border-orange-200 bg-orange-50 px-1 py-0.5 font-mono text-[10px]">Enter</kbd> or <kbd className="rounded border border-orange-200 bg-orange-50 px-1 py-0.5 font-mono text-[10px]">,</kbd> to add. Click × to remove.
        </p>
        {errors.skills && (
          <p className="text-xs text-error">{errors.skills.message}</p>
        )}
      </div>

      {/* ── Empty states ── */}
      {(!profile?.profile?.bio && !profile?.profile?.skills?.length) && (
        <div className="rounded-xl border border-orange-100 bg-orange-50/50 px-4 py-3">
          <p className="text-xs font-medium text-orange-600">
            💡 A complete bio and skills list makes you <strong>3× more likely</strong> to be contacted by recruiters.
          </p>
        </div>
      )}

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
          disabled={saving || !isDirty}
          id="save-professional-info-btn"
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
