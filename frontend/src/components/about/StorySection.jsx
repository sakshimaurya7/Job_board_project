import React from "react";
import { Target, Zap, ShieldAlert, Award, Compass, HeartHandshake } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

export function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-section/50 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Our Story"
          title="Built to Solve Real"
          highlight="Hiring Challenges"
          subtitle="How we evolved from a simple vision into a modern ecosystem for candidates and employers."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6 text-text-secondary leading-relaxed text-base md:text-lg">
            <h3 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight">
              Bridging the gap between talent and opportunity
            </h3>
            
            <p>
              Traditional job boards are often cluttered with outdated postings, ghost listings, and opaque recruitment processes. Finding the right job or candidate shouldn't feel like searching for a needle in a haystack.
            </p>

            <p>
              We established our platform to bring <strong className="text-text font-semibold">clarity, speed, and trust</strong> back to hiring. By combining smart searching algorithms with mandatory company verification, we empower candidate careers while streamlining recruitment pipelines for top employers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-surface border border-border flex items-start gap-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm mb-1">Zero Spam Listings</h4>
                  <p className="text-xs text-text-secondary">Every posting is screened and employer profiles are manually verified.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-border flex items-start gap-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm mb-1">Fast Application Loops</h4>
                  <p className="text-xs text-text-secondary">Direct communication channels eliminate friction between applicants & hiring managers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphic / Visual Box Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-surface border border-border p-8 shadow-soft-lg space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-soft">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-text">Our Core Philosophy</h4>
                  <p className="text-sm text-text-secondary">Putting candidate growth & hiring efficiency first</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-section border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-text text-sm">Quality over Quantity</span>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Curated</span>
                </div>

                <div className="p-4 rounded-2xl bg-section border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-secondary" />
                    <span className="font-semibold text-text text-sm">Targeted Job Recommendations</span>
                  </div>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">Intelligent</span>
                </div>

                <div className="p-4 rounded-2xl bg-section border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="w-5 h-5 text-success" />
                    <span className="font-semibold text-text text-sm">Mutual Success Commitment</span>
                  </div>
                  <span className="text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full">Transparent</span>
                </div>
              </div>

              {/* Bottom Quote Pill */}
              <div className="pt-4 border-t border-border/60 text-center italic text-xs md:text-sm text-text-secondary">
                "Connecting world-class professionals with high-growth companies seamlessly."
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
