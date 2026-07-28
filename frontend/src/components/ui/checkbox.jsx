import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef(({ className, checked, onChange, disabled, id, ...props }, ref) => {
  const handleChange = (e) => {
    if (disabled) return;
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        ref={ref}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only peer"
        {...props}
      />
      <div
        onClick={() => !disabled && onChange && onChange(!checked)}
        tabIndex={0}
        role="checkbox"
        aria-checked={checked}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            !disabled && onChange && onChange(!checked);
          }
        }}
        className={cn(
          "w-5 h-5 rounded-lg border-2 border-border bg-surface flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 peer-checked:bg-primary peer-checked:border-primary text-white shadow-sm hover:border-primary/60",
          disabled && "cursor-not-allowed opacity-50 bg-section",
          className
        )}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
