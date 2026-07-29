import React, { useEffect } from "react";
import { HeroSection } from "../components/about/HeroSection";
import { StorySection } from "../components/about/StorySection";
import { MissionVisionSection } from "../components/about/MissionVisionSection";
import { ValuesGrid } from "../components/about/ValuesGrid";
import { FeaturesGrid } from "../components/about/FeaturesGrid";
import { StatisticsSection } from "../components/about/StatisticsSection";
import { HowItWorks } from "../components/about/HowItWorks";
import { BenefitsSection } from "../components/about/BenefitsSection";
import { PlatformFeatures } from "../components/about/PlatformFeatures";
import { TestimonialsSection } from "../components/about/TestimonialsSection";
import { FAQSection } from "../components/about/FAQSection";
import { CTASection } from "../components/about/CTASection";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Modern Job Board Platform";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-text selection:bg-accent selection:text-text space-y-4">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Our Story */}
      <StorySection />

      {/* 3. Mission & Vision */}
      <MissionVisionSection />

      {/* 4. Core Values */}
      <ValuesGrid />

      {/* 5. Why Choose Our Platform */}
      <FeaturesGrid />

      {/* 6. Platform Statistics */}
      <StatisticsSection />

      {/* 7. How It Works */}
      <HowItWorks />

      {/* 8. Benefits */}
      <BenefitsSection />

      {/* 9. Meet the Platform */}
      <PlatformFeatures />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Frequently Asked Questions */}
      <FAQSection />

      {/* 12. Call To Action */}
      <CTASection />
    </main>
  );
}
