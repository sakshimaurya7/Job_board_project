import React from "react";
import { cn } from "../../lib/utils";
import { Clock, Eye, Video, CheckCircle2, XCircle } from "lucide-react";

export function StatusBadge({ status, className }) {
  const normalized = (status || "pending").toLowerCase();

  let config = {
    label: "Pending",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80 ring-amber-500/10",
    dotClass: "bg-amber-500",
    icon: Clock,
  };

  if (normalized === "reviewed") {
    config = {
      label: "Reviewed",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80 ring-blue-500/10",
      dotClass: "bg-blue-500",
      icon: Eye,
    };
  } else if (normalized === "interview") {
    config = {
      label: "Interview Scheduled",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200/80 ring-purple-500/10",
      dotClass: "bg-purple-500",
      icon: Video,
    };
  } else if (normalized === "accepted" || normalized === "selected") {
    config = {
      label: "Selected",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-emerald-500/10",
      dotClass: "bg-emerald-500",
      icon: CheckCircle2,
    };
  } else if (normalized === "rejected") {
    config = {
      label: "Rejected",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80 ring-rose-500/10",
      dotClass: "bg-rose-500",
      icon: XCircle,
    };
  }

  const IconComponent = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ring-1 transition-all duration-200 select-none shadow-xs",
        config.badgeClass,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dotClass)} />
      <IconComponent className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
}

export default StatusBadge;
