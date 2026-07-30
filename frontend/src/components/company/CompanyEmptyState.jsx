import React from "react";
import { Building2, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

export const CompanyEmptyState = ({ onResetFilters }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface border border-border rounded-3xl shadow-soft">
      <div className="w-20 h-20 rounded-3xl bg-section flex items-center justify-center text-primary mb-6 shadow-soft border border-border">
        <Building2 className="w-10 h-10" />
      </div>

      <h3 className="text-2xl font-extrabold text-text mb-2">No Companies Found</h3>
      <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed mb-6">
        We couldn't find any companies matching your search criteria. Try adjusting your filters or resetting them.
      </p>

      {onResetFilters && (
        <Button
          onClick={onResetFilters}
          variant="primary"
          className="h-11 px-6 font-bold text-xs gap-2 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filters</span>
        </Button>
      )}
    </div>
  );
};

export default CompanyEmptyState;
