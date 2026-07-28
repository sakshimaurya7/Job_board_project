import React from "react";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Jobs() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-background">
      <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center text-primary mb-6 shadow-soft">
        <Briefcase className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-text mb-3">Explore All Jobs</h1>
      <p className="text-text-secondary text-base max-w-md leading-relaxed mb-8">
        Browse thousands of verified open tech and creative positions.
      </p>
      <Button variant="primary" onClick={() => window.history.back()} className="space-x-2">
        <span>Go Back</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
