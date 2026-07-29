import React from "react";
import { Search, MapPin, Briefcase, X, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";

export const SearchBar = ({
  searchQuery = "",
  setSearchQuery,
  locationQuery = "",
  setLocationQuery,
  jobTypeQuery = "",
  setJobTypeQuery,
  onSearch,
  onClear,
  activeFilterCount = 0,
  onOpenMobileFilters,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  const hasActiveInputs = searchQuery || locationQuery || jobTypeQuery || activeFilterCount > 0;

  return (
    <div className="w-full bg-surface border border-border rounded-3xl p-4 sm:p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-3">
        {/* Search Title / Keyword */}
        <div className="relative flex-1 w-full">
          <Input
            icon={Search}
            type="text"
            placeholder="Search job title, skills, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 border-border bg-section/40 focus:bg-surface text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Input */}
        <div className="relative flex-1 w-full">
          <Input
            icon={MapPin}
            type="text"
            placeholder="City, state, or 'Remote'"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="h-12 border-border bg-section/40 focus:bg-surface text-sm"
          />
          {locationQuery && (
            <button
              type="button"
              onClick={() => setLocationQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Work Mode / Job Type Select */}
        <div className="w-full lg:w-48 shrink-0">
          <Select
            icon={Briefcase}
            value={jobTypeQuery}
            onChange={(e) => setJobTypeQuery(e.target.value)}
            className="h-12 border-border bg-section/40 focus:bg-surface text-sm"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote Only</option>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
          <Button
            type="submit"
            variant="primary"
            className="flex-1 lg:flex-none h-12 px-6 gap-2 text-sm font-bold shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>Search Jobs</span>
          </Button>

          {/* Mobile Filter Sheet Trigger Button */}
          {onOpenMobileFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={onOpenMobileFilters}
              className="lg:hidden relative h-12 px-4 gap-2 text-sm font-medium border-border"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          )}

          {hasActiveInputs && onClear && (
            <Button
              type="button"
              variant="ghost"
              onClick={onClear}
              className="h-12 px-3 text-text-secondary hover:text-error hover:bg-error/10 text-xs font-medium"
              title="Clear all search inputs"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
