import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Bookmark,
  ArrowUpRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { formatSalary, formatDate, formatExperience } from "../../utils/formatters";
import { getCompanyLogo } from "../../utils/imagePlaceholder";

export const JobCard = ({ job, isApplied = false, onApply }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem("jobhub_bookmarks") || "[]");
      setBookmarked(bookmarks.includes(job._id));
    } catch (e) {
      setBookmarked(false);
    }
  }, [job._id]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const bookmarks = JSON.parse(localStorage.getItem("jobhub_bookmarks") || "[]");
      let updated;
      if (bookmarks.includes(job._id)) {
        updated = bookmarks.filter((id) => id !== job._id);
        setBookmarked(false);
      } else {
        updated = [...bookmarks, job._id];
        setBookmarked(true);
      }
      localStorage.setItem("jobhub_bookmarks", JSON.stringify(updated));
    } catch (e) {
      setBookmarked(!bookmarked);
    }
  };

  const companyName = job.company?.name || "Company";
  const companyLogo = getCompanyLogo(job.company?.logo);
  const location = job.location || "Remote";
  const salaryText = formatSalary(job.salary);
  const experienceText = formatExperience(job.experienceLevel);
  const timeAgo = formatDate(job.createdAt);
  const jobType = job.jobType || "Full-time";

  return (
    <Card className="group relative flex flex-col justify-between p-6 h-full border border-border bg-surface hover:border-primary/40 transition-all duration-300">
      <div>
        {/* Top Header Row: Company Logo + Name & Bookmark */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <Avatar src={companyLogo} fallback={companyName} alt={companyName} size="md" />
            <div>
              <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors">
                {companyName}
              </h4>
              <div className="flex items-center text-xs text-text-secondary gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate max-w-[160px]">{location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={toggleBookmark}
            type="button"
            className={`p-2 rounded-xl border transition-all duration-200 ${
              bookmarked
                ? "bg-primary/10 border-primary text-primary"
                : "border-border text-text-secondary hover:text-primary hover:bg-section"
            }`}
            title={bookmarked ? "Remove Bookmark" : "Save Job"}
            aria-label="Bookmark job"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-primary" : ""}`} />
          </button>
        </div>

        {/* Title */}
        <Link to={`/jobs/${job._id}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-lg font-bold text-text leading-snug line-clamp-1 mb-2">
            {job.title}
          </h3>
        </Link>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge type={jobType}>{jobType}</Badge>

          {location.toLowerCase().includes("remote") && (
            <Badge type="Remote">Remote</Badge>
          )}

          {job.position && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-section text-text-secondary border border-border">
              <Users className="w-3 h-3 text-primary" />
              {job.position} {job.position === 1 ? "Opening" : "Openings"}
            </span>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-5">
          {job.description}
        </p>
      </div>

      <div>
        {/* Key Info Details: Salary, Exp, Posted Date */}
        <div className="grid grid-cols-2 gap-2 pt-4 mb-5 border-t border-border/60 text-xs text-text-secondary">
          <div className="flex items-center gap-1.5 font-medium text-text">
            <DollarSign className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{salaryText}</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="truncate">{experienceText}</span>
          </div>

          <div className="flex items-center gap-1.5 text-text-secondary col-span-2 mt-1">
            <Clock className="w-3.5 h-3.5 text-text-secondary shrink-0" />
            <span>Posted {timeAgo}</span>
          </div>
        </div>

        {/* Bottom Actions: View Details & Apply Now */}
        <div className="flex items-center gap-2">
          <Link to={`/jobs/${job._id}`} className="flex-1">
            <Button variant="outline" className="w-full h-10 text-xs gap-1.5 font-semibold">
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>

          {isApplied ? (
            <Button
              disabled
              variant="secondary"
              className="flex-1 h-10 text-xs gap-1.5 opacity-90 cursor-not-allowed bg-success/10 text-success border-success/30 font-bold"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Applied</span>
            </Button>
          ) : (
            <Button
              onClick={() => onApply && onApply(job)}
              variant="primary"
              className="flex-1 h-10 text-xs font-bold shadow-sm"
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
