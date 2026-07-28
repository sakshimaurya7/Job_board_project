import * as React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";

const variantStyles = {
  error: "bg-error/10 border-error/30 text-error",
  success: "bg-success/10 border-success/30 text-success",
  warning: "bg-warning/10 border-warning/30 text-warning",
  info: "bg-info/10 border-info/30 text-info",
};

const iconMap = {
  error: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

const Alert = React.forwardRef(({ className, variant = "error", title, children, ...props }, ref) => {
  const IconComponent = iconMap[variant] || AlertCircle;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 text-sm flex items-start gap-3 transition-all duration-300 animate-in fade-in-50",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <IconComponent className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
        <div className="text-sm font-medium leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
});

Alert.displayName = "Alert";

export { Alert };
