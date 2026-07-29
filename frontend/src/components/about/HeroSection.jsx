import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-background">
      {/* Background Soft Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-section border border-border shadow-soft text-primary font-semibold text-xs md:text-sm tracking-wide">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span>Redefining Tech Recruitment & Career Growth</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text tracking-tight leading-[1.15]">
              Find <span className="text-primary underline decoration-accent/60 underline-offset-4">Opportunities</span>. <br className="hidden sm:inline" />
              Build Careers. <br className="hidden sm:inline" />
              Hire the <span className="text-primary">Best Talent</span>.
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
              We connect ambitious professionals with industry-leading companies through intelligent matching, transparent hiring workflows, and verified opportunities.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link to="/jobs">
                <Button variant="primary" className="w-full sm:w-auto h-13 px-8 text-base shadow-soft hover:shadow-soft-lg group">
                  <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Find Jobs</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/register">
                <Button variant="secondary" className="w-full sm:w-auto h-13 px-8 text-base group">
                  <Briefcase className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Post a Job</span>
                </Button>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-border/60 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <span className="text-xs md:text-sm font-medium text-text-secondary">Verified Employers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs md:text-sm font-medium text-text-secondary">Secure Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-xs md:text-sm font-medium text-text-secondary">Real-Time Alerts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Decorative Card Graphic */}
              <div className="relative rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-soft-lg overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                
                {/* SVG Illustration Header */}
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-section flex items-center justify-center text-primary border border-accent/40 shadow-soft">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text text-base">Senior Full Stack Engineer</h4>
                      <p className="text-xs text-text-secondary">TechCorp Inc. • San Francisco, CA</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-success bg-success/10 rounded-full border border-success/20">
                    Active Hiring
                  </span>
                </div>

                {/* Interactive Simulated Job Badges */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium bg-badge-remote-bg text-badge-remote-text rounded-lg">Remote</span>
                    <span className="px-3 py-1 text-xs font-medium bg-badge-fulltime-bg text-badge-fulltime-text rounded-lg">Full-Time</span>
                    <span className="px-3 py-1 text-xs font-medium bg-badge-internship-bg text-badge-internship-text rounded-lg">$140k - $180k</span>
                  </div>

                  <div className="p-4 rounded-xl bg-section border border-border/70 space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-text">
                      <span>Applicant Match Score</span>
                      <span className="text-primary">96% Match</span>
                    </div>
                    <div className="w-full bg-border/50 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full w-[96%]" />
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -bottom-4 -left-4 sm:left-4 bg-surface border border-border p-3.5 rounded-2xl shadow-soft-lg flex items-center gap-3 animate-bounce [animation-duration:3s]">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-medium">Job Seekers</p>
                    <p className="text-sm font-extrabold text-text">50,000+ Active</p>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -top-4 -right-4 sm:right-4 bg-surface border border-border p-3.5 rounded-2xl shadow-soft-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-medium">Verified Hire</p>
                    <p className="text-sm font-extrabold text-text">Instant Connect</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
