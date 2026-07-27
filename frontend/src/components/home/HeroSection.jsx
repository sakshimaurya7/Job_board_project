import React from "react";
import { SearchBar } from "./SearchBar";
import { StatsSection } from "./StatsSection";
import { HeroIllustration } from "./HeroIllustration";
import { Sparkles } from "lucide-react";

export function HeroSection({ onSearch }) {
  return (
    <section className="relative pt-12 pb-20 bg-background overflow-hidden border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Top Badge */}
            <div>
              <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-section border border-accent/60 text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span>#1 Job Platform For Modern Professionals</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text tracking-tight leading-[1.15]">
              Find the perfect <span className="text-primary underline decoration-accent/60 underline-offset-8">job</span> for your future
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl font-normal">
              Discover thousands of verified career opportunities from leading tech companies and startups. Take the next bold step in your career today.
            </p>

            {/* Search Bar */}
            <div className="pt-2">
              <SearchBar onSearch={onSearch} />
            </div>

            {/* Statistics Cards */}
            <StatsSection />
          </div>

          {/* Right Column (Vector Graphic Illustration) */}
          <div className="flex items-center justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
