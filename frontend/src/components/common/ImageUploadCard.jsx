import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { getCompanyLogo, getCompanyBanner } from "../../utils/imagePlaceholder";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function ImageUploadCard({
  type = "logo", // "logo" | "banner"
  label = "Upload Image",
  description = "PNG, JPG, JPEG, WEBP up to 5MB",
  currentImageUrl = "",
  onFileSelect,
  onImageRemove,
  error = "",
}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [validationError, setValidationError] = useState("");

  const isLogo = type === "logo";

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Determine display image: local preview > saved URL > default placeholder
  const activeDisplayImage =
    previewUrl ||
    currentImageUrl ||
    (isLogo ? getCompanyLogo("") : getCompanyBanner(""));

  const hasImage = Boolean(previewUrl || currentImageUrl);

  const validateFile = (file) => {
    if (!file) return false;

    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      const msg = "Invalid format! Only PNG, JPG, JPEG, and WEBP files are allowed.";
      setValidationError(msg);
      toast.error(msg);
      return false;
    }

    if (file.size > MAX_SIZE_BYTES) {
      const msg = "File is too large! Maximum allowed image size is 5MB.";
      setValidationError(msg);
      toast.error(msg);
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    toast.success(`${isLogo ? "Logo" : "Banner"} selected! Click 'Save Changes' to update.`);

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl("");
    setValidationError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info(`${isLogo ? "Logo" : "Banner"} image cleared.`);
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-bold text-text flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            {label}
          </label>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>

        {hasImage && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2.5 py-0.5 rounded-full border border-success/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {selectedFile ? "New Image Selected" : "Current Image Loaded"}
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Dropzone Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
          dragOver
            ? "border-primary bg-primary/10 shadow-lg scale-[1.01]"
            : "border-border hover:border-primary/50 bg-section/40 hover:bg-section"
        } ${isLogo ? "p-4" : "p-2"}`}
      >
        {/* Banner layout vs Logo layout */}
        {isLogo ? (
          <div className="flex flex-col sm:flex-row items-center gap-5 p-2">
            {/* Logo Preview Container */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-border overflow-hidden bg-surface shadow-soft shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src={activeDisplayImage}
                alt="Company Logo Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                <RefreshCw className="w-4 h-4 animate-spin-slow" /> Change
              </div>
            </div>

            {/* Instruction & Controls */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors">
                  {selectedFile ? selectedFile.name : "Click or drag logo here"}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Recommended: Square PNG/JPEG, min 200x200px (Max 5MB)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="h-9 text-xs font-bold gap-1.5 rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-white"
                >
                  <UploadCloud className="w-4 h-4" />
                  {hasImage ? "Replace Logo" : "Choose Logo"}
                </Button>

                {hasImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="h-9 text-xs font-bold gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Cover Banner Layout */
          <div className="space-y-3">
            <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-border bg-surface shadow-xs">
              <img
                src={activeDisplayImage}
                alt="Company Banner Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white text-center gap-2 group-hover:bg-black/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
                  <UploadCloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white drop-shadow-md">
                    {selectedFile ? selectedFile.name : "Click or drag cover banner here"}
                  </p>
                  <p className="text-xs text-white/80 drop-shadow-sm font-medium">
                    Recommended: 1200x400px Widescreen Banner (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Banner Control Bar */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>{selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "Cover Banner"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="h-8 text-xs font-bold gap-1.5 rounded-lg border-border hover:border-primary text-text"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-primary" />
                  {hasImage ? "Change Cover" : "Upload Cover"}
                </Button>

                {hasImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="h-8 text-xs font-bold gap-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove Cover
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Validation / Error Messages */}
      {(validationError || error) && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError || error}</span>
        </div>
      )}
    </div>
  );
}

export default ImageUploadCard;
