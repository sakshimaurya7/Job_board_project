import React from "react";
import { Link } from "react-router-dom";
import { FolderSearch, Briefcase, PlusCircle, SearchX } from "lucide-react";
import { Button } from "../ui/button";

export function EmptyState({ isEmployer = false, isFiltered = false, onClearFilters }) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-border text-center space-y-4 my-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
          <SearchX className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-1">
          <h3 className="text-xl font-bold text-text">No matching applications found</h3>
          <p className="text-xs text-text-secondary">
            We couldn't find any applications matching your active filters or search terms.
          </p>
        </div>
        {onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="h-10 px-5 text-xs font-semibold rounded-xl"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-border text-center space-y-4 my-6 shadow-soft-xs">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
        {isEmployer ? <FolderSearch className="w-10 h-10" /> : <Briefcase className="w-10 h-10" />}
      </div>

      <div className="max-w-md space-y-1.5">
        <h3 className="text-2xl font-black text-text tracking-tight">
          {isEmployer ? "No applicants yet" : "No applications yet"}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {isEmployer
            ? "You haven't received any candidate applications for your posted jobs yet. Post new job listings to start receiving applicants."
            : "You haven't applied for any job positions yet. Explore thousands of active job opportunities and apply today."}
        </p>
      </div>

      <div className="pt-2">
        {isEmployer ? (
          <Link to="/jobs">
            <Button variant="primary" className="h-11 px-6 text-sm font-semibold rounded-xl gap-2">
              <PlusCircle className="w-4 h-4" />
              View Posted Jobs
            </Button>
          </Link>
        ) : (
          <Link to="/jobs">
            <Button variant="primary" className="h-11 px-6 text-sm font-semibold rounded-xl gap-2">
              <Briefcase className="w-4 h-4" />
              Browse Open Jobs
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
