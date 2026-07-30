import React, { useRef, useState } from "react";
import {
  FileText,
  UploadCloud,
  Eye,
  Download,
  RefreshCw,
  Trash2,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// ResumeCard — Tab 3: Resume Management
// Allows Job Seeker to upload, preview, download, replace, or remove their resume.
// Drag & Drop support, PDF only, max 5 MB validation.
// Converts PDF to base64 data URL for upload.
// ─────────────────────────────────────────────────────────────────────────────

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB

export function ResumeCard({ profile, onSave, saving }) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const currentResume = profile?.profile?.resume || "";
  const currentResumeName =
    profile?.profile?.resumeOriginalName || "My_Resume.pdf";

  // ── Handle file selection / drop ──
  const processFile = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      toast.error("Only PDF files are supported for resumes.");
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      toast.error("Resume file size must be less than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile({
        name: file.name,
        base64: reader.result,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // ── Save Uploaded Resume ──
  const handleUploadSave = async () => {
    if (!selectedFile) return;

    const result = await onSave({
      resume: selectedFile.base64,
      resumeOriginalName: selectedFile.name,
    });

    if (result?.success) {
      toast.success("Resume uploaded successfully! 📄");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      toast.error(result?.message || "Failed to upload resume.");
    }
  };

  // ── Remove Resume ──
  const handleRemoveResume = async () => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove your resume? Recruiters will not be able to view your CV."
    );
    if (!confirmRemove) return;

    const result = await onSave({
      resume: "",
      resumeOriginalName: "",
    });

    if (result?.success) {
      toast.success("Resume removed.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      toast.error(result?.message || "Failed to remove resume.");
    }
  };

  // ── Download / Preview ──
  const handlePreview = () => {
    const resumeUrl = selectedFile ? selectedFile.base64 : currentResume;
    if (!resumeUrl) return;
    const win = window.open();
    if (win) {
      win.document.write(
        `<iframe src="${resumeUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
      );
    }
  };

  const handleDownload = () => {
    const resumeUrl = selectedFile ? selectedFile.base64 : currentResume;
    const filename = selectedFile ? selectedFile.name : currentResumeName;
    if (!resumeUrl) return;

    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = filename || "resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* ── Currently Saved Resume Card (if exists) ── */}
      {currentResume && !selectedFile && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-orange-200 text-primary shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  {currentResumeName}
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                    <FileCheck className="h-3 w-3" /> Active
                  </span>
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  PDF document · Ready for recruiter applications
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePreview}
                className="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-orange-100 hover:text-primary transition-colors"
              >
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-orange-100 hover:text-primary transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary hover:bg-orange-100 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Replace
              </button>
              <button
                type="button"
                onClick={handleRemoveResume}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-error hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Pending Selected File Preview (Before Save) ── */}
      {selectedFile && (
        <div className="rounded-2xl border-2 border-primary bg-orange-50 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {selectedFile.sizeMB} MB · Ready to upload
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                disabled={saving}
                className="rounded-xl border border-orange-200 bg-white px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-orange-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUploadSave}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-3.5 w-3.5" /> Save Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Drag & Drop Upload Zone ── */}
      {(!currentResume || selectedFile) && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
            dragOver
              ? "border-primary bg-orange-100/60 scale-[1.01]"
              : "border-orange-200 bg-white hover:border-primary/60 hover:bg-orange-50/50"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-primary mb-3">
            <UploadCloud className="h-7 w-7" />
          </div>
          <h4 className="text-base font-bold text-text-primary">
            Upload your Resume / CV
          </h4>
          <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
            Drag and drop your PDF resume here, or{" "}
            <span className="text-primary font-semibold underline">
              browse files
            </span>
          </p>
          <p className="text-[11px] text-text-secondary mt-3">
            Supports PDF format only · Max file size 5 MB
          </p>
        </div>
      )}

      {/* ── Empty State Card if no resume exists ── */}
      {!currentResume && !selectedFile && (
        <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-text-primary">
              No Resume Uploaded Yet
            </h5>
            <p className="text-xs text-text-secondary mt-0.5">
              Uploading your resume increases your interview chances by 80%.
              Recruiters prioritize candidates with attached CVs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
