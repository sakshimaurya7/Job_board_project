import React from "react";
import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-accent/20 bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 bg-[length:200%_100%]", className)}
      {...props}
    />
  );
}

export { Skeleton };
