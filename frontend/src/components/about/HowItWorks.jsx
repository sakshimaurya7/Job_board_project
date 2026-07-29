import React, { useState } from "react";
import { UserPlus, UserCheck, Search, Send, Trophy, Building, Briefcase, Inbox, Handshake, ArrowRight } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

const CANDIDATE_STEPS = [
  { step: 1, title: "Create Account", desc: "Sign up in seconds and verify your candidate email.", icon: UserPlus },
  { step: 2, title: "Complete Profile", desc: "Upload resume, set skills, and highlight your experience.", icon: UserCheck },
  { step: 3, title: "Search Jobs", desc: "Browse listings with smart filters for remote & hybrid roles.", icon: Search },
  { step: 4, title: "Apply Directly", desc: "Submit 1-click applications with customized cover notes.", icon: Send },
  { step: 5, title: "Get Hired", desc: "Interview with top employers and land your dream job.", icon: Trophy },
];

const EMPLOYER_STEPS = [
  { step: 1, title: "Register Account", desc: "Create your recruiter or company manager account.", icon: UserPlus },
  { step: 2, title: "Create Company", desc: "Set up company profile, brand logo, and workplace info.", icon: Building },
  { step: 3, title: "Post Jobs", desc: "Publish target job listings with custom role requirements.", icon: Briefcase },
  { step: 4, title: "Receive Applications", desc: "Review candidate profiles, resumes, and candidate scores.", icon: Inbox },
  { step: 5, title: "Hire Candidates", desc: "Connect directly with candidates and make winning offers.", icon: Handshake },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState("seekers");

  const steps = activeTab === "seekers" ? CANDIDATE_STEPS : EMPLOYER_STEPS;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Seamless Process"
          title="How It Works For"
          highlight={activeTab === "seekers" ? "Job Seekers" : "Employers"}
          subtitle="A clear, streamlined journey designed for maximum efficiency and transparency."
          align="center"
        />

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-section border border-border shadow-soft">
            <button
              onClick={() => setActiveTab("seekers")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === "seekers"
                  ? "bg-primary text-white shadow-soft"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("employers")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === "employers"
                  ? "bg-primary text-white shadow-soft"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              For Employers
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={item.step}
                className="relative rounded-2xl bg-surface border border-border p-5 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-extrabold text-sm flex items-center justify-center border border-primary/20">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-section text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-bold text-text text-base md:text-lg mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {!isLast && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-border group-hover:text-primary transition-colors">
                    <ArrowRight className="w-5 h-5 bg-background rounded-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
