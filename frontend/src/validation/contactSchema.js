import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters"),

  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s\-().]{7,20}$/.test(val),
      "Please enter a valid phone number"
    ),

  role: z.enum(["jobseeker", "recruiter", "visitor"], {
    required_error: "Please select your role",
    invalid_type_error: "Please select a valid role",
  }),

  subject: z.enum(
    ["inquiry", "support", "issue", "recruiter", "partnership", "other"],
    {
      required_error: "Please select a subject",
      invalid_type_error: "Please select a valid subject",
    }
  ),

  message: z
    .string()
    .min(1, "Message is required")
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be under 2000 characters"),

  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Privacy Policy" }),
  }),
});
