import React, { useState } from "react";
import { Building2, Compass, HeartHandshake, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export const CompanyOverview = ({ company }) => {
  const [expanded, setExpanded] = useState(false);

  const { description, mission, vision, culture } = company;

  const defaultDescription =
    description ||
    "We are a forward-thinking technology company dedicated to creating cutting-edge software solutions that empower organizations globally. Our team thrives on innovation, transparency, and a relentless focus on customer success.";

  const defaultMission =
    mission ||
    "To accelerate digital transformation through scalable, intuitive, and human-centered technology solutions.";

  const defaultVision =
    vision ||
    "To be the global benchmark for technical excellence, inclusive work environment, and sustainable business growth.";

  const defaultCulture =
    culture ||
    "We foster a collaborative culture grounded in continuous learning, flexibility, remote-first autonomy, and mutual respect.";

  const shouldTruncate = defaultDescription.length > 280;

  return (
    <Card className="p-6 sm:p-8 bg-surface border border-border rounded-3xl shadow-soft mb-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-text font-extrabold text-xl mb-4">
          <Building2 className="w-5 h-5 text-primary" />
          <h2>About {company.name}</h2>
        </div>

        <div className="relative">
          <p
            className={`text-sm text-text-secondary leading-relaxed ${
              !expanded && shouldTruncate ? "line-clamp-4" : ""
            }`}
          >
            {defaultDescription}
          </p>

          {shouldTruncate && (
            <div className="pt-2">
              <Button
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
                className="p-0 h-auto text-xs font-bold text-primary hover:text-primary-hover hover:bg-transparent flex items-center gap-1"
              >
                <span>{expanded ? "Read Less" : "Read More"}</span>
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mission & Vision grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/60">
        <div className="p-4 rounded-2xl bg-section/70 border border-border/60 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <Compass className="w-4 h-4 text-primary" />
            <h3>Our Mission</h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{defaultMission}</p>
        </div>

        <div className="p-4 rounded-2xl bg-section/70 border border-border/60 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <HeartHandshake className="w-4 h-4 text-secondary" />
            <h3>Culture & Values</h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{defaultCulture}</p>
        </div>
      </div>
    </Card>
  );
};

export default CompanyOverview;
