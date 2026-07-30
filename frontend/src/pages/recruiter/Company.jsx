import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recruiterService } from "../../services/recruiterService";
import CompanyOverview from "../../components/recruiter/CompanyOverview";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";

export function Company() {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompany = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recruiterService.getMyCompany();
      if (res.success && res.companies && res.companies.length > 0) {
        setCompany(res.companies[0]);
      } else {
        setError("No company profile found for your account.");
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

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !company) {
    return (
      <EmptyState
        title="Company Profile Not Setup"
        description="You have not created a company profile yet. Set up your organization to post jobs."
        actionText="Setup Company Profile"
        onAction={() => navigate("/company/setup")}
      />
    );
  }

  return (
    <CompanyOverview
      company={company}
      onEditClick={() => navigate("/recruiter/company/edit")}
    />
  );
}

export default Company;
