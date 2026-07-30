import React, { useState } from "react";
import { Select } from "../ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { applicationService } from "../../services/applicationService";

export function StatusDropdown({ applicationId, currentStatus, onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus || "pending");

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === status) return;

    setLoading(true);
    try {
      // Call the API to persist the status change
      await applicationService.updateApplicationStatus(applicationId, newStatus);
      setStatus(newStatus);
      toast.success(`Status updated to '${newStatus}'.`);
      // Notify parent for optimistic UI sync
      if (onStatusChange) {
        onStatusChange(applicationId, newStatus);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  const getSelectStyle = (st) => {
    const lower = (st || "").toLowerCase();
    if (lower === "pending") return "border-amber-300 text-amber-800 bg-amber-50/60";
    if (lower === "reviewed") return "border-blue-300 text-blue-800 bg-blue-50/60";
    if (lower === "interview") return "border-purple-300 text-purple-800 bg-purple-50/60";
    if (lower === "accepted" || lower === "selected") return "border-emerald-300 text-emerald-800 bg-emerald-50/60";
    if (lower === "rejected") return "border-rose-300 text-rose-800 bg-rose-50/60";
    return "border-border text-text bg-surface";
  };

  return (
    <div className="relative flex items-center gap-2">
      <Select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className={`h-9 text-xs font-bold rounded-xl border transition-colors shadow-xs ${getSelectStyle(
          status
        )}`}
      >
        <option value="pending">⏳ Pending</option>
        <option value="reviewed">👀 Reviewed</option>
        <option value="interview">📹 Interview</option>
        <option value="selected">✅ Selected</option>
        <option value="rejected">❌ Rejected</option>
      </Select>
      {loading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
    </div>
  );
}

export default StatusDropdown;
