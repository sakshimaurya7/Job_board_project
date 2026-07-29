import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

export const ErrorState = ({ onRetry, message = "Failed to load job listings. Please check your internet connection and try again." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface border border-error/20 rounded-3xl shadow-soft my-6">
      <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center text-error mb-4 shadow-soft">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-text mb-2">Something Went Wrong</h3>
      <p className="text-sm text-text-secondary max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} className="gap-2 font-semibold">
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
