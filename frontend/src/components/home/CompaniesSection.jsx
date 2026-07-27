import React from "react";
import { CompanyLogoCard } from "../common/CompanyLogoCard";
import { SectionHeading } from "../common/SectionHeading";
import { Command, Shield, Zap, Layers, Globe, Cpu } from "lucide-react";

export function CompaniesSection() {
  const companies = [
    { name: "Slack", icon: Command, jobs: 42 },
    { name: "Spotify", icon: Zap, jobs: 28 },
    { name: "Stripe", icon: Shield, jobs: 64 },
    { name: "Airbnb", icon: Layers, jobs: 19 },
    { name: "Figma", icon: Globe, jobs: 35 },
    { name: "Vercel", icon: Cpu, jobs: 51 },
  ];

  return (
    <section className="py-20 bg-section/40 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          align="center"
          title="Trusted by Leading Companies"
          subtitle="Top tier engineering, product, design, and business teams hire through JobHub"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {companies.map((company, idx) => (
            <CompanyLogoCard
              key={idx}
              name={company.name}
              logoIcon={company.icon}
              jobsCount={company.jobs}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
