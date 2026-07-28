import React from "react";
import { User, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function About() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-background">
      <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center text-primary mb-6 shadow-soft">
        <User className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-text mb-3">About JobHub</h1>
      <p className="text-text-secondary text-base max-w-md leading-relaxed mb-8">
        We are building the future of hiring and tech career discovery.
      </p>
      <Button variant="primary" onClick={() => window.history.back()} className="space-x-2">
        <span>Go Back</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
