import React from "react";
import { Search, ShieldCheck, CheckCircle2, Send, Bell, Smartphone } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

const PLATFORM_CARDS = [
  {
    icon: Search,
    title: "Powerful Search",
    subtitle: "Elastic-style search filters by location, category, job type, and keywords.",
    tag: "Search Engine",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    subtitle: "Enterprise-grade JWT authentication and secure session management.",
    tag: "Security",
  },
  {
    icon: CheckCircle2,
    title: "Verified Companies",
    subtitle: "Hand-checked organization profiles to guarantee genuine job postings.",
    tag: "Trust",
  },
  {
    icon: Send,
    title: "Easy Applications",
    subtitle: "Fast 1-click submission with cover letter attachments and resume sync.",
    tag: "Efficiency",
  },
  {
    icon: Bell,
    title: "Real-Time Updates",
    subtitle: "Instant feedback alerts on application status changes and employer views.",
    tag: "Notifications",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    subtitle: "Fully responsive modern interface optimized for mobile and desktop screens.",
    tag: "Responsive UI",
  },
];

export function PlatformFeatures() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Product Overview"
          title="Meet the"
          highlight="Platform"
          subtitle="Engineered with modern architecture to deliver a seamless job board experience."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {PLATFORM_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-section text-primary border border-accent/40 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/20">
                    {card.tag}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
