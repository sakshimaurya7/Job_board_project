import React from "react";
import { Target, Eye, Sparkles, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { SectionHeading } from "../common/SectionHeading";

export function MissionVisionSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Purpose & Direction"
          title="Driven by Our"
          highlight="Mission & Vision"
          subtitle="Empowering careers and transforming how organizations hire talent worldwide."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          
          {/* Mission Card */}
          <Card className="relative overflow-hidden group border-border hover:border-primary/50 transition-all duration-300 p-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-transform group-hover:scale-110" />
            <CardHeader className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-soft group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Target className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl md:text-3xl">Our Mission</CardTitle>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                To democratize career growth by building an intuitive, transparent, and intelligent job platform where candidates easily discover meaningful roles, and companies rapidly connect with qualified talent without friction.
              </p>
              
              <ul className="space-y-2 text-sm text-text font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Equal opportunity access for all candidate skill levels.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Eliminating bias through verified employer data.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Streamlining job matching with smart filters.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="relative overflow-hidden group border-border hover:border-secondary/50 transition-all duration-300 p-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full transition-transform group-hover:scale-110" />
            <CardHeader className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20 shadow-soft group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <Eye className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl md:text-3xl">Our Vision</CardTitle>
                <Rocket className="w-5 h-5 text-secondary" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                To become the world's most trusted career destination—fostering lifelong professional development, enabling remote and hybrid work mobility, and setting the global benchmark for SaaS recruitment platforms.
              </p>

              <ul className="space-y-2 text-sm text-text font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Global reach with localized opportunities.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Data-driven insights for job seekers and recruiters.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Building long-term professional career journeys.
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
