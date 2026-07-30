import React from "react";
import { Briefcase, Clock, Eye, Video, CheckCircle2, XCircle } from "lucide-react";

export function ApplicationStats({ stats, activeFilter, onSelectFilter, isEmployer = false }) {
  const cards = [
    {
      id: "all",
      label: isEmployer ? "Total Applicants" : "Total Applications",
      count: stats?.total || 0,
      icon: Briefcase,
      color: "from-primary/10 to-primary/5 text-primary border-primary/20",
      activeBorder: "border-primary ring-2 ring-primary/20",
    },
    {
      id: "pending",
      label: "Pending",
      count: stats?.pending || 0,
      icon: Clock,
      color: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-200",
      activeBorder: "border-amber-500 ring-2 ring-amber-500/20",
    },
    {
      id: "reviewed",
      label: "Reviewed",
      count: stats?.reviewed || 0,
      icon: Eye,
      color: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-200",
      activeBorder: "border-blue-500 ring-2 ring-blue-500/20",
    },
    {
      id: "interview",
      label: "Interview",
      count: stats?.interview || 0,
      icon: Video,
      color: "from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-200",
      activeBorder: "border-purple-500 ring-2 ring-purple-500/20",
    },
    {
      id: "selected",
      label: "Selected",
      count: stats?.selected || 0,
      icon: CheckCircle2,
      color: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-200",
      activeBorder: "border-emerald-500 ring-2 ring-emerald-500/20",
    },
    {
      id: "rejected",
      label: "Rejected",
      count: stats?.rejected || 0,
      icon: XCircle,
      color: "from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-200",
      activeBorder: "border-rose-500 ring-2 ring-rose-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter && onSelectFilter(card.id)}
            className={`flex flex-col justify-between p-4 rounded-2xl border bg-surface transition-all duration-200 text-left hover:shadow-md cursor-pointer ${
              isActive ? card.activeBorder : "border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-text-secondary truncate">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-text tracking-tight">
                {card.count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ApplicationStats;
