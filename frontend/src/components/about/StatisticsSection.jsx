import React from "react";
import { Briefcase, Building2, Users, CheckCircle2 } from "lucide-react";

const STATS = [
  {
    icon: Briefcase,
    label: "Active Jobs",
    value: "10,000+",
    subtitle: "Across tech, engineering & business",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Building2,
    label: "Companies",
    value: "2,500+",
    subtitle: "From innovative startups to Fortune 500",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Users,
    label: "Job Seekers",
    value: "50,000+",
    subtitle: "Skilled professionals actively applying",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CheckCircle2,
    label: "Success Rate",
    value: "98%",
    subtitle: "Satisfied candidates & employers",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export function StatisticsSection() {
  return (
    <section className="py-16 md:py-20 bg-section/70 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${stat.color} tracking-tight mb-2`}>
                    {stat.value}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-snug pt-2 border-t border-border/40">
                  {stat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
