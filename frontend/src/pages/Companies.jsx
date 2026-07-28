import React from "react";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Companies() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-background">
      <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center text-primary mb-6 shadow-soft">
        <Building2 className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-text mb-3">Company Directory</h1>
      <p className="text-text-secondary text-base max-w-md leading-relaxed mb-8">
        Discover top tech employers, startup cultures, and team perks.
      </p>
      <Button variant="primary" onClick={() => window.history.back()} className="space-x-2">
        <span>Go Back</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
