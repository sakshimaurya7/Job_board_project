import React from "react";
import { Users, Calendar, Briefcase, Building2, MapPin, FileCheck } from "lucide-react";
import { Card } from "../ui/card";

export const CompanyStatistics = ({ company }) => {
  const {
    location = "Remote",
    industry = "Technology",
    companySize = "50-200",
    size,
    foundedYear = "2020",
    jobs = [],
    applicationsCount = 142,
  } = company;

  const openJobsCount = Array.isArray(jobs) ? jobs.length : 0;
  const displaySize = size || companySize;

  const stats = [
    {
      id: "employees",
      label: "Employees",
      value: `${displaySize}`,
      sub: "Global workforce",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      id: "founded",
      label: "Founded",
      value: `${foundedYear}`,
      sub: "Established year",
      icon: Calendar,
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/20",
    },
    {
      id: "positions",
      label: "Open Positions",
      value: `${openJobsCount}`,
      sub: "Currently hiring",
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      id: "industry",
      label: "Industry",
      value: industry,
      sub: "Primary sector",
      icon: Building2,
      color: "text-text",
      bg: "bg-section",
      border: "border-border",
    },
    {
      id: "hq",
      label: "Headquarters",
      value: location,
      sub: "Main office",
      icon: MapPin,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      id: "applications",
      label: "Total Applications",
      value: `${applicationsCount}+`,
      sub: "Received via JobHub",
      icon: FileCheck,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-extrabold text-text mb-4">Company Overview & Stats</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="p-4 bg-surface border border-border rounded-2xl shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-base font-extrabold text-text truncate">{item.value}</p>
                <p className="text-xs font-bold text-text-secondary truncate mt-0.5">{item.label}</p>
                <p className="text-[10px] text-text-secondary/80 truncate mt-0.5">{item.sub}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyStatistics;
