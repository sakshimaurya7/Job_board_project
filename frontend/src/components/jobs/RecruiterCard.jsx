import React from "react";
import { UserCheck, Mail, MessageSquare } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const RecruiterCard = ({ recruiter, companyName }) => {
  if (!recruiter) return null;

  const name = recruiter.fullname || "Hiring Recruiter";
  const email = recruiter.email;
  const role = recruiter.role === "recruiter" ? "Talent Acquisition Specialist" : "Hiring Manager";

  const handleContact = () => {
    if (email) {
      window.location.href = `mailto:${email}?subject=Inquiry regarding Job Listing at ${companyName || "JobSphere"}`;
    } else {
      toast.info("Direct messaging will be available in the upcoming candidate messaging release!");
    }
  };

  return (
    <Card className="p-6 bg-surface border border-border rounded-3xl shadow-soft">
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <UserCheck className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-text">Posted By</h3>
      </div>

      <div className="flex items-center gap-3.5 mb-4">
        <Avatar src={recruiter.profile?.profilePhoto} fallback={name} size="lg" />
        <div>
          <h4 className="text-base font-bold text-text">{name}</h4>
          <span className="text-xs text-text-secondary font-medium block">{role}</span>
        </div>
      </div>

      {email && (
        <div className="flex items-center gap-2 text-xs text-text-secondary bg-section p-3 rounded-2xl border border-border/60 mb-4">
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{email}</span>
        </div>
      )}

      <Button
        variant="outline"
        onClick={handleContact}
        className="w-full h-10 text-xs font-bold gap-2 border-border hover:bg-section"
      >
        <MessageSquare className="w-4 h-4 text-primary" />
        <span>Contact Recruiter</span>
      </Button>
    </Card>
  );
};

export default RecruiterCard;
