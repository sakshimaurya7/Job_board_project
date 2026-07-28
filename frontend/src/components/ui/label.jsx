import * as React from "react";
import { cn } from "../../lib/utils";

const Label = React.forwardRef(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-semibold text-text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none flex items-center gap-1 mb-1.5",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-error font-bold">*</span>}
  </label>
));
Label.displayName = "Label";

export { Label };
