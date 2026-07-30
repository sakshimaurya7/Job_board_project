import React from "react";
import { FolderOpen, SearchX, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

export function EmptyState({
  title = "No Data Found",
  description = "No items match your criteria. Try updating your filters or creating a new entry.",
  actionText,
  onAction,
  isFiltered = false,
  onClearFilters,
}) {
  return (
    <div className="p-12 text-center bg-surface rounded-2xl border border-border shadow-xs">
      <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center font-bold mx-auto mb-4">
        {isFiltered ? <SearchX className="w-8 h-8" /> : <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold text-text">{title}</h3>
      <p className="text-sm text-text-secondary mt-1.5 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-center gap-3 mt-6">
        {isFiltered && onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="h-10 px-4 text-xs font-semibold rounded-xl"
          >
            Clear All Filters
          </Button>
        )}

        {actionText && onAction && (
          <Button
            variant="primary"
            onClick={onAction}
            className="h-10 px-5 text-xs font-bold gap-2 rounded-xl"
          >
            <PlusCircle className="w-4 h-4" />
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
