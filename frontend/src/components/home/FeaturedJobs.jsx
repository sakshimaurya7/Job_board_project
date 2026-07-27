import React, { useState } from "react";
import { JobCard } from "../common/JobCard";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedJobs({ onSelectJob }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const sampleJobs = [
    {
      id: "job-1",
      title: "Senior Full Stack Engineer",
      company: "Stripe",
      logoBg: "bg-purple-100 text-purple-600",
      logoText: "S",
      location: "San Francisco, CA",
      type: "Full Time",
      salary: "$140,000 - $180,000",
      postedTime: "2 days ago",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    },
    {
      id: "job-2",
      title: "Lead UI/UX Product Designer",
      company: "Figma",
      logoBg: "bg-rose-100 text-rose-600",
      logoText: "F",
      location: "Remote",
      type: "Remote",
      salary: "$130,000 - $160,000",
      postedTime: "1 day ago",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    },
    {
      id: "job-3",
      title: "Growth Marketing Specialist",
      company: "Spotify",
      logoBg: "bg-emerald-100 text-emerald-600",
      logoText: "Sp",
      location: "New York, NY",
      type: "Part Time",
      salary: "$60,000 - $80,000",
      postedTime: "3 days ago",
      skills: ["SEO", "Google Analytics", "Content Strategy", "Campaigns"],
    },
    {
      id: "job-4",
      title: "Frontend Engineering Intern",
      company: "Vercel",
      logoBg: "bg-slate-100 text-slate-800",
      logoText: "V",
      location: "Remote",
      type: "Internship",
      salary: "$40 - $55 / hr",
      postedTime: "Just now",
      skills: ["Next.js", "React", "Tailwind CSS", "JavaScript"],
    },
  ];

  const filterTabs = ["All", "Remote", "Full Time", "Part Time", "Internship"];

  const filteredJobs =
    activeFilter === "All"
      ? sampleJobs
      : sampleJobs.filter((job) => job.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-20 bg-background border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with View All Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            badge="Recommended Positions"
            title="Featured Jobs"
            subtitle="Hand-picked opportunities from top employers actively recruiting today"
            className="mb-0"
          />

          <Link to="/jobs">
            <Button variant="secondary" className="h-11 px-5 space-x-2">
              <span>View All Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeFilter === tab
                  ? "bg-primary text-white shadow-soft"
                  : "bg-surface border border-border text-text-secondary hover:text-text hover:bg-section"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4 Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onApply={onSelectJob}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
