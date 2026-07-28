import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-border bg-surface px-4 py-2 text-base text-text placeholder:text-text-placeholder transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-11",
          error && "border-error focus-visible:border-error focus-visible:ring-error/20",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
