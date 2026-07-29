import React from "react";
import { CheckCircle, Search, Send, Lock, Zap, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { SectionHeading } from "../common/SectionHeading";

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Verified Companies",
    description: "Every employer account goes through rigorous verification to ensure authentic job listings and legitimate business operations.",
  },
  {
    icon: Search,
    title: "Smart Job Search",
    description: "Filter by location, job type, salary range, experience level, and keywords to quickly uncover ideal job opportunities.",
  },
  {
    icon: Send,
    title: "Easy Applications",
    description: "Submit applications with a single click using pre-filled profile data, uploaded resumes, and customized cover letters.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Enterprise-grade JWT authentication and encrypted data protection keep your candidate profile and personal data completely safe.",
  },
  {
    icon: Zap,
    title: "Fast Hiring Process",
    description: "Direct candidate-to-employer workflows minimize administrative lag, helping candidates get hired up to 3x faster.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Seamlessly browse, apply, manage postings, and track applications across desktop, tablet, or mobile devices.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Platform Advantages"
          title="Why Choose Our"
          highlight="Platform"
          subtitle="Everything candidates and employers need to succeed in today's fast-moving job market."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <Card
                key={index}
                className="group border-border hover:border-primary/40 hover:shadow-soft-lg transition-all duration-300"
              >
                <CardHeader className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-section text-primary border border-accent/40 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {feat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
