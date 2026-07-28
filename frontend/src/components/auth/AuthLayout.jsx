import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, CheckCircle, Users, Award, ShieldCheck, Sparkles } from "lucide-react";

export function AuthLayout({ children, title, subtitle, isRegister = false }) {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-background py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-surface rounded-3xl border border-border shadow-soft-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
        {/* Form Column (Left on Desktop) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Mobile Header Branding */}
          <div className="mb-6 lg:hidden flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft">
                <Briefcase className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-black text-text tracking-tight">
                Job<span className="text-primary">Hub</span>
              </span>
            </Link>
            <span className="text-xs font-semibold text-primary bg-section px-3 py-1 rounded-full border border-border">
              {isRegister ? "Join 50k+ Members" : "Welcome Back"}
            </span>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
        </div>

        {/* Hero Illustration / Showcase Column (Right on Desktop) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary-hover to-secondary p-8 lg:p-12 text-white relative flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-[640px]">
          {/* Glassmorphism Background Shapes */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10 hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Next-Gen Recruitment Platform</span>
            </div>
          </div>

          {/* Center Showcase Content */}
          <div className="relative z-10 my-auto py-8">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mb-6 shadow-inner">
              <Briefcase className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              {isRegister
                ? "Unlock Endless Career & Hiring Opportunities"
                : "Connecting Exceptional Talent with Top Employers"}
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-normal leading-relaxed mb-8">
              {isRegister
                ? "Create your profile in seconds to apply for verified remote & on-site positions, or post job openings to top professionals worldwide."
                : "Log in to view personalized job recommendations, manage application status, or access powerful recruiter dashboard tools."}
            </p>

            {/* Feature Highlights Grid */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15 text-sm">
                <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium">Verified Companies & Premium Job Postings</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15 text-sm">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium">Role-Based Dashboard & Smart Matching</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15 text-sm">
                <Users className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium">Over 50,000+ Active Candidates & Hiring Managers</span>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof Badge */}
          <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-accent" />
              <span className="font-medium">Rated 4.9/5 by Recruiters</span>
            </div>
            <span>© 2026 JobHub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
