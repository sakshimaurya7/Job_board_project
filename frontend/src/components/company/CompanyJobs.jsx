import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Frown, Sparkles } from "lucide-react";
import { JobCard } from "../jobs/JobCard";
import { Card } from "../ui/card";
import { useAuth } from "../../hooks/useAuth";
import jobService from "../../services/jobService";
import { toast } from "sonner";

export const CompanyJobs = ({ companyName, jobs = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [applyingJobId, setApplyingJobId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      jobService
        .getAppliedJobs()
        .then((res) => {
          const applications = res.applications || res.data || [];
          const ids = applications.map((app) =>
            typeof app.job === "object" ? app.job._id : app.job
          );
          setAppliedJobIds(new Set(ids));
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleApply = async (job) => {
    if (!isAuthenticated) {
      toast.info("Please login to apply for positions.");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (user?.role === "recruiter" || user?.role === "admin") {
      toast.error("Recruiters and admins cannot apply for jobs.");
      return;
    }

    setApplyingJobId(job._id);
    try {
      const res = await jobService.applyJob(job._id);
      if (res.success) {
        toast.success(res.message || `Successfully applied for ${job.title}!`);
        setAppliedJobIds((prev) => new Set([...prev, job._id]));
      } else {
        toast.error(res.message || "Failed to apply.");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to submit application.";
      toast.error(errMsg);
      if (errMsg.toLowerCase().includes("already applied")) {
        setAppliedJobIds((prev) => new Set([...prev, job._id]));
      }
    } finally {
      setApplyingJobId(null);
    }
  };

  if (!jobs || jobs.length === 0) {
    return (
      <Card className="p-8 sm:p-12 text-center bg-surface border border-border rounded-3xl shadow-soft mb-8">
        <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center text-text-secondary mx-auto mb-4 border border-border">
          <Frown className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-text mb-2">No Openings Currently Available</h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          {companyName} is not actively listing new positions right now. Check back soon or set up a job alert.
        </p>
      </Card>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-text flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <span>Open Positions</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Explore and apply for active career opportunities at {companyName}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          {jobs.length} {jobs.length === 1 ? "Position Available" : "Positions Available"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          // Normalize company details into job object for JobCard
          const jobWithCompany = {
            ...job,
            company: job.company || { name: companyName },
          };

          return (
            <JobCard
              key={job._id}
              job={jobWithCompany}
              isApplied={appliedJobIds.has(job._id)}
              onApply={handleApply}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CompanyJobs;
