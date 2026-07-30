import React from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const CompanyErrorState = ({
  message = "Failed to load company details. Please check your connection and try again.",
  onRetry,
}) => {
  return (
    <div className="min-h-[450px] flex flex-col items-center justify-center p-8 text-center bg-surface border border-border rounded-3xl shadow-soft max-w-xl mx-auto my-12">
      <div className="w-20 h-20 rounded-3xl bg-error/10 text-error flex items-center justify-center mb-6 shadow-soft border border-error/20">
        <AlertTriangle className="w-10 h-10" />
      </div>

      <h2 className="text-2xl font-extrabold text-text mb-2">Something Went Wrong</h2>
      <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed mb-8">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/companies">
          <Button variant="outline" className="h-11 px-5 text-xs font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Companies</span>
          </Button>
        </Link>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            className="h-11 px-6 text-xs font-bold gap-2 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyErrorState;
