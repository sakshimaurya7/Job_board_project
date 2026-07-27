import React from "react";
import { Briefcase, Building2, Users } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Briefcase,
      count: "15K+",
      label: "Job Openings",
    },
    {
      icon: Building2,
      count: "2K+",
      label: "Companies",
    },
    {
      icon: Users,
      count: "25K+",
      label: "Active Users",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="flex items-center space-x-3.5 p-4 rounded-2xl bg-surface border border-border/80 shadow-soft-sm transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-section flex items-center justify-center text-primary shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-text leading-none mb-1">
                {stat.count}
              </h4>
              <p className="text-xs font-semibold text-text-secondary">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
