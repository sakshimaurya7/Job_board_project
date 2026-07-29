import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-primary via-primary-hover to-secondary p-8 sm:p-12 md:p-16 text-white text-center shadow-soft-lg overflow-hidden group">
          
          {/* Subtle background glow graphics */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-semibold text-xs md:text-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Join Thousands of Professionals & Hiring Teams</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Take the Next Step in Your Career Journey?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-2xl mx-auto">
              Whether you're looking for your dream job or searching for top-tier talent, our platform is here to accelerate your success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/jobs" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-lg font-bold text-base h-13 px-8 rounded-xl group"
                >
                  <Search className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                  <span>Find Jobs</span>
                  <ArrowRight className="w-5 h-5 ml-2 text-primary group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-base h-13 px-8 rounded-xl group"
                >
                  <Briefcase className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Post a Job</span>
                </Button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
