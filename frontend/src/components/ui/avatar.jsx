import * as React from "react";
import { cn } from "../../lib/utils";

const Avatar = React.forwardRef(({ className, src, alt = "", fallback = "JS", size = "md", children, ...props }, ref) => {
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
      {children ? (
        children
      ) : src && !hasError ? (
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

const AvatarImage = React.forwardRef(({ className, src, alt = "", ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);
  if (!src || hasError) return null;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center bg-section text-primary select-none font-bold", className)}
    {...props}
  >
    {children}
  </span>
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
