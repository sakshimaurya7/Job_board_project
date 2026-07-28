import React, { useState } from "react";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

export const PasswordInput = React.forwardRef(
  ({ className, error, showStrengthMeter = false, value = "", onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    // Password strength rules check
    const rules = [
      { label: "At least 8 characters", test: (val) => val.length >= 8 },
      { label: "One uppercase letter (A-Z)", test: (val) => /[A-Z]/.test(val) },
      { label: "One lowercase letter (a-z)", test: (val) => /[a-z]/.test(val) },
      { label: "One numeric digit (0-9)", test: (val) => /[0-9]/.test(val) },
      { label: "One special character (!@#$%)", test: (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val) },
    ];

    const passedRulesCount = rules.filter((r) => r.test(value)).length;

    const getStrengthColor = () => {
      if (!value) return "bg-border";
      if (passedRulesCount <= 2) return "bg-error";
      if (passedRulesCount <= 4) return "bg-warning";
      return "bg-success";
    };

    return (
      <div className="w-full space-y-2">
        <div className="relative w-full">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            icon={Lock}
            error={error}
            value={value}
            onChange={onChange}
            className={cn("pr-12", className)}
            {...props}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors focus:outline-none p-1 rounded-lg"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Strength Meter (Optional, for registration form) */}
        {showStrengthMeter && value.length > 0 && (
          <div className="space-y-2 pt-1 animate-in fade-in-50">
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-section rounded-full overflow-hidden flex gap-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "h-full flex-1 transition-all duration-300 rounded-full",
                    step <= passedRulesCount ? getStrengthColor() : "bg-border/60"
                  )}
                />
              ))}
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-text-secondary pt-1">
              {rules.map((rule, idx) => {
                const passed = rule.test(value);
                return (
                  <div key={idx} className="flex items-center space-x-1.5">
                    {passed ? (
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-text-secondary/50 shrink-0" />
                    )}
                    <span className={passed ? "text-text font-medium" : "text-text-secondary opacity-80"}>
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
