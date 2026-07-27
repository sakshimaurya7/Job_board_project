import React, { useState } from "react";
import { Bookmark, MapPin, DollarSign, Clock, Building2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function JobCard({
  id,
  title,
  company,
  logoBg = "bg-primary/10 text-primary",
  logoText = "C",
  location,
  type,
  salary,
  postedTime,
  skills = [],
  isFeatured = false,
  onApply,
}) {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-surface rounded-2xl border border-border transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 hover:border-primary/40">
      <div>
        {/* Top Header: Logo, Company Name, Bookmark Button */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${logoBg}`}
            >
              {logoText}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-secondary flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-text-secondary/70" />
                {company}
              </h4>
              <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors duration-200 line-clamp-1">
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            aria-label="Bookmark Job"
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-all duration-200 ${
              bookmarked
                ? "bg-primary/10 border-primary text-primary"
                : "border-border text-text-secondary hover:text-primary hover:border-primary/40 bg-surface"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
                bookmarked ? "fill-primary" : ""
              }`}
            />
          </button>
        </div>

        {/* Info Badges & Location */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge type={type} />
          <div className="flex items-center text-xs font-medium text-text-secondary px-2.5 py-1 bg-section rounded-full">
            <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
            {location}
          </div>
          {postedTime && (
            <div className="flex items-center text-xs text-text-secondary/80 ml-auto">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {postedTime}
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-section text-text-secondary border border-border/50"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Salary & Apply Button */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-2 mt-2">
        <div>
          <span className="text-xs text-text-secondary block font-medium">Salary</span>
          <span className="text-base font-bold text-text flex items-center">
            {salary}
          </span>
        </div>
        <Button
          variant="primary"
          onClick={() => onApply && onApply({ id, title, company })}
          className="h-10 px-5 text-sm font-semibold rounded-xl"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}
