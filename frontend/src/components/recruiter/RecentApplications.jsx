import React from "react";
import { Link } from "react-router-dom";
import { User, Eye, ArrowRight, Clock } from "lucide-react";
import StatusBadge from "../application/StatusBadge";
import StatusDropdown from "../application/StatusDropdown";
import { Button } from "../ui/button";

export function RecentApplications({ applications = [], onStatusChange, onViewDetails }) {
  if (applications.length === 0) {
    return (
      <div className="p-8 text-center bg-surface rounded-2xl border border-border">
        <Clock className="w-10 h-10 text-text-secondary mx-auto mb-3 opacity-40" />
        <h4 className="text-base font-bold text-text">No Recent Applications</h4>
        <p className="text-xs text-text-secondary mt-1">
          Applications submitted by candidates will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text">Recent Applications</h3>
          <p className="text-xs text-text-secondary">Candidates who applied recently across your jobs</p>
        </div>
        <Link to="/recruiter/applicants">
          <Button variant="ghost" className="h-9 text-xs font-semibold gap-1.5 text-primary hover:text-primary-hover">
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-medium border-collapse">
          <thead>
            <tr className="bg-section text-text-secondary border-b border-border uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-5">Candidate</th>
              <th className="py-3.5 px-5">Applied Job</th>
              <th className="py-3.5 px-5">Date</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {applications.slice(0, 5).map((app) => {
              const applicantName = app.applicant?.fullname || "Unknown Candidate";
              const applicantEmail = app.applicant?.email || "";
              const jobTitle = app.job?.title || "Job Listing";
              const appliedDate = app.createdAt
                ? new Date(app.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <tr key={app._id} className="hover:bg-section/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {applicantName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-text text-sm">{applicantName}</p>
                        <p className="text-[11px] text-text-secondary">{applicantEmail}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className="font-semibold text-text line-clamp-1">{jobTitle}</span>
                  </td>

                  <td className="py-3.5 px-5 text-text-secondary whitespace-nowrap">
                    {appliedDate}
                  </td>

                  <td className="py-3.5 px-5">
                    <StatusDropdown
                      applicationId={app._id}
                      currentStatus={app.status}
                      onStatusChange={onStatusChange}
                    />
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(app)}
                      className="h-8 px-3 text-xs font-semibold gap-1 rounded-xl"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentApplications;
