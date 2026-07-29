import React from "react";
import { CheckCircle2, User, Building } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

const SEEKER_BENEFITS = [
  "Access 10,000+ verified tech and corporate job listings",
  "1-Click fast application process with pre-saved profiles",
  "Real-time application status tracking and notification alerts",
  "Direct exposure to verified recruiters and hiring managers",
  "Filter jobs by remote, salary expectations, and tech stack",
  "100% free account creation and resume management",
];

const EMPLOYER_BENEFITS = [
  "Post targeted job openings to qualified candidate pools",
  "Verified employer badge building candidate trust instantly",
  "Streamlined candidate dashboard to track & score applicants",
  "Reduce time-to-hire by up to 60% with instant matches",
  "Customizable company profile showcase with culture highlights",
  "Dedicated support and scalable hiring plans",
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-section/50 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Value Delivered"
          title="Designed to Benefit"
          highlight="Everyone"
          subtitle="Whether you are searching for your next career move or scaling your tech team."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          
          {/* Job Seekers Benefits Box */}
          <div className="rounded-3xl bg-surface border border-border p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-soft">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-text">For Job Seekers</h3>
                <p className="text-xs text-text-secondary">Take full control of your career journey</p>
              </div>
            </div>

            <ul className="space-y-4">
              {SEEKER_BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-text">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers Benefits Box */}
          <div className="rounded-3xl bg-surface border border-border p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-soft">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-text">For Employers</h3>
                <p className="text-xs text-text-secondary">Scale your hiring pipeline effortlessly</p>
              </div>
            </div>

            <ul className="space-y-4">
              {EMPLOYER_BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-text">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
