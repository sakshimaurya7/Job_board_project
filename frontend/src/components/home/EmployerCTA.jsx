import React from "react";
import { Button } from "../ui/button";
import { PlusCircle, CheckCircle2 } from "lucide-react";

export function EmployerCTA({ onPostJob }) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl bg-section border border-border overflow-hidden shadow-soft-lg p-8 sm:p-12 lg:p-16">
          {/* Ambient background blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Heading, Description, Button */}
            <div className="space-y-6">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                For Employers & Recruiters
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text tracking-tight leading-tight">
                Are you hiring top talent?
              </h2>

              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg">
                Connect with over 25,000+ active candidates, developers, designers, and industry leaders. Streamline your hiring pipeline with our intelligent job portal.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-sm font-semibold text-text">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Instant job posting and candidate application tracking</span>
                </div>
                <div className="flex items-center space-x-2.5 text-sm font-semibold text-text">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>AI-powered candidate screening and resume parsing</span>
                </div>
                <div className="flex items-center space-x-2.5 text-sm font-semibold text-text">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Direct candidate messaging & interview scheduling</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={onPostJob}
                  className="h-14 px-8 text-lg font-bold rounded-xl space-x-2 shadow-soft hover:shadow-soft-lg"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Post a Job Now</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Professional SVG Illustration (Briefcase, Resume, Dashboard) */}
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 500 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-md h-auto drop-shadow-md"
              >
                <defs>
                  <linearGradient id="cardGrad" x1="0" y1="0" x2="500" y2="380" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" />
                    <stop offset="1" stopColor="#FFFBF5" />
                  </linearGradient>
                </defs>

                {/* Dashboard Main Window */}
                <rect x="30" y="30" width="440" height="320" rx="20" fill="url(#cardGrad)" stroke="#FED7AA" strokeWidth="2" />
                <path d="M30 75 L470 75" stroke="#FED7AA" strokeWidth="2" />
                
                {/* Window Controls */}
                <circle cx="60" cy="52" r="6" fill="#EF4444" />
                <circle cx="80" cy="52" r="6" fill="#F59E0B" />
                <circle cx="100" cy="52" r="6" fill="#22C55E" />
                <rect x="140" y="44" width="160" height="16" rx="8" fill="#FFF7ED" />

                {/* Left Navigation Widget */}
                <rect x="50" y="95" width="110" height="235" rx="12" fill="#FFF7ED" />
                <rect x="65" y="115" width="80" height="10" rx="5" fill="#F97316" />
                <rect x="65" y="140" width="70" height="8" rx="4" fill="#FED7AA" />
                <rect x="65" y="160" width="60" height="8" rx="4" fill="#FED7AA" />
                <rect x="65" y="180" width="75" height="8" rx="4" fill="#FED7AA" />

                {/* Main Content Area: Briefcase & Candidate Cards */}
                {/* Metric Card 1 */}
                <rect x="180" y="95" width="130" height="70" rx="12" fill="#FFFFFF" stroke="#FED7AA" />
                <text x="195" y="125" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#6B7280">Active Candidates</text>
                <text x="195" y="150" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#1F2937">1,482</text>
                <circle cx="285" cy="130" r="14" fill="#DCFCE7" />
                <path d="M280 130 L284 134 L291 127" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />

                {/* Metric Card 2 */}
                <rect x="325" y="95" width="125" height="70" rx="12" fill="#FFFFFF" stroke="#FED7AA" />
                <text x="340" y="125" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#6B7280">Interviews</text>
                <text x="340" y="150" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#F97316">38</text>

                {/* Floating Resume Card */}
                <g transform="translate(180, 180)">
                  <rect x="0" y="0" width="270" height="135" rx="14" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                  <rect x="15" y="15" width="40" height="40" rx="10" fill="#FFEDD5" />
                  {/* Briefcase Icon */}
                  <path d="M30 28 h10 v3 h-10 z M27 31 h16 v12 h-16 z" fill="#EA580C" />
                  <text x="68" y="32" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#1F2937">Senior React Engineer</text>
                  <text x="68" y="48" fontFamily="sans-serif" fontSize="12" fill="#6B7280">Full Time • 14 Applicants</text>
                  <rect x="15" y="70" width="240" height="8" rx="4" fill="#FFF7ED" />
                  <rect x="15" y="70" width="180" height="8" rx="4" fill="#F97316" />
                  <rect x="15" y="95" width="80" height="26" rx="8" fill="#F97316" />
                  <text x="30" y="112" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#FFFFFF">Review (14)</text>
                </g>

                {/* Floating Badge Accent */}
                <circle cx="430" cy="200" r="16" fill="#F97316" />
                <path d="M424 200 L428 204 L436 196" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
