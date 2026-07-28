import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  role: z
    .enum(["jobseeker", "recruiter"], {
      required_error: "Please select your role",
      invalid_type_error: "Role must be either Job Seeker or Employer",
    }),
  rememberMe: z.boolean().optional(),
});
