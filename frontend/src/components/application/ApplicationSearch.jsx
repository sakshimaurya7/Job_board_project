import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";

export function ApplicationSearch({ value, onChange, placeholder = "Search applications..." }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-9 h-11 bg-surface border-border rounded-xl text-sm focus:border-primary focus:ring-primary/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-secondary hover:text-text hover:bg-section transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default ApplicationSearch;
