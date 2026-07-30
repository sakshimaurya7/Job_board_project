import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

export function ErrorState({ error, onRetry }) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "Failed to load application data. Please check your internet connection.";

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-rose-50/70 border border-rose-200 rounded-2xl text-center space-y-4 my-6">
      <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200 shadow-xs">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-lg font-bold text-rose-950">Something went wrong</h3>
        <p className="text-xs text-rose-700 leading-relaxed">{errorMessage}</p>
      </div>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="h-10 px-4 text-xs font-semibold border-rose-300 text-rose-800 hover:bg-rose-100 rounded-xl gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
