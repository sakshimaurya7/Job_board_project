import React from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { HeroSection } from "../components/home/HeroSection";
import { CompaniesSection } from "../components/home/CompaniesSection";
import { FeaturedJobs } from "../components/home/FeaturedJobs";
import { CategorySection } from "../components/home/CategorySection";
import { EmployerCTA } from "../components/home/EmployerCTA";

export default function Home() {
  const handleSearch = (searchParams) => {
    const queryStr = [searchParams.jobTitle, searchParams.location, searchParams.category]
      .filter(Boolean)
      .join(" • ");
    toast.success(`Searching for: ${queryStr || "All Jobs"}`);
  };

  const handleApply = (job) => {
    toast.success(`Application submitted for ${job.title} at ${job.company}!`, {
      description: "The hiring team will review your application shortly.",
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });
  };

  const handlePostJob = () => {
    toast.info("Employer Portal", {
      description: "Redirecting to Job Creation & Employer Dashboard...",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onSearch={handleSearch} />
      <CompaniesSection />
      <FeaturedJobs onSelectJob={handleApply} />
      <CategorySection />
      <EmployerCTA onPostJob={handlePostJob} />
    </main>
  );
}
