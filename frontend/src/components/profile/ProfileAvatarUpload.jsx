import React, { useRef, useState } from "react";
import { Camera, User as UserIcon, X } from "lucide-react";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// ProfileAvatarUpload
// Circular avatar with a hover overlay to change photo.
// Validates: JPG/PNG only, max 2 MB.
// Converts selected file to base64 and calls onImageSelect(base64String).
// ─────────────────────────────────────────────────────────────────────────────

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export function ProfileAvatarUpload({ currentPhoto, name = "", onImageSelect, size = "lg" }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // Initials fallback (max 2 chars)
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) || "U";

  // Displayed image: local preview > existing photo > null (show initials)
  const displaySrc = preview || currentPhoto || null;

  // ── Size variants ──
  const sizeClasses = size === "lg"
    ? "h-28 w-28 text-3xl"
    : "h-16 w-16 text-lg";

  // ── Handle file selection ──
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG and PNG images are allowed.");
      e.target.value = "";
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("Image must be smaller than 2 MB.");
      e.target.value = "";
      return;
    }

    // Read as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      onImageSelect?.(base64);
    };
    reader.readAsDataURL(file);
  };

  // ── Clear the selected preview ──
  const handleClear = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect?.(currentPhoto || "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative inline-block group">
      {/* ── Avatar circle ── */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        aria-label="Change profile photo"
        className={`relative flex ${sizeClasses} shrink-0 items-center justify-center rounded-full border-4 border-orange-200 bg-orange-50 overflow-hidden shadow-md transition-all duration-300 group-hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
      >
        {/* Photo or initials */}
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={name || "Profile photo"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-black text-primary">{initials}</span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="h-5 w-5 text-white" />
          <span className="mt-1 text-[10px] font-semibold text-white leading-none">
            Change
          </span>
        </div>
      </button>

      {/* Clear preview button (shown only when local preview is set) */}
      {preview && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Remove selected photo"
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-white shadow-md hover:bg-error/80 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
      />
    </div>
  );
}
