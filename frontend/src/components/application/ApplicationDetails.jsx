import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  FileText,
  ExternalLink,
  Briefcase,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../ui/button";
import { StatusBadge } from "./StatusBadge";
import { StatusDropdown } from "./StatusDropdown";
import { Badge } from "../ui/badge";

export function ApplicationDetails({ application, isOpen, onClose, onStatusChange, isEmployer = false }) {
  if (!isOpen || !application) return null;

  const {
    _id,
    applicant,
    job,
    status = "pending",
    createdAt,
    updatedAt,
  } = application;

  const fullName = applicant?.fullname || "Candidate";
  const email = applicant?.email || "N/A";
  const phone = applicant?.phoneNumber || "N/A";
  const profilePhoto = applicant?.profile?.profilePhoto;
  const resumeUrl = applicant?.profile?.resume;
  const resumeName = applicant?.profile?.resumeOriginalName || "Resume.pdf";
  const bio = applicant?.profile?.bio;
  const skills = applicant?.profile?.skills || [];
  const candidateLocation = applicant?.profile?.location || "Not specified";

  const jobTitle = job?.title || "Job Listing";
  const jobDescription = job?.description || "No description provided.";
  const jobType = job?.jobType || "Full Time";
  const jobLocation = job?.location || "Remote";
  const jobSalary = job?.salary ? `$${job.salary.toLocaleString()}/yr` : "Competitive";
  const companyName = job?.company?.name || "Company";
  const companyLogo = job?.company?.logo;

  const formattedAppliedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently";

  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-surface border-l border-border shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-border bg-section flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">Application Details</h3>
                <p className="text-xs text-text-secondary">ID: {_id}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-border text-text-secondary hover:text-text hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Status & Actions Section */}
            <div className="p-4 bg-section/60 rounded-2xl border border-border flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-text-secondary block mb-1">
                  Current Status
                </span>
                <StatusBadge status={status} />
              </div>

              {isEmployer && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-secondary">Update:</span>
                  <StatusDropdown
                    applicationId={_id}
                    currentStatus={status}
                    onStatusChange={onStatusChange}
                  />
                </div>
              )}
            </div>

            {/* Candidate Overview */}
            <div className="bg-surface p-5 rounded-2xl border border-border space-y-4 shadow-xs">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border pb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                Applicant Information
              </h4>

              <div className="flex items-start space-x-4">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={fullName}
                    className="w-14 h-14 rounded-2xl object-cover border border-border shadow-xs"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-text">{fullName}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary font-medium">
                    <span className="flex items-center gap-1 text-text">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <a href={`mailto:${email}`} className="hover:underline">
                        {email}
                      </a>
                    </span>
                    {phone && phone !== "N/A" && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-text-secondary" />
                        {phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {candidateLocation}
                    </span>
                  </div>
                </div>
              </div>

              {bio && (
                <div className="pt-2 text-xs text-text-secondary leading-relaxed bg-section p-3 rounded-xl">
                  <span className="font-semibold text-text block mb-0.5">Bio:</span>
                  {bio}
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-text-secondary block mb-1.5">Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-section text-text border border-border/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume */}
              <div className="pt-2">
                <span className="text-xs font-bold text-text-secondary block mb-1.5">Resume</span>
                {resumeUrl ? (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-xs font-bold text-text group-hover:text-primary">
                        {resumeName}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </a>
                ) : (
                  <p className="text-xs text-text-secondary/70 italic">No resume attached by candidate.</p>
                )}
              </div>
            </div>

            {/* Job & Company Overview */}
            <div className="bg-surface p-5 rounded-2xl border border-border space-y-4 shadow-xs">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border pb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-primary" />
                Job Information
              </h4>

              <div className="flex items-center space-x-3.5">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt={companyName}
                    className="w-12 h-12 rounded-xl object-cover border border-border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    {companyName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-text-secondary uppercase flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    {companyName}
                  </h4>
                  <h3 className="text-base font-bold text-text">{jobTitle}</h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge type={jobType} />
                <span className="text-xs font-medium text-text-secondary px-2.5 py-1 bg-section rounded-full border border-border">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {jobLocation}
                </span>
                <span className="text-xs font-medium text-text-secondary px-2.5 py-1 bg-section rounded-full border border-border">
                  <DollarSign className="w-3.5 h-3.5 inline text-emerald-600" />
                  {jobSalary}
                </span>
              </div>

              {jobDescription && (
                <div className="text-xs text-text-secondary space-y-1 bg-section/40 p-3 rounded-xl border border-border/50">
                  <span className="font-semibold text-text block">Description:</span>
                  <p className="line-clamp-4 leading-relaxed">{jobDescription}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-surface p-5 rounded-2xl border border-border space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border pb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Application Activity Timeline
              </h4>

              <div className="space-y-3 pl-2 border-l-2 border-primary/20 pt-1">
                <div className="relative pl-4">
                  <div className="absolute -left-[17px] top-0.5 w-3 h-3 rounded-full bg-primary border-2 border-surface" />
                  <span className="text-xs font-bold text-text block">Applied for Job</span>
                  <span className="text-[11px] text-text-secondary">{formattedAppliedDate}</span>
                </div>
                {formattedUpdatedDate && formattedUpdatedDate !== formattedAppliedDate && (
                  <div className="relative pl-4">
                    <div className="absolute -left-[17px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface" />
                    <span className="text-xs font-bold text-text block">Status Updated to '{status}'</span>
                    <span className="text-[11px] text-text-secondary">{formattedUpdatedDate}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-border bg-section flex items-center justify-end">
            <Button variant="primary" onClick={onClose} className="h-10 px-5 text-xs font-semibold rounded-xl">
              Close Details
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
