import React from "react";
import {
  Filter,
  RotateCcw,
  Building2,
  Users,
  MapPin,
  CheckCircle2,
  Briefcase,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { Sheet } from "../ui/sheet";

const INDUSTRY_OPTIONS = [
  "All",
  "Technology",
  "Healthcare",
  "Finance",
  "E-Commerce",
  "Education",
  "Marketing",
  "Media",
];

const SIZE_OPTIONS = [
  "All",
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

const LOCATION_OPTIONS = [
  "All",
  "Remote",
  "United States",
  "India",
  "Europe",
  "Asia",
];

const SORT_OPTIONS = ["Newest", "Most Jobs", "Alphabetical"];

export const CompanyFilters = ({
  filters,
  onChange,
  onClearAll,
  isOpen = false,
  onClose = () => {},
}) => {
  const activeCount = [
    filters.industry !== "All" ? filters.industry : null,
    filters.size !== "All" ? filters.size : null,
    filters.location !== "All" ? filters.location : null,
    filters.verifiedOnly ? "Verified" : null,
    filters.hiringOnly ? "Hiring" : null,
  ].filter(Boolean).length;

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Active Filter Chips */}
      {activeCount > 0 && (
        <div className="p-3 bg-section rounded-xl border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary font-semibold">
            <span>Active Filters ({activeCount})</span>
            <button
              onClick={onClearAll}
              className="text-primary hover:underline text-xs flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {filters.industry !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {filters.industry}
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => onChange({ ...filters, industry: "All" })}
                />
              </span>
            )}
            {filters.size !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                {filters.size} employees
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => onChange({ ...filters, size: "All" })}
                />
              </span>
            )}
            {filters.location !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {filters.location}
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => onChange({ ...filters, location: "All" })}
                />
              </span>
            )}
            {filters.verifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20">
                Verified
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => onChange({ ...filters, verifiedOnly: false })}
                />
              </span>
            )}
            {filters.hiringOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                Hiring Now
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => onChange({ ...filters, hiringOnly: false })}
                />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sort By Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
          <span>Sort By</span>
        </label>
        <Select
          value={filters.sortBy || "Newest"}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
          className="h-10 text-xs bg-background"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </div>

      {/* Industry Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-primary" />
          <span>Industry</span>
        </label>
        <Select
          value={filters.industry || "All"}
          onChange={(e) => onChange({ ...filters, industry: e.target.value })}
          className="h-10 text-xs bg-background"
        >
          {INDUSTRY_OPTIONS.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </Select>
      </div>

      {/* Company Size Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-secondary" />
          <span>Company Size</span>
        </label>
        <Select
          value={filters.size || "All"}
          onChange={(e) => onChange({ ...filters, size: e.target.value })}
          className="h-10 text-xs bg-background"
        >
          {SIZE_OPTIONS.map((sz) => (
            <option key={sz} value={sz}>
              {sz === "All" ? "All Sizes" : `${sz} Employees`}
            </option>
          ))}
        </Select>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>Location</span>
        </label>
        <Select
          value={filters.location || "All"}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          className="h-10 text-xs bg-background"
        >
          {LOCATION_OPTIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
      </div>

      {/* Checkbox Options */}
      <div className="space-y-3 pt-2 border-t border-border/60">
        <label className="flex items-center gap-3 cursor-pointer group">
          <Checkbox
            checked={Boolean(filters.verifiedOnly)}
            onChange={(checked) => onChange({ ...filters, verifiedOnly: checked })}
          />
          <span className="text-xs font-semibold text-text group-hover:text-primary transition-colors flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            <span>Verified Companies Only</span>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <Checkbox
            checked={Boolean(filters.hiringOnly)}
            onChange={(checked) => onChange({ ...filters, hiringOnly: checked })}
          />
          <span className="text-xs font-semibold text-text group-hover:text-primary transition-colors flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Currently Hiring Only</span>
          </span>
        </label>
      </div>

      {/* Reset Button */}
      <Button
        onClick={onClearAll}
        variant="outline"
        className="w-full h-10 text-xs font-semibold text-text-secondary hover:text-primary gap-1.5 mt-4"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 bg-surface border border-border rounded-2xl p-5 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-text font-extrabold text-base">
              <Filter className="w-4 h-4 text-primary" />
              <span>Filters</span>
            </div>
            {activeCount > 0 && (
              <span className="text-xs font-extrabold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                {activeCount}
              </span>
            )}
          </div>

          {renderFilterContent()}
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      <Sheet isOpen={isOpen} onClose={onClose} title="Company Filters">
        {renderFilterContent()}
      </Sheet>
    </>
  );
};

export default CompanyFilters;
