import React from "react";
import { CategoryCard } from "../common/CategoryCard";
import { SectionHeading } from "../common/SectionHeading";
import { Code2, Palette, Megaphone, DollarSign, TrendingUp, Users, Database, Headphones } from "lucide-react";

export function CategorySection() {
  const categories = [
    {
      title: "Development",
      icon: Code2,
      jobsCount: "1,240+",
      isHot: true,
    },
    {
      title: "Design",
      icon: Palette,
      jobsCount: "860+",
      isHot: true,
    },
    {
      title: "Marketing",
      icon: Megaphone,
      jobsCount: "540+",
    },
    {
      title: "Finance",
      icon: DollarSign,
      jobsCount: "420+",
    },
    {
      title: "Sales",
      icon: TrendingUp,
      jobsCount: "680+",
    },
    {
      title: "Human Resources",
      icon: Users,
      jobsCount: "310+",
    },
    {
      title: "Data Science",
      icon: Database,
      jobsCount: "490+",
      isHot: true,
    },
    {
      title: "Customer Support",
      icon: Headphones,
      jobsCount: "290+",
    },
  ];

  return (
    <section className="py-20 bg-section/30 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Browse By Specialization"
          title="Explore Job Categories"
          subtitle="Discover open opportunities tailored to your specific skill set and career goals"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard
              key={idx}
              title={cat.title}
              icon={cat.icon}
              jobsCount={cat.jobsCount}
              isHot={cat.isHot}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
