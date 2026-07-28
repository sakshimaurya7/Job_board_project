import React from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { RegisterForm } from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of job seekers and top employers"
      isRegister
    >
      <RegisterForm />
    </AuthLayout>
  );
}
