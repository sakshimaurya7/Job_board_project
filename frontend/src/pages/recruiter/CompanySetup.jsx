import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { recruiterService } from "../../services/recruiterService";
import CompanyForm from "../../components/recruiter/CompanyForm";

export function CompanySetup() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await recruiterService.registerCompany(formData);
      if (res.success && res.company) {
        toast.success("Company profile created successfully! Welcome to your ATS portal.");
        // Update user state locally with linked company ID
        updateUser((prev) => ({
          ...prev,
          profile: {
            ...prev?.profile,
            company: res.company._id,
          },
        }));
        navigate("/recruiter/dashboard", { replace: true });
      } else {
        setError(res.message || "Failed to create company profile.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error creating company profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 1 of 1 • One-Time Employer Setup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
            Setup Your Company Profile
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
            Before posting jobs and reviewing candidates, please complete your organization details. This information will be displayed on all your job listings.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Setup Form */}
        <CompanyForm
          onSubmit={handleSubmit}
          loading={loading}
          isSetup={true}
          initialValues={{
            name: user?.fullname ? `${user.fullname}'s Organization` : "",
            email: user?.email || "",
          }}
        />
      </div>
    </div>
  );
}

export default CompanySetup;
