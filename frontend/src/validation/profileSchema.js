import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Personal Information Schema
// Fields: fullname (required), phoneNumber (optional), location (optional)
// ─────────────────────────────────────────────────────────────────────────────
export const personalInfoSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .trim(),

  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^\d{10}$/.test(val.trim()),
      "Phone number must be exactly 10 digits"
    )
    .transform((val) => val?.trim() || ""),

  location: z
    .string()
    .max(100, "Location cannot exceed 100 characters")
    .optional()
    .transform((val) => val?.trim() || ""),
});

// ─────────────────────────────────────────────────────────────────────────────
// Professional Information Schema
// Fields: bio (max 500 chars), skills (array of trimmed strings)
// ─────────────────────────────────────────────────────────────────────────────
export const professionalInfoSchema = z.object({
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional()
    .transform((val) => val?.trim() || ""),

  skills: z
    .array(z.string().trim())
    .optional()
    .transform((arr) => {
      if (!arr) return [];
      // Remove duplicates and empty strings
      return [...new Set(arr.map((s) => s.trim()).filter(Boolean))];
    }),
});
