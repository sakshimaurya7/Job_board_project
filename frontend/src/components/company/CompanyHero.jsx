import React from "react";
import { Building2, Search, Briefcase, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

export const CompanyHero = ({ onBrowseClick, onFindJobsClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-section via-background to-background py-16 md:py-24 border-b border-border/60">
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Top Tech & Global Employers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text tracking-tight leading-[1.15]">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">Amazing Companies</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore thousands of companies hiring talented professionals around the world. Get insights into team cultures, perks, and open positions.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                onClick={onBrowseClick}
                variant="primary"
                className="h-12 px-7 text-base font-bold shadow-soft hover:shadow-soft-lg transition-all gap-2"
              >
                <Building2 className="w-5 h-5" />
                <span>Browse Companies</span>
              </Button>

              <Button
                onClick={onFindJobsClick}
                variant="outline"
                className="h-12 px-7 text-base font-semibold border-primary/30 text-primary hover:bg-primary/5 transition-all gap-2"
              >
                <Briefcase className="w-5 h-5 text-primary" />
                <span>Find Jobs</span>
              </Button>
            </div>

            {/* Quick Stat Pill Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-border/60 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-extrabold text-text">500+</p>
                <p className="text-xs text-text-secondary font-medium">Verified Employers</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-primary">1,200+</p>
                <p className="text-xs text-text-secondary font-medium">Active Openings</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-secondary">98%</p>
                <p className="text-xs text-text-secondary font-medium">Response Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration Graphics */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Glassmorphism Card Banner graphic */}
              <div className="relative rounded-3xl border border-border/80 bg-surface/90 backdrop-blur-md p-6 shadow-soft-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-2xl shadow-soft">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text text-lg">Tech Innovations Inc.</h3>
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-success" /> Actively Hiring 12 Engineers
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-2.5 bg-section rounded-full w-full" />
                  <div className="h-2.5 bg-section rounded-full w-4/5" />
                  <div className="h-2.5 bg-section rounded-full w-2/3" />
                </div>

                {/* Floating Micro Badge */}
                <div className="mt-6 flex items-center justify-between p-3.5 rounded-2xl bg-section/80 border border-border/60">
                  <span className="text-xs font-semibold text-text">Culture Score</span>
                  <span className="text-xs font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    ★ 4.9 / 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHero;
