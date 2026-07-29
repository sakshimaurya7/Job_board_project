import React from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TESTIMONIALS = [
  {
    name: "Alex Morgan",
    profession: "Senior Frontend Developer",
    company: "TechScale Studios",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "AM",
    rating: 5,
    feedback: "Finding my current lead engineering position through this platform was surprisingly smooth. The application process was transparent and I received direct interview feedback within days.",
  },
  {
    name: "Sarah Jenkins",
    profession: "VP of People & Talent",
    company: "CloudVibe Inc.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    initials: "SJ",
    rating: 5,
    feedback: "As a recruiter, finding pre-screened tech candidates quickly is critical. This platform reduced our average time-to-hire by 50% while connecting us with incredible talent.",
  },
  {
    name: "David Chen",
    profession: "Full Stack Engineer",
    company: "FinTech Global",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "DC",
    rating: 5,
    feedback: "No spam, no ghost postings. Every job listing on this board came with verified company details and honest salary expectations. Highly recommended for candidates!",
  },
  {
    name: "Elena Rostova",
    profession: "Product Manager",
    company: "InnovateX Labs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    initials: "ER",
    rating: 5,
    feedback: "The user experience is light-years ahead of traditional job sites. Modern UI, seamless mobile navigation, and instant alerts make job searching effortless.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-section/40 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Community Feedback"
          title="Loved by Candidates &"
          highlight="Recruiters"
          subtitle="See what our community has to say about their experience with our platform."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="relative rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/15 group-hover:text-primary/30 transition-colors" />

              <div className="space-y-4 mb-6">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-text leading-relaxed italic">
                  "{item.feedback}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                <Avatar className="w-12 h-12 border-2 border-primary/30">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback className="bg-section text-primary font-bold">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-bold text-text text-base leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {item.profession} • <span className="text-primary font-medium">{item.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
