import React, { useState, useRef, useCallback } from "react";
import { X, Plus } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SkillsInput — tag-based skills input
// • Type a skill → Press Enter or comma → tag created
// • Click ✕ on a tag → remove it
// • Deduplication + trimming + max 20 skills
// ─────────────────────────────────────────────────────────────────────────────

const MAX_SKILLS = 20;

export function SkillsInput({ value = [], onChange, disabled = false }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // ── Add a skill tag ──
  const addSkill = useCallback(
    (raw) => {
      const skill = raw.trim();
      if (!skill) return;
      // Deduplicate (case-insensitive check)
      const existing = value.map((s) => s.toLowerCase());
      if (existing.includes(skill.toLowerCase())) {
        setInputValue("");
        return;
      }
      if (value.length >= MAX_SKILLS) {
        setInputValue("");
        return;
      }
      onChange([...value, skill]);
      setInputValue("");
    },
    [value, onChange]
  );

  // ── Remove a skill tag ──
  const removeSkill = useCallback(
    (index) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  // ── Key event: Enter or comma adds tag ──
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove last tag on Backspace when input is empty
      removeSkill(value.length - 1);
    }
  };

  // ── Blur: commit whatever is typed ──
  const handleBlur = () => {
    if (inputValue.trim()) addSkill(inputValue);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="min-h-[48px] w-full cursor-text flex flex-wrap gap-2 items-center rounded-xl border border-orange-200 bg-white px-3 py-2.5 transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
    >
      {/* ── Existing skill tags ── */}
      {value.map((skill, index) => (
        <span
          key={`${skill}-${index}`}
          className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-primary transition-all duration-150 hover:bg-orange-200"
        >
          {skill}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(index);
              }}
              aria-label={`Remove skill ${skill}`}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          )}
        </span>
      ))}

      {/* ── Text input ── */}
      {!disabled && value.length < MAX_SKILLS && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? "Type a skill and press Enter…" : "Add more…"}
          className="min-w-[140px] flex-1 border-none bg-transparent text-sm text-text-primary placeholder-placeholder outline-none"
          aria-label="Add skill"
        />
      )}

      {/* Max reached hint */}
      {value.length >= MAX_SKILLS && (
        <span className="text-xs text-text-secondary italic">Max {MAX_SKILLS} skills</span>
      )}
    </div>
  );
}
