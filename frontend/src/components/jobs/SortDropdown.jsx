import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Select } from "../ui/select";

export const SortDropdown = ({ sortBy = "newest", setSortBy }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-text-secondary whitespace-nowrap hidden sm:inline-block">
        Sort By:
      </span>
      <div className="w-44 sm:w-48">
        <Select
          icon={ArrowUpDown}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 text-xs border-border bg-surface shadow-xs font-semibold"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="salary-high">Highest Salary</option>
          <option value="salary-low">Lowest Salary</option>
          <option value="az">Alphabetical (A-Z)</option>
          <option value="za">Alphabetical (Z-A)</option>
        </Select>
      </div>
    </div>
  );
};

export default SortDropdown;
