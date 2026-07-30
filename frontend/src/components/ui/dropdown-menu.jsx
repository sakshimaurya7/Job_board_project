import * as React from "react";
import { cn } from "../../lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenuContext = React.createContext(null);

function useDropdownContext() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenu sub-components must be used inside <DropdownMenu>");
  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenu = ({ children, className }) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape key
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = "DropdownMenu";

// ─────────────────────────────────────────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenuTrigger = React.forwardRef(({ children, className, asChild = false, ...props }, ref) => {
  const { open, setOpen } = useDropdownContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "menu",
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="menu"
      className={cn("focus:outline-none", className)}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ─────────────────────────────────────────────────────────────────────────────
// Content (floating panel)
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenuContent = React.forwardRef(
  ({ children, className, align = "end", sideOffset = 8, ...props }, ref) => {
    const { open } = useDropdownContext();

    if (!open) return null;

    const alignClass = align === "start" ? "left-0" : "right-0";

    return (
      <div
        ref={ref}
        role="menu"
        aria-orientation="vertical"
        style={{ top: `calc(100% + ${sideOffset}px)` }}
        className={cn(
          "absolute z-[9999] min-w-[240px] rounded-2xl border border-border bg-surface shadow-xl",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200",
          alignClass,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

// ─────────────────────────────────────────────────────────────────────────────
// Item
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenuItem = React.forwardRef(
  ({ children, className, icon: Icon, showChevron = true, disabled = false, destructive = false, onClick, ...props }, ref) => {
    const { setOpen } = useDropdownContext();

    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        role="menuitem"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-150 text-left group",
          "hover:bg-section focus:bg-section focus:outline-none",
          destructive
            ? "text-error hover:bg-error/5 hover:text-error"
            : "text-text hover:text-primary",
          disabled && "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-text",
          className
        )}
        {...props}
      >
        {/* Icon */}
        {Icon && (
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
              destructive ? "bg-error/10 text-error" : "bg-section text-text-secondary group-hover:bg-primary/10 group-hover:text-primary",
              disabled && "group-hover:bg-section group-hover:text-text-secondary"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}

        {/* Label */}
        <span className="flex-1 text-left">{children}</span>

        {/* Chevron */}
        {showChevron && !destructive && !disabled && (
          <svg
            className="h-3.5 w-3.5 shrink-0 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// ─────────────────────────────────────────────────────────────────────────────
// Separator
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenuSeparator = ({ className }) => (
  <div className={cn("my-1 h-px bg-border", className)} role="separator" />
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ─────────────────────────────────────────────────────────────────────────────
// Label (section heading inside dropdown)
// ─────────────────────────────────────────────────────────────────────────────
const DropdownMenuLabel = ({ children, className }) => (
  <div className={cn("px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-text-secondary", className)}>
    {children}
  </div>
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
