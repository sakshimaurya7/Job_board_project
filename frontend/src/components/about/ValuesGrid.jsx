import React from "react";
import { ShieldCheck, Lightbulb, Eye, TrendingUp, Users, Award } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "Unwavering commitment to data security, privacy, and verified employer listings to protect job seekers.",
    color: "text-primary bg-primary/10 border-primary/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously improving candidate discovery and hiring tools through modern technology and user feedback.",
    color: "text-secondary bg-secondary/10 border-secondary/20",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear salary ranges, role requirements, and hiring status tracking so candidates are never left guessing.",
    color: "text-primary bg-primary/10 border-primary/20",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Fostering lifelong career progression, skill acquisition, and talent scaling for businesses of all sizes.",
    color: "text-success bg-success/10 border-success/20",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building an inclusive network connecting talent with visionary hiring managers and mentors.",
    color: "text-info bg-info/10 border-info/20",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Upholding high ethical standards in recruitment, protecting candidate privacy, and promoting equal hiring.",
    color: "text-primary bg-primary/10 border-primary/20",
  },
];

export function ValuesGrid() {
  return (
    <section className="py-16 md:py-24 bg-section/40 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Guiding Principles"
          title="Our Core"
          highlight="Values"
          subtitle="The fundamental beliefs that shape our platform experience and drive our product decisions."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {VALUES.map((val, index) => {
            const Icon = val.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-transform group-hover:scale-110 duration-300 ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {val.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-text-secondary font-medium">
                  <span>Principle #{index + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:scale-150 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
