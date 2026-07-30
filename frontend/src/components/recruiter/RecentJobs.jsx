import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Users, PlusCircle, ArrowRight, MapPin, Edit3 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function RecentJobs({ jobs = [] }) {
  const navigate = useNavigate();

  if (jobs.length === 0) {
    return (
      <div className="p-8 text-center bg-surface rounded-2xl border border-border">
        <Briefcase className="w-10 h-10 text-text-secondary mx-auto mb-3 opacity-40" />
        <h4 className="text-base font-bold text-text">No Jobs Posted Yet</h4>
        <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto mb-4">
          Post your first job opening to start receiving applications from top talent.
        </p>
        <Link to="/recruiter/jobs/create">
          <Button variant="primary" className="h-10 px-5 text-xs font-bold gap-2 rounded-xl">
            <PlusCircle className="w-4 h-4" />
            Post Your First Job
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text">Recently Posted Jobs</h3>
          <p className="text-xs text-text-secondary">Manage your latest active job openings</p>
        </div>
        <Link to="/recruiter/jobs">
          <Button variant="ghost" className="h-9 text-xs font-semibold gap-1.5 text-primary hover:text-primary-hover">
            Manage All
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <div className="divide-y divide-border/60">
        {jobs.slice(0, 5).map((job) => {
          const appCount = job.applications?.length || 0;
          const createdDate = job.createdAt
            ? new Date(job.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Recent";

          return (
            <div
              key={job._id}
              className="p-4 hover:bg-section/50 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}
                    className="text-sm font-bold text-text truncate hover:text-primary cursor-pointer transition-colors"
                  >
                    {job.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <Badge type={job.jobType || "Full-time"} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-xs font-bold text-text justify-end">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>{appCount} Applicants</span>
                  </div>
                  <span className="text-[10px] text-text-secondary">Posted {createdDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/recruiter/applicants?jobId=${job._id}`)}
                    className="h-8 px-3 text-xs font-semibold gap-1 rounded-xl"
                  >
                    <Users className="w-3.5 h-3.5 text-primary" />
                    Candidates
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}
                    className="h-8 w-8 p-0 rounded-xl"
                    title="Edit Job"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-text-secondary" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentJobs;
