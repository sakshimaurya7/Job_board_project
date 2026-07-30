import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Briefcase, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { registerSchema } from "../../validation/registerSchema";
import { useAuth } from "../../hooks/useAuth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Alert } from "../ui/alert";
import { PasswordInput } from "./PasswordInput";
import { RoleSelect } from "./RoleSelect";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "jobseeker",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage(null);
    try {
      const response = await registerUser(data);
      if (response.success) {
        toast.success(
          response.message || "Account created successfully!"
        );
        const registeredRole = (data.role || "").toLowerCase();
        if (registeredRole === "recruiter" || registeredRole === "admin") {
          navigate("/company/setup");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setErrorMessage(
        err.message || "Registration failed. Please check your information."
      );
      toast.error("Registration error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="space-y-2 text-left">
        <div className="hidden lg:flex items-center space-x-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft">
            <Briefcase className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xl font-black text-text tracking-tight">
            Job<span className="text-primary">Hub</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
          Create Account
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed">
          Join thousands of job seekers and top employers today.
        </p>
      </div>

      {/* Backend Error Alert */}
      {errorMessage && (
        <Alert variant="error" title="Registration Failed">
          {errorMessage}
        </Alert>
      )}

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Select Role</FormLabel>
                <FormControl>
                  <RoleSelect
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.role}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="John Doe"
                    autoFocus
                    autoComplete="name"
                    icon={User}
                    error={form.formState.errors.fullname}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    icon={Mail}
                    error={form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    icon={Phone}
                    error={form.formState.errors.phoneNumber}
                    onChange={(e) => {
                      // Filter non-numeric characters for phone input
                      const val = e.target.value.replace(/\D/g, "");
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password with Strength Meter */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    showStrengthMeter
                    error={form.formState.errors.password}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    error={form.formState.errors.confirmPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms & Conditions Checkbox */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0 pt-2">
                <FormControl>
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-xs sm:text-sm font-medium text-text-secondary cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <a
                      href="#terms"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Terms & Conditions page");
                      }}
                      className="text-primary font-semibold hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Privacy Policy page");
                      }}
                      className="text-primary font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={loading || form.formState.isSubmitting}
            className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all mt-4"
          >
            {loading || form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </Form>

      {/* Footer Link */}
      <p className="text-center text-sm text-text-secondary pt-2">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
