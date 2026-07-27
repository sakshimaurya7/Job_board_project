import React from "react";
import { ArrowRight } from "lucide-react";

export function CategoryCard({ icon: Icon, title, jobsCount, isHot }) {
  return (
    <div className="group relative p-6 bg-surface rounded-2xl border border-border transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1.5 hover:border-primary/40 flex flex-col justify-between cursor-pointer">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-section flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
          {isHot && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-primary">
              Hot
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {jobsCount} jobs available
        </p>
      </div>

      <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span>Explore Jobs</span>
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
