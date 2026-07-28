import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Briefcase, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { loginSchema } from "../../validation/loginSchema";
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
import { Separator } from "../ui/separator";
import { PasswordInput } from "./PasswordInput";
import { RoleSelect } from "./RoleSelect";
import { SocialLoginButton } from "./SocialLoginButton";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "jobseeker",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage(null);
    try {
      const response = await login(data);
      if (response.success) {
        toast.success(response.message || "Logged in successfully!");
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to sign in. Please verify your credentials.");
      toast.error("Login failed");
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google Authentication will be connected in production backend!");
  };

  return (
    <div className="space-y-6">
      {/* Brand & Heading */}
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
          Welcome Back
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed">
          Please enter your credentials to access your job portal account.
        </p>
      </div>

      {/* Backend / Auth Error Alert */}
      {errorMessage && (
        <Alert variant="error" title="Authentication Error">
          {errorMessage}
        </Alert>
      )}

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Account Role</FormLabel>
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
                    autoFocus
                    autoComplete="email"
                    icon={Mail}
                    error={form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel required>Password</FormLabel>
                  <Link
                    to="/forgot-password"
                    tabIndex={0}
                    className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    error={form.formState.errors.password}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0 pt-1">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <label
                  htmlFor="rememberMe"
                  className="text-xs sm:text-sm font-medium text-text-secondary cursor-pointer select-none"
                >
                  Remember me on this device
                </label>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={loading || form.formState.isSubmitting}
            className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all"
          >
            {loading || form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <Separator>OR</Separator>

      {/* Social Google Login */}
      <SocialLoginButton
        label="Continue with Google"
        onClick={handleGoogleLogin}
      />

      {/* Footer Navigation Link */}
      <p className="text-center text-sm text-text-secondary pt-2">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
}
