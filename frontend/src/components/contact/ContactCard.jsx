import React from "react";
import { cn } from "../../lib/utils";

/**
 * ContactCard — reusable info card atom for the ContactInfo section.
 *
 * Props:
 *  icon      — Lucide icon component
 *  title     — card title string
 *  value     — primary display value (string or JSX)
 *  subtitle  — optional secondary line (string or JSX)
 *  className — additional Tailwind classes
 */
const ContactCard = React.memo(({ icon: Icon, title, value, subtitle, className }) => {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-primary/40",
        className
      )}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-section border border-border text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary shadow-soft-sm">
        {Icon && <Icon className="h-5 w-5" />}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
          {title}
        </p>
        <p className="text-base font-bold text-text leading-snug">{value}</p>
        {subtitle && (
          <p className="text-sm text-text-secondary leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
});

ContactCard.displayName = "ContactCard";

export { ContactCard };
