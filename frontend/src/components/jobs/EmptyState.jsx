import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

export const EmptyState = ({ onReset, title = "No Jobs Found", description = "We couldn't find any jobs matching your search criteria. Try clearing filters or using different keywords." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface border border-dashed border-border rounded-3xl shadow-soft my-6">
      <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center text-primary mb-4 shadow-soft">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <Button variant="outline" onClick={onReset} className="gap-2 font-semibold">
          <RotateCcw className="w-4 h-4 text-primary" />
          <span>Reset All Filters</span>
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
