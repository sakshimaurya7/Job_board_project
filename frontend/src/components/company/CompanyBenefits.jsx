import React from "react";
import {
  Heart,
  Home,
  Clock,
  Plane,
  GraduationCap,
  TrendingUp,
  Dumbbell,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { Card } from "../ui/card";

const DEFAULT_BENEFITS = [
  { id: "health", label: "Health Insurance", icon: Heart, desc: "Comprehensive medical & dental coverage" },
  { id: "remote", label: "Remote Work", icon: Home, desc: "Work from anywhere flexibility" },
  { id: "hours", label: "Flexible Hours", icon: Clock, desc: "Core hours with async schedule" },
  { id: "leave", label: "Paid Leave", icon: Plane, desc: "25+ annual paid vacation days" },
  { id: "learning", label: "Learning Budget", icon: GraduationCap, desc: "$1,500 annual stipend for courses & books" },
  { id: "stock", label: "Stock Options", icon: TrendingUp, desc: "Equity grants & employee share plans" },
  { id: "gym", label: "Gym Membership", icon: Dumbbell, desc: "Fitness & wellness allowance" },
  { id: "bonus", label: "Performance Bonus", icon: Award, desc: "Annual performance incentive bonus" },
];

export const CompanyBenefits = ({ company }) => {
  const customBenefits = company?.benefits || company?.perks;
  const benefitsToDisplay = Array.isArray(customBenefits) && customBenefits.length > 0
    ? DEFAULT_BENEFITS.filter((b) =>
        customBenefits.some(
          (cb) => typeof cb === "string" && cb.toLowerCase().includes(b.id)
        )
      )
    : DEFAULT_BENEFITS;

  const displayList = benefitsToDisplay.length > 0 ? benefitsToDisplay : DEFAULT_BENEFITS;

  return (
    <Card className="p-6 sm:p-8 bg-surface border border-border rounded-3xl shadow-soft mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-text flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Benefits & Perks</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            What makes working at {company.name || "this company"} exceptional
          </p>
        </div>
        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {displayList.length} Perks Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayList.map((perk) => {
          const Icon = perk.icon;
          return (
            <div
              key={perk.id}
              className="p-4 rounded-2xl bg-section/80 border border-border/70 hover:border-primary/40 hover:bg-surface transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors">
                {perk.label}
              </h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CompanyBenefits;
