import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/home/HeroSection";
import { CompaniesSection } from "./components/home/CompaniesSection";
import { FeaturedJobs } from "./components/home/FeaturedJobs";
import { CategorySection } from "./components/home/CategorySection";
import { EmployerCTA } from "./components/home/EmployerCTA";
import { Button } from "./components/ui/button";
import { CheckCircle2, Search, ArrowRight, Briefcase, Building2, User } from "lucide-react";

// Home Page Container Component
function HomePage() {
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

// Placeholder Page for secondary routes
function PlaceholderPage({ title, description, icon: Icon }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-background">
      <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center text-primary mb-6 shadow-soft">
        <Icon className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-text mb-3">{title}</h1>
      <p className="text-text-secondary text-base max-w-md leading-relaxed mb-8">
        {description}
      </p>
      <Button variant="primary" onClick={() => window.history.back()} className="space-x-2">
        <span>Go Back</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-text selection:bg-accent selection:text-text">
        <Toaster position="top-right" richColors />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/jobs"
              element={
                <PlaceholderPage
                  title="Explore All Jobs"
                  description="Browse thousands of verified open tech and creative positions."
                  icon={Briefcase}
                />
              }
            />
            <Route
              path="/companies"
              element={
                <PlaceholderPage
                  title="Company Directory"
                  description="Discover top tech employers, startup cultures, and team perks."
                  icon={Building2}
                />
              }
            />
            <Route
              path="/about"
              element={
                <PlaceholderPage
                  title="About JobHub"
                  description="We are building the future of hiring and tech career discovery."
                  icon={User}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <PlaceholderPage
                  title="Contact Support"
                  description="Have questions? Get in touch with our candidate & employer support teams."
                  icon={Search}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
