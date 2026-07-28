import React from "react";
import { UserCheck, Building2, Briefcase } from "lucide-react";
import { Select } from "../ui/select";
import { cn } from "../../lib/utils";

export const RoleSelect = React.forwardRef(
  ({ value, onChange, error, variant = "cards", ...props }, ref) => {
    if (variant === "dropdown") {
      return (
        <Select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          icon={Briefcase}
          error={error}
          {...props}
        >
          <option value="">Select account role...</option>
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Employer</option>
        </Select>
      );
    }

    const roles = [
      {
        id: "jobseeker",
        title: "Job Seeker",
        description: "Apply to top jobs & build candidate profile",
        icon: UserCheck,
      },
      {
        id: "recruiter",
        title: "Employer",
        description: "Post job openings & hire top talent",
        icon: Building2,
      },
    ];

    return (
      <div className="w-full space-y-2">
        <div className="grid grid-cols-2 gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = value === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => onChange(role.id)}
                className={cn(
                  "flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isSelected
                    ? "border-primary bg-section shadow-soft"
                    : "border-border bg-surface hover:border-primary/50 hover:bg-section/50"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors",
                    isSelected ? "bg-primary text-white" : "bg-section text-text-secondary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-text block">{role.title}</span>
                <span className="text-[11px] text-text-secondary leading-tight mt-0.5 block">
                  {role.description}
                </span>
                {isSelected && (
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

RoleSelect.displayName = "RoleSelect";
