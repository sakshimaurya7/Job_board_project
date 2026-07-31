import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { formatSalary } from "../../utils/formatters";
import { getCompanyLogo } from "../../utils/imagePlaceholder";

export const FeaturedJobs = ({ jobs = [] }) => {
  if (!jobs || jobs.length === 0) return null;

  // Take top 3 highest salary or latest jobs
  const featuredList = jobs.slice(0, 3);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Sparkles className="w-5 h-5 fill-primary/20" />
        </div>
        <h2 className="text-xl font-extrabold text-text">Featured Positions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featuredList.map((job) => {
          const companyName = job.company?.name || "Company";
          const companyLogo = getCompanyLogo(job.company?.logo);
          const salaryText = formatSalary(job.salary);

          return (
            <Card
              key={`featured-${job._id}`}
              className="p-5 border border-accent/40 bg-gradient-to-br from-surface via-section/50 to-surface hover:border-primary transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-bl-xl shadow-xs">
                Featured
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Avatar src={companyLogo} fallback={companyName} size="md" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-text-secondary truncate">{companyName}</h4>
                  <h3 className="text-base font-bold text-text truncate group-hover:text-primary">
                    {job.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate max-w-[120px]">{job.location || "Remote"}</span>
                </div>
                <span className="font-bold text-primary">{salaryText}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <Badge type={job.jobType || "Full-time"}>{job.jobType || "Full-time"}</Badge>
                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedJobs;
