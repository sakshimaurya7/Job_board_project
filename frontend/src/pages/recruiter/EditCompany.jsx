import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { recruiterService } from "../../services/recruiterService";
import CompanyForm from "../../components/recruiter/CompanyForm";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";
import { Button } from "../../components/ui/button";

export function EditCompany() {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompany = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recruiterService.getMyCompany();
      if (res.success && res.companies && res.companies.length > 0) {
        setCompany(res.companies[0]);
      } else {
        setError("Company profile not found.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load company profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleSubmit = async (formData) => {
    if (!company?._id) return;
    setSaving(true);
    setError(null);
    try {
      const res = await recruiterService.updateCompany(company._id, formData);
      if (res.success) {
        toast.success("Company profile updated successfully!");
        navigate("/recruiter/company");
      } else {
        setError(res.message || "Failed to update company.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error updating company.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (error && !company) {
    return (
      <EmptyState
        title="Company Not Found"
        description={error}
        actionText="Back to Company Profile"
        onAction={() => navigate("/recruiter/company")}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-surface p-6 rounded-2xl border border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/recruiter/company")}
            className="h-10 w-10 p-0 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </Button>
          <div>
            <h1 className="text-2xl font-black text-text">Edit Company Profile</h1>
            <p className="text-xs text-text-secondary">
              Update organization information, logo, banner, and benefits
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Pre-populated Form */}
      <CompanyForm
        initialValues={company}
        onSubmit={handleSubmit}
        loading={saving}
        isSetup={false}
      />
    </div>
  );
}

export default EditCompany;
