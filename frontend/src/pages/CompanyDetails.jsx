import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import CompanyHeader from "../components/company/CompanyHeader";
import CompanyOverview from "../components/company/CompanyOverview";
import CompanyStatistics from "../components/company/CompanyStatistics";
import CompanyBenefits from "../components/company/CompanyBenefits";
import CompanyJobs from "../components/company/CompanyJobs";
import CompanySocialLinks from "../components/company/CompanySocialLinks";
import CompanyContact from "../components/company/CompanyContact";
import SimilarCompanies from "../components/company/SimilarCompanies";
import CompanyErrorState from "../components/company/CompanyErrorState";
import { CompanyDetailsSkeleton } from "../components/company/CompanySkeleton";
import companyService from "../services/companyService";

export default function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await companyService.getCompanyById(id);
      if (data?.success && data?.company) {
        setCompany(data.company);
      } else {
        setError(data?.message || "Company profile not found.");
      }
    } catch (err) {
      console.error("Error fetching company details:", err);
      setError(
        err.response?.data?.message || "Failed to load company details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  if (loading) {
    return <CompanyDetailsSkeleton />;
  }

  if (error || !company) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <CompanyErrorState message={error} onRetry={fetchCompanyDetails} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-6">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Companies</span>
          </Link>
        </div>

        {/* 1. Header Section */}
        <CompanyHeader company={company} />

        {/* 2. Key Statistics Grid */}
        <CompanyStatistics company={company} />

        {/* 3. Main Content: Overview & Perks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-8 space-y-8">
            {/* About Company, Mission, Vision */}
            <CompanyOverview company={company} />

            {/* Benefits & Perks */}
            <CompanyBenefits company={company} />
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Contact & Address Information */}
            <CompanyContact company={company} />

            {/* Social Media Links */}
            <CompanySocialLinks company={company} />
          </div>
        </div>

        {/* 4. Open Positions (Most Important Section) */}
        <CompanyJobs companyName={company.name} jobs={company.jobs || []} />

        {/* 5. Similar Companies */}
        <SimilarCompanies
          currentCompanyId={company._id}
          industry={company.industry}
          location={company.location}
        />
      </div>
    </div>
  );
}
