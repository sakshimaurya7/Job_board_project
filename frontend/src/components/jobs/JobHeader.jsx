import React, { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Bookmark,
  Users,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { formatSalary, formatDate, formatExperience } from "../../utils/formatters";
import { toast } from "sonner";
import { getCompanyLogo } from "../../utils/imagePlaceholder";

export const JobHeader = ({ job, isApplied = false, applying = false, onApply }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!job?._id) return;
    try {
      const bookmarks = JSON.parse(localStorage.getItem("jobhub_bookmarks") || "[]");
      setBookmarked(bookmarks.includes(job._id));
    } catch (e) {
      setBookmarked(false);
    }
  }, [job?._id]);

  const toggleBookmark = () => {
    if (!job?._id) return;
    try {
      const bookmarks = JSON.parse(localStorage.getItem("jobhub_bookmarks") || "[]");
      let updated;
      if (bookmarks.includes(job._id)) {
        updated = bookmarks.filter((id) => id !== job._id);
        setBookmarked(false);
        toast.info("Removed from saved jobs");
      } else {
        updated = [...bookmarks, job._id];
        setBookmarked(true);
        toast.success("Job saved successfully!");
      }
      localStorage.setItem("jobhub_bookmarks", JSON.stringify(updated));
    } catch (e) {
      setBookmarked(!bookmarked);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: `Check out this ${job.title} job at ${job.company?.name || "JobSphere"}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Job link copied to clipboard!");
    }
  };

  const companyName = job.company?.name || "Company";
  const companyLogo = getCompanyLogo(job.company?.logo);
  const location = job.location || "Remote";
  const salaryText = formatSalary(job.salary);
  const experienceText = formatExperience(job.experienceLevel);
  const timeAgo = formatDate(job.createdAt);
  const applicantCount = job.applications?.length || 0;
  const jobType = job.jobType || "Full-time";

  return (
    <Card className="p-6 sm:p-8 bg-surface border border-border rounded-3xl shadow-soft mb-8 relative overflow-hidden">
      {/* Top Banner gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
        {/* Left Company Logo + Title + Details */}
        <div className="flex items-start gap-5">
          <Avatar src={companyLogo} fallback={companyName} size="xl" className="shrink-0" />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-primary">{companyName}</span>
              <span className="text-text-secondary text-xs">•</span>
              <span className="text-xs text-text-secondary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Posted {timeAgo}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Badge type={jobType}>{jobType}</Badge>

              {location.toLowerCase().includes("remote") && (
                <Badge type="Remote">Remote</Badge>
              )}

              <div className="flex items-center gap-1 text-xs text-text-secondary font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-text-secondary font-medium">
                <Users className="w-4 h-4 text-secondary shrink-0" />
                <span>{applicantCount} {applicantCount === 1 ? "Applicant" : "Applicants"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
          <button
            onClick={handleShare}
            type="button"
            className="p-3 rounded-2xl border border-border text-text-secondary hover:text-primary hover:bg-section transition-colors"
            title="Share Job"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={toggleBookmark}
            type="button"
            className={`p-3 rounded-2xl border transition-all duration-200 ${
              bookmarked
                ? "bg-primary/10 border-primary text-primary"
                : "border-border text-text-secondary hover:text-primary hover:bg-section"
            }`}
            title={bookmarked ? "Remove Bookmark" : "Bookmark Job"}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-primary" : ""}`} />
          </button>

          {isApplied ? (
            <Button
              disabled
              variant="secondary"
              className="h-12 px-8 text-sm gap-2 font-bold cursor-not-allowed bg-success/10 text-success border-success/30 opacity-90"
            >
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span>Applied</span>
            </Button>
          ) : (
            <Button
              onClick={onApply}
              disabled={applying}
              variant="primary"
              className="h-12 px-8 text-sm font-extrabold shadow-md min-w-[140px]"
            >
              {applying ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Apply Now"
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/60 bg-section/50 rounded-2xl p-4">
        <div>
          <span className="text-xs text-text-secondary block font-medium">Offered Salary</span>
          <span className="text-sm font-bold text-text flex items-center gap-1 mt-0.5">
            <DollarSign className="w-4 h-4 text-primary" />
            {salaryText}
          </span>
        </div>

        <div>
          <span className="text-xs text-text-secondary block font-medium">Experience Needed</span>
          <span className="text-sm font-bold text-text flex items-center gap-1 mt-0.5">
            <Briefcase className="w-4 h-4 text-secondary" />
            {experienceText}
          </span>
        </div>

        <div>
          <span className="text-xs text-text-secondary block font-medium">Job Category</span>
          <span className="text-sm font-bold text-text mt-0.5 block truncate">
            {job.category || "Technology"}
          </span>
        </div>

        <div>
          <span className="text-xs text-text-secondary block font-medium">Open Positions</span>
          <span className="text-sm font-bold text-text mt-0.5 block">
            {job.position || 1} Vacancy
          </span>
        </div>
      </div>
    </Card>
  );
};

export default JobHeader;
