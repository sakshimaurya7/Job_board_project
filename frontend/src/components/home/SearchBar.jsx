import React, { useState } from "react";
import { Search, MapPin, Grid, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export function SearchBar({ onSearch }) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = [
    "All Categories",
    "Development",
    "Design",
    "Marketing",
    "Finance",
    "Sales",
    "Human Resources",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ jobTitle, location, category });
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="w-full bg-surface p-2 md:p-3 rounded-2xl border border-border shadow-soft-lg flex flex-col md:flex-row items-stretch gap-2 transition-all duration-300 hover:border-primary/40"
    >
      {/* Input 1: Job Title */}
      <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-border/80">
        <Search className="w-5 h-5 text-primary shrink-0 mr-3" />
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job title or keyword"
          className="w-full bg-transparent text-text placeholder:text-text-placeholder text-base font-medium focus:outline-none"
        />
      </div>

      {/* Input 2: Location */}
      <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-border/80">
        <MapPin className="w-5 h-5 text-primary shrink-0 mr-3" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full bg-transparent text-text placeholder:text-text-placeholder text-base font-medium focus:outline-none"
        />
      </div>

      {/* Dropdown 3: Category Dropdown */}
      <div className="relative flex-1 flex items-center px-4 py-2">
        <Grid className="w-5 h-5 text-primary shrink-0 mr-3" />
        <button
          type="button"
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="w-full flex items-center justify-between text-text text-base font-medium focus:outline-none"
        >
          <span className="truncate">{category}</span>
          <ChevronDown className="w-4 h-4 text-text-secondary ml-2 shrink-0" />
        </button>

        {categoryOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-surface border border-border rounded-xl shadow-soft-lg z-30 py-2 max-h-56 overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat);
                  setCategoryOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-section text-primary font-bold"
                    : "text-text hover:bg-section"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        variant="primary"
        className="h-12 md:h-auto px-8 rounded-xl shrink-0 font-bold text-base"
      >
        Search Jobs
      </Button>
    </form>
  );
}
