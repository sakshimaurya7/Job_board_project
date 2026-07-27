import * as React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(
  ({ className, variant = "default", children, type, ...props }, ref) => {
    // Determine variant based on type string if provided (e.g. "Remote", "Full Time", etc.)
    let resolvedVariant = variant;
    if (type) {
      const lower = type.toLowerCase().replace(/[\s-]/g, "");
      if (lower.includes("remote")) resolvedVariant = "remote";
      else if (lower.includes("full")) resolvedVariant = "fulltime";
      else if (lower.includes("part")) resolvedVariant = "parttime";
      else if (lower.includes("intern")) resolvedVariant = "internship";
    }

    const variants = {
      default: "bg-section text-text border border-border",
      remote: "bg-[#DCFCE7] text-[#15803D] font-medium border-0",
      fulltime: "bg-[#FFEDD5] text-[#EA580C] font-medium border-0",
      parttime: "bg-[#FEF3C7] text-[#B45309] font-medium border-0",
      internship: "bg-[#DBEAFE] text-[#1D4ED8] font-medium border-0",
      primary: "bg-primary/10 text-primary border border-primary/20",
      outline: "border border-border text-text-secondary bg-surface",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 select-none",
          variants[resolvedVariant] || variants.default,
          className
        )}
        {...props}
      >
        {children || type}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
