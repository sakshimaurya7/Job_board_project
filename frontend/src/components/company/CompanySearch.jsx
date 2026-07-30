import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, X, RotateCcw } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const CompanySearch = ({ onSearch, onClear, initialFilters = {} }) => {
  const [name, setName] = useState(initialFilters.name || "");
  const [industry, setIndustry] = useState(initialFilters.industry || "");
  const [location, setLocation] = useState(initialFilters.location || "");

  useEffect(() => {
    setName(initialFilters.name || "");
    setIndustry(initialFilters.industry || "");
    setLocation(initialFilters.location || "");
  }, [initialFilters.name, initialFilters.industry, initialFilters.location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name, industry, location });
  };

  const handleClear = () => {
    setName("");
    setIndustry("");
    setLocation("");
    onClear();
  };

  const hasActiveQuery = Boolean(name || industry || location);

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        {/* Company Name Input */}
        <div className="md:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <Input
            type="text"
            placeholder="Search Company Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-11 bg-background border-border/80 text-sm focus:ring-primary focus:border-primary"
          />
          {name && (
            <button
              type="button"
              onClick={() => setName("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Industry Input */}
        <div className="md:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Briefcase className="w-4 h-4 text-secondary" />
          </div>
          <Input
            type="text"
            placeholder="Search Industry (e.g. Tech, Finance)"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="pl-10 h-11 bg-background border-border/80 text-sm focus:ring-primary focus:border-primary"
          />
          {industry && (
            <button
              type="button"
              onClick={() => setIndustry("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Location Input */}
        <div className="md:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <Input
            type="text"
            placeholder="Location (e.g. Remote, NY)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-11 bg-background border-border/80 text-sm focus:ring-primary focus:border-primary"
          />
          {location && (
            <button
              type="button"
              onClick={() => setLocation("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex items-center gap-2">
          <Button
            type="submit"
            variant="primary"
            className="flex-1 h-11 text-sm font-bold shadow-sm"
          >
            Search
          </Button>

          {hasActiveQuery && (
            <Button
              type="button"
              onClick={handleClear}
              variant="outline"
              className="h-11 px-3 border-border text-text-secondary hover:text-error hover:border-error/40 hover:bg-error/5"
              title="Clear Search"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanySearch;
