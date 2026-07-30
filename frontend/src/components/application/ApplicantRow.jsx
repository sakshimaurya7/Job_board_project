import React from "react";
import { User, Mail, Phone, FileText, ExternalLink, Calendar, Eye, Briefcase } from "lucide-react";
import { Button } from "../ui/button";
import { StatusDropdown } from "./StatusDropdown";

export function ApplicantRow({ application, onStatusChange, onViewDetails }) {
  if (!application) return null;

  const {
    _id,
    applicant,
    job,
    status = "pending",
    createdAt,
  } = application;

  const fullName = applicant?.fullname || "Candidate";
  const email = applicant?.email || "N/A";
  const phone = applicant?.phoneNumber || "N/A";
  const profilePhoto = applicant?.profile?.profilePhoto;
  const resumeUrl = applicant?.profile?.resume;
  const resumeOriginalName = applicant?.profile?.resumeOriginalName || "Resume.pdf";
  const skills = applicant?.profile?.skills || [];
  const location = applicant?.profile?.location;

  const jobTitle = job?.title || "Applied Job";
  const companyName = job?.company?.name || "Company";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <tr className="border-b border-border/60 hover:bg-section/50 transition-colors duration-150 group">
      {/* Candidate Info */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={fullName}
              className="w-10 h-10 rounded-full object-cover border border-border shadow-xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors">
              {fullName}
            </h4>
            {location && (
              <span className="text-xs text-text-secondary font-medium">{location}</span>
            )}
          </div>
        </div>
      </td>

      {/* Contact Info */}
      <td className="py-4 px-4 text-xs font-medium text-text-secondary">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1.5 text-text">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <a href={`mailto:${email}`} className="hover:underline truncate max-w-[180px]">
              {email}
            </a>
          </div>
          {phone && phone !== "N/A" && (
            <div className="flex items-center space-x-1.5 text-text-secondary">
              <Phone className="w-3.5 h-3.5 text-text-secondary" />
              <span>{phone}</span>
            </div>
          )}
        </div>
      </td>

      {/* Applied Job & Company */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-text line-clamp-1">{jobTitle}</span>
          <span className="text-xs font-semibold text-text-secondary flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-primary" />
            {companyName}
          </span>
        </div>
      </td>

      {/* Skills / Resume */}
      <td className="py-4 px-4">
        <div className="flex flex-col space-y-1.5">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1 bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/20 w-fit"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          ) : (
            <span className="text-xs text-text-secondary/70 italic">No resume attached</span>
          )}

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {skills.slice(0, 2).map((sk, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-section border border-border px-1.5 py-0.5 rounded text-text-secondary font-medium truncate"
                >
                  {sk}
                </span>
              ))}
              {skills.length > 2 && (
                <span className="text-[10px] text-text-secondary font-bold">
                  +{skills.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </td>

      {/* Applied Date */}
      <td className="py-4 px-4 text-xs font-medium text-text-secondary whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{formattedDate}</span>
        </div>
      </td>

      {/* Status Management */}
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusDropdown
          applicationId={_id}
          currentStatus={status}
          onStatusChange={onStatusChange}
        />
      </td>

      {/* Quick Actions */}
      <td className="py-4 px-4 text-right whitespace-nowrap">
        <Button
          variant="outline"
          onClick={() => onViewDetails && onViewDetails(application)}
          className="h-9 px-3 text-xs font-semibold rounded-xl gap-1"
        >
          <Eye className="w-3.5 h-3.5 text-primary" />
          Review
        </Button>
      </td>
    </tr>
  );
}

export default ApplicantRow;
