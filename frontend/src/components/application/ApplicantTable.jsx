import React from "react";
import { ApplicantRow } from "./ApplicantRow";
import { StatusDropdown } from "./StatusDropdown";
import { Button } from "../ui/button";
import { Eye, FileText, ExternalLink, Calendar, Mail, Phone, Briefcase } from "lucide-react";

export function ApplicantTable({ applications = [], onStatusChange, onViewDetails }) {
  if (!applications || applications.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-surface border border-border rounded-2xl overflow-hidden shadow-soft-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-section border-b border-border text-xs font-bold text-text-secondary uppercase tracking-wider">
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Applied Job</th>
                <th className="py-3.5 px-4">Resume / Skills</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {applications.map((app) => (
                <ApplicantRow
                  key={app._id}
                  application={app}
                  onStatusChange={onStatusChange}
                  onViewDetails={onViewDetails}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="lg:hidden space-y-4">
        {applications.map((app) => {
          const fullName = app.applicant?.fullname || "Candidate";
          const email = app.applicant?.email || "N/A";
          const phone = app.applicant?.phoneNumber || "N/A";
          const profilePhoto = app.applicant?.profile?.profilePhoto;
          const resumeUrl = app.applicant?.profile?.resume;
          const jobTitle = app.job?.title || "Applied Job";
          const companyName = app.job?.company?.name || "Company";
          const formattedDate = app.createdAt
            ? new Date(app.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recently";

          return (
            <div
              key={app._id}
              className="bg-surface p-5 rounded-2xl border border-border space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={fullName}
                      className="w-12 h-12 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-base font-bold text-text">{fullName}</h4>
                    <span className="text-xs font-semibold text-text-secondary flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-primary" />
                      {jobTitle} ({companyName})
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary bg-section/50 p-3 rounded-xl border border-border/50">
                <div className="flex items-center space-x-1.5 text-text">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate">{email}</span>
                </div>
                {phone && phone !== "N/A" && (
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-text-secondary" />
                    <span>{phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Applied {formattedDate}</span>
                </div>
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary font-bold hover:underline space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Resume</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <StatusDropdown
                  applicationId={app._id}
                  currentStatus={app.status}
                  onStatusChange={onStatusChange}
                />
                <Button
                  variant="outline"
                  onClick={() => onViewDetails && onViewDetails(app)}
                  className="h-9 px-3.5 text-xs font-semibold rounded-xl gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  Review Profile
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApplicantTable;
