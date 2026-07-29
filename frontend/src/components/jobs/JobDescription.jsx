import React from "react";
import { FileText, CheckCircle2, Award, HeartHandshake } from "lucide-react";
import { Card } from "../ui/card";

export const JobDescription = ({ job }) => {
  const requirements = job.requirements || [];

  return (
    <div className="space-y-8">
      {/* Main Overview */}
      <Card className="p-6 sm:p-8 bg-surface border border-border rounded-3xl shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-text">Job Description</h3>
        </div>

        <div className="prose max-w-none text-text-secondary text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
          {job.description}
        </div>
      </Card>

      {/* Requirements & Responsibilities */}
      {requirements.length > 0 && (
        <Card className="p-6 sm:p-8 bg-surface border border-border rounded-3xl shadow-soft">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-text">Key Requirements & Responsibilities</h3>
          </div>

          <ul className="space-y-3">
            {requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-text-secondary">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-normal">{req}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Perks & Benefits Section */}
      <Card className="p-6 sm:p-8 bg-surface border border-border rounded-3xl shadow-soft">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-text">Perks & Benefits</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-section/70 border border-border/80">
            <h4 className="text-sm font-bold text-text mb-1">🏥 Health & Wellness</h4>
            <p className="text-xs text-text-secondary">Comprehensive medical, dental, and health coverage.</p>
          </div>
          <div className="p-4 rounded-2xl bg-section/70 border border-border/80">
            <h4 className="text-sm font-bold text-text mb-1">💻 Flexible Work</h4>
            <p className="text-xs text-text-secondary">Remote work options and flexible operating hours.</p>
          </div>
          <div className="p-4 rounded-2xl bg-section/70 border border-border/80">
            <h4 className="text-sm font-bold text-text mb-1">📈 Paid Time Off</h4>
            <p className="text-xs text-text-secondary">Generous vacation days and paid national holidays.</p>
          </div>
          <div className="p-4 rounded-2xl bg-section/70 border border-border/80">
            <h4 className="text-sm font-bold text-text mb-1">🎓 Career Growth</h4>
            <p className="text-xs text-text-secondary">Learning stipend, mentorship, and conference allowances.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobDescription;
