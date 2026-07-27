import React from "react";

export function CompanyLogoCard({ name, logoIcon: LogoIcon, jobsCount }) {
  return (
    <div className="group relative flex flex-col items-center justify-center p-6 bg-surface rounded-2xl border border-border transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 hover:border-primary/40 cursor-pointer">
      <div className="h-12 w-32 flex items-center justify-center filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center space-x-2 text-text font-bold text-lg group-hover:text-primary transition-colors duration-300">
          <LogoIcon className="h-6 w-6 text-text-secondary group-hover:text-primary transition-colors duration-300" />
          <span>{name}</span>
        </div>
      </div>
      {jobsCount && (
        <span className="mt-2 text-xs font-medium text-text-secondary group-hover:text-primary/80 transition-colors">
          {jobsCount} open roles
        </span>
      )}
    </div>
  );
}
