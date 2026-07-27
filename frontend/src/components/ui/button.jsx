import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "default",
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg rounded-xl h-12 px-6 text-base font-semibold",
      secondary:
        "bg-section border border-accent text-primary hover:bg-primary/10 rounded-xl h-12 px-6 text-base font-semibold",
      danger:
        "bg-error text-white hover:bg-error/90 shadow-sm rounded-xl h-12 px-6 text-base font-semibold",
      outline:
        "border border-border bg-surface text-text hover:bg-section hover:border-primary/40 rounded-xl h-12 px-5 text-base font-medium",
      ghost:
        "text-text hover:bg-section hover:text-primary rounded-xl h-10 px-4 text-sm font-medium",
      sm:
        "bg-primary text-white hover:bg-primary-hover rounded-xl h-9 px-4 text-sm font-medium shadow-sm",
      icon:
        "h-10 w-10 p-0 rounded-xl bg-surface border border-border text-text hover:bg-section hover:text-primary hover:border-primary/40",
    };

    const sizes = {
      default: "",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-8 text-lg rounded-xl",
      icon: "h-10 w-10 p-0",
    };

    const selectedVariant = variants[variant] || variants.primary;
    const selectedSize = variant !== "primary" && variant !== "secondary" && variant !== "danger" && size !== "default" ? sizes[size] : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseStyles, selectedVariant, selectedSize, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
