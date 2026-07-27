import React from "react";
import { cn } from "../../lib/utils";

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  children,
  className,
  align = "left",
}) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12",
        align === "center" ? "items-center text-center max-w-2xl mx-auto" : "items-start",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight leading-tight">
        {title}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
