import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Sheet = ({ isOpen, onClose, title = "Filters", children }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      {/* Overlay backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-surface p-6 shadow-2xl transition-transform duration-300 animate-in slide-in-from-right">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <h2 className="text-xl font-bold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-text-secondary hover:bg-section hover:text-primary transition-colors focus:outline-none"
            aria-label="Close sheet"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
};

export { Sheet };
