import * as React from "react";
import { cn } from "../../lib/utils";

const Avatar = React.forwardRef(({ className, src, alt = "", fallback = "JS", size = "md", ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base font-bold",
    xl: "h-20 w-20 text-xl font-bold",
  };

  const getInitials = (text) => {
    if (!text) return "JS";
    return text
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-2xl bg-section border border-border items-center justify-center font-semibold text-primary shadow-sm",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="select-none">{getInitials(fallback || alt)}</span>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export { Avatar };
