import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { jobService } from "../services/jobService";
import { useAuth } from "../hooks/useAuth";
import JobHeader from "../components/jobs/JobHeader";
import JobDescription from "../components/jobs/JobDescription";
import SkillsSection from "../components/jobs/SkillsSection";
import CompanyCard from "../components/jobs/CompanyCard";
import RecruiterCard from "../components/jobs/RecruiterCard";
import SimilarJobs from "../components/jobs/SimilarJobs";
import { JobDetailsSkeleton } from "../components/jobs/LoadingSkeleton";
import ErrorState from "../components/jobs/ErrorState";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch Job Details by ID
      const data = await jobService.getJobById(id);
      if (data.success && data.job) {
        setJob(data.job);
      } else {
        setError(data.message || "Job listing not found.");
      }

      // Fetch all jobs for SimilarJobs recommendations
      try {
        const allJobsData = await jobService.getAllJobs();
        if (allJobsData.success) {
          setAllJobs(allJobsData.jobs || []);
        }
      } catch (e) {
        console.warn("Could not fetch all jobs for similar recommendations.");
      }

      // Check if current user has applied
      if (isAuthenticated && user?.role === "jobseeker") {
        try {
          const appliedData = await jobService.getAppliedJobs();
          if (appliedData.success && appliedData.applications) {
            const ids = appliedData.applications.map((app) =>
              typeof app.job === "object" ? app.job._id : app.job
            );
            setAppliedJobIds(ids);
            setIsApplied(ids.includes(id));
          }
        } catch (e) {
          console.warn("Could not fetch applied jobs list.");
        }
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
      setError(err.response?.data?.message || "Job listing not found or unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, isAuthenticated, user?.role]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for this job.", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }

    if (user?.role !== "jobseeker") {
      toast.error("Recruiters cannot apply for jobs. Please switch to a candidate account.");
      return;
    }

    setApplying(true);
    try {
      const response = await jobService.applyJob(id);
      if (response.success) {
        toast.success(`Application submitted successfully for ${job.title}!`);
        setIsApplied(true);
        setAppliedJobIds((prev) => [...prev, id]);
      } else {
        toast.error(response.message || "Failed to submit application.");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to submit application.";
      if (errMsg.toLowerCase().includes("already applied")) {
        toast.error("You have already applied for this job.");
        setIsApplied(true);
      } else {
        toast.error(errMsg);
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <JobDetailsSkeleton />;
  }

  if (error || !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </Link>
        <ErrorState message={error || "Job not found"} onRetry={fetchJobData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Jobs</span>
          </Link>
        </div>

        {/* Job Header */}
        <JobHeader
          job={job}
          isApplied={isApplied}
          applying={applying}
          onApply={handleApply}
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Breakdown */}
          <div className="lg:col-span-2 space-y-8">
            <JobDescription job={job} />
            <SkillsSection skills={job.requirements} />
          </div>

          {/* Sidebar Company & Recruiter Overview */}
          <div className="space-y-6">
            <CompanyCard company={job.company} />
            <RecruiterCard recruiter={job.created_by} companyName={job.company?.name} />
          </div>
        </div>

        {/* Similar Jobs Section */}
        <SimilarJobs
          jobs={allJobs}
          currentJobId={job._id}
          appliedJobIds={appliedJobIds}
          onApplyJob={(similarJob) => navigate(`/jobs/${similarJob._id}`)}
        />
      </div>

      {/* Sticky Mobile Apply Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border p-4 shadow-2xl backdrop-blur-md bg-surface/95 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-text truncate max-w-[180px]">
            {job.title}
          </h4>
          <span className="text-[11px] text-text-secondary">
            {job.company?.name || "JobSphere"}
          </span>
        </div>

        {isApplied ? (
          <Button
            disabled
            variant="secondary"
            className="h-10 px-6 text-xs gap-1.5 font-bold cursor-not-allowed bg-success/10 text-success border-success/30"
          >
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>Applied</span>
          </Button>
        ) : (
          <Button
            onClick={handleApply}
            disabled={applying}
            variant="primary"
            className="h-10 px-6 text-xs font-bold shadow-md"
          >
            {applying ? "Submitting..." : "Apply Now"}
          </Button>
        )}
      </div>
    </div>
  );
}
