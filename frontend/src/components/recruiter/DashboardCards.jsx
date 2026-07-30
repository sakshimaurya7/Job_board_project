import React from "react";
import { Briefcase, CheckCircle2, Clock, Users, Video, UserCheck, XCircle } from "lucide-react";

export function DashboardCards({ stats = {}, activeFilter, onSelectFilter }) {
  const cards = [
    {
      id: "total_jobs",
      title: "Total Jobs",
      count: stats.totalJobs || 0,
      subText: `${stats.activeJobs || 0} active, ${stats.closedJobs || 0} filled`,
      icon: Briefcase,
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
      accent: "from-blue-500 to-indigo-600",
    },
    {
      id: "total_applicants",
      title: "Total Applicants",
      count: stats.totalApplicants || 0,
      subText: "Across all active listings",
      icon: Users,
      color: "bg-orange-500/10 text-primary border-orange-200",
      accent: "from-orange-500 to-amber-600",
      filterKey: "all",
    },
    {
      id: "pending",
      title: "Pending Review",
      count: stats.pending || 0,
      subText: "Awaiting candidate evaluation",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
      accent: "from-amber-500 to-yellow-600",
      filterKey: "pending",
    },
    {
      id: "interview",
      title: "Interviews Scheduled",
      count: stats.interview || 0,
      subText: "Candidates in pipeline",
      icon: Video,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      accent: "from-purple-500 to-violet-600",
      filterKey: "interview",
    },
    {
      id: "selected",
      title: "Selected Candidates",
      count: stats.selected || 0,
      subText: "Accepted & offered positions",
      icon: UserCheck,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      accent: "from-emerald-500 to-teal-600",
      filterKey: "selected",
    },
    {
      id: "rejected",
      title: "Rejected",
      count: stats.rejected || 0,
      subText: "Not matching requirements",
      icon: XCircle,
      color: "bg-rose-500/10 text-rose-600 border-rose-200",
      accent: "from-rose-500 to-red-600",
      filterKey: "rejected",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeFilter && card.filterKey === activeFilter;

        return (
          <div
            key={card.id}
            onClick={() => card.filterKey && onSelectFilter && onSelectFilter(card.filterKey)}
            className={`relative group p-5 bg-surface rounded-2xl border transition-all duration-300 ${
              card.filterKey ? "cursor-pointer hover:-translate-y-1 hover:shadow-soft-lg" : ""
            } ${
              isSelected
                ? "border-primary ring-2 ring-primary/20 shadow-md bg-section"
                : "border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  {card.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-text mt-1 group-hover:text-primary transition-colors">
                  {card.count.toLocaleString()}
                </h3>
              </div>
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold transition-transform group-hover:scale-110 ${card.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>

            <p className="text-xs text-text-secondary mt-3 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {card.subText}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCards;
