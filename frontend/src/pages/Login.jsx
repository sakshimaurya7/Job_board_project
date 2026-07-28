import React from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { LoginForm } from "../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Please sign in to access your job portal account">
      <LoginForm />
    </AuthLayout>
  );
}
