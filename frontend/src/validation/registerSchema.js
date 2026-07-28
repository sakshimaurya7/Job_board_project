import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters long")
      .max(50, "Full name cannot exceed 50 characters"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Phone number must contain only numeric digits")
      .length(10, "Phone number must be exactly 10 digits"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "Password must contain at least 1 special character (!@#$%^&*)"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["jobseeker", "recruiter"], {
      required_error: "Please select your role",
      invalid_type_error: "Role must be either Job Seeker or Employer",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms & Conditions to proceed",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
