import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function CTASection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-hover to-secondary p-8 text-center text-white shadow-soft-lg sm:p-12 md:p-16">
          {/* Soft glow orbs */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md md:text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Your Next Opportunity Awaits</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Need Help Finding Your Next Opportunity?
            </h2>

            {/* Supporting text */}
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Browse thousands of verified job listings or create a recruiter account to
              find top talent — all in one platform built for modern hiring.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Link to="/jobs" className="w-full sm:w-auto">
                <Button className="group/btn w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-lg font-bold text-base h-13 px-8 rounded-xl">
                  <Search className="mr-2 h-5 w-5 text-primary transition-transform group-hover/btn:scale-110" />
                  <span>Find Jobs</span>
                  <ArrowRight className="ml-2 h-5 w-5 text-primary transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>

              <Link to="/register" className="w-full sm:w-auto">
                <Button className="group/btn w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white/10 font-bold text-base h-13 px-8 rounded-xl">
                  <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover/btn:scale-110" />
                  <span>Create Recruiter Account</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
