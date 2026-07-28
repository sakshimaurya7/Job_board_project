import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const Select = React.forwardRef(({ className, children, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-xl border border-border bg-surface px-4 py-2 text-base text-text transition-all duration-300 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer pr-10",
          Icon && "pl-11",
          error && "border-error focus-visible:border-error focus-visible:ring-error/20",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
        <ChevronDown className="w-5 h-5 opacity-70" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export { Select };
