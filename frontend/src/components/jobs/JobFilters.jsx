import React, { useState } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  Award,
} from "lucide-react";
import { Button } from "../ui/button";

export const JobFilters = ({
  filters,
  setFilters,
  onClearFilters,
  activeFilterCount = 0,
  companiesList = [],
}) => {
  // Collapsible state for filter sections
  const [openSections, setOpenSections] = useState({
    jobType: true,
    experience: true,
    salary: true,
    posted: true,
    company: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleJobTypeChange = (type) => {
    setFilters((prev) => {
      const current = prev.jobTypes || [];
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return { ...prev, jobTypes: updated };
    });
  };

  const handleExperienceChange = (exp) => {
    setFilters((prev) => {
      const current = prev.experienceLevels || [];
      const updated = current.includes(exp)
        ? current.filter((e) => e !== exp)
        : [...current, exp];
      return { ...prev, experienceLevels: updated };
    });
  };

  const handlePostedWithinChange = (val) => {
    setFilters((prev) => ({ ...prev, postedWithin: val }));
  };

  const handleMinSalaryChange = (val) => {
    setFilters((prev) => ({ ...prev, minSalary: val }));
  };

  const handleCompanyChange = (companyId) => {
    setFilters((prev) => ({ ...prev, companyId: companyId }));
  };

  const handleRemoteOnlyToggle = (e) => {
    setFilters((prev) => ({ ...prev, remoteOnly: e.target.checked }));
  };

  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const experienceOptions = [
    { label: "Entry Level (0-1 yrs)", value: "entry" },
    { label: "Mid Level (2-4 yrs)", value: "mid" },
    { label: "Senior Level (5+ yrs)", value: "senior" },
  ];
  const postedOptions = [
    { label: "Anytime", value: "all" },
    { label: "Past 24 Hours", value: "1" },
    { label: "Past 7 Days", value: "7" },
    { label: "Past 30 Days", value: "30" },
  ];
  const salaryOptions = [
    { label: "Any Salary", value: 0 },
    { label: "$50,000+ / yr", value: 50000 },
    { label: "$80,000+ / yr", value: 80000 },
    { label: "$100,000+ / yr", value: 100000 },
    { label: "$150,000+ / yr", value: 150000 },
  ];

  return (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-text">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Remote Only Toggle */}
      <div className="p-3.5 rounded-2xl bg-section/80 border border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-text">Remote Positions Only</span>
        </div>
        <input
          type="checkbox"
          checked={!!filters.remoteOnly}
          onChange={handleRemoteOnlyToggle}
          className="h-4 w-4 rounded text-primary focus:ring-primary border-border cursor-pointer accent-primary"
        />
      </div>

      {/* Job Type Section */}
      <div className="border-b border-border/60 pb-5">
        <button
          onClick={() => toggleSection("jobType")}
          className="w-full flex items-center justify-between py-1 text-left focus:outline-none"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>Job Type</span>
          </div>
          {openSections.jobType ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {openSections.jobType && (
          <div className="mt-3.5 space-y-2.5">
            {jobTypeOptions.map((type) => {
              const isChecked = (filters.jobTypes || []).includes(type);
              return (
                <label
                  key={type}
                  className="flex items-center justify-between text-sm text-text-secondary hover:text-text cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleJobTypeChange(type)}
                      className="h-4 w-4 rounded text-primary focus:ring-primary border-border accent-primary"
                    />
                    <span>{type}</span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Experience Level Section */}
      <div className="border-b border-border/60 pb-5">
        <button
          onClick={() => toggleSection("experience")}
          className="w-full flex items-center justify-between py-1 text-left focus:outline-none"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <Award className="w-4 h-4 text-primary" />
            <span>Experience Level</span>
          </div>
          {openSections.experience ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {openSections.experience && (
          <div className="mt-3.5 space-y-2.5">
            {experienceOptions.map((exp) => {
              const isChecked = (filters.experienceLevels || []).includes(exp.value);
              return (
                <label
                  key={exp.value}
                  className="flex items-center justify-between text-sm text-text-secondary hover:text-text cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleExperienceChange(exp.value)}
                      className="h-4 w-4 rounded text-primary focus:ring-primary border-border accent-primary"
                    />
                    <span>{exp.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Salary Range Section */}
      <div className="border-b border-border/60 pb-5">
        <button
          onClick={() => toggleSection("salary")}
          className="w-full flex items-center justify-between py-1 text-left focus:outline-none"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <DollarSign className="w-4 h-4 text-primary" />
            <span>Minimum Salary</span>
          </div>
          {openSections.salary ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {openSections.salary && (
          <div className="mt-3.5 space-y-2">
            {salaryOptions.map((opt) => {
              const isSelected = (filters.minSalary || 0) === opt.value;
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-text cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="minSalary"
                    checked={isSelected}
                    onChange={() => handleMinSalaryChange(opt.value)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border accent-primary"
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Posted Within Section */}
      <div className="border-b border-border/60 pb-5">
        <button
          onClick={() => toggleSection("posted")}
          className="w-full flex items-center justify-between py-1 text-left focus:outline-none"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <Clock className="w-4 h-4 text-primary" />
            <span>Date Posted</span>
          </div>
          {openSections.posted ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {openSections.posted && (
          <div className="mt-3.5 space-y-2">
            {postedOptions.map((opt) => {
              const isSelected = (filters.postedWithin || "all") === opt.value;
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-text cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="postedWithin"
                    checked={isSelected}
                    onChange={() => handlePostedWithinChange(opt.value)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border accent-primary"
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Company Section */}
      {companiesList && companiesList.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection("company")}
            className="w-full flex items-center justify-between py-1 text-left focus:outline-none"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-text">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Company</span>
            </div>
            {openSections.company ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>

          {openSections.company && (
            <div className="mt-3.5">
              <select
                value={filters.companyId || ""}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-border bg-section text-sm text-text focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="">All Companies</option>
                {companiesList.map((comp) => (
                  <option key={comp._id} value={comp._id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Bottom Clear Button */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full h-11 gap-2 text-xs font-bold border-border hover:bg-section"
        >
          <RotateCcw className="w-3.5 h-3.5 text-primary" />
          <span>Reset All Filters</span>
        </Button>
      )}
    </div>
  );
};

export default JobFilters;
