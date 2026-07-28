import * as React from "react";
import { cn } from "../../lib/utils";

const Separator = React.forwardRef(({ className, children, ...props }, ref) => {
  if (children) {
    return (
      <div className={cn("relative flex items-center justify-center my-6", className)} ref={ref} {...props}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-surface px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {children}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("shrink-0 bg-border h-[1px] w-full my-6", className)}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };
