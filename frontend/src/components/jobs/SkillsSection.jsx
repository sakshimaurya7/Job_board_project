import React from "react";
import { Code2, Check } from "lucide-react";
import { Card } from "../ui/card";

export const SkillsSection = ({ skills = [] }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <Card className="p-6 bg-surface border border-border rounded-3xl shadow-soft mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Code2 className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-text">Required Skills & Expertise</h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-section text-text border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
          >
            <Check className="w-3.5 h-3.5 text-primary" />
            <span>{skill}</span>
          </span>
        ))}
      </div>
    </Card>
  );
};

export default SkillsSection;
