import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  Eye,
  Trash2,
  AlertTriangle,
  FileText,
  DollarSign,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StatusBadge } from "./StatusBadge";
import { toast } from "sonner";

export function MyApplicationCard({ application, onWithdraw, onViewDetails }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  if (!application) return null;

  const {
    _id,
    job,
    status = "pending",
    createdAt,
  } = application;

  const jobTitle = job?.title || "Job Listing";
  const companyName = job?.company?.name || job?.companyName || "Company";
  const companyLogo = job?.company?.logo;
  const location = job?.location || "Remote";
  const jobType = job?.jobType || "Full Time";
  const salary = job?.salary ? `$${job.salary.toLocaleString()}/yr` : "Competitive";
  const formattedAppliedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const isPending = status.toLowerCase() === "pending";

  const handleConfirmWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      if (onWithdraw) {
        await onWithdraw(_id);
        toast.success("Application withdrawn successfully.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to withdraw application.");
    } finally {
      setIsWithdrawing(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="group relative bg-surface p-6 rounded-2xl border border-border transition-all duration-300 hover:shadow-soft-lg hover:border-primary/40 flex flex-col justify-between">
      <div>
        {/* Top Header: Logo, Company Name, Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3.5">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="w-12 h-12 rounded-2xl object-cover border border-border shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shadow-xs">
                {companyName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="text-xs font-bold text-text-secondary flex items-center gap-1 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                {companyName}
              </h4>
              <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors duration-200 line-clamp-1">
                {jobTitle}
              </h3>
            </div>
          </div>

          <StatusBadge status={status} />
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge type={jobType} />
          <div className="flex items-center text-xs font-medium text-text-secondary px-2.5 py-1 bg-section rounded-full border border-border/50">
            <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
            {location}
          </div>
          <div className="flex items-center text-xs font-medium text-text-secondary px-2.5 py-1 bg-section rounded-full border border-border/50">
            <DollarSign className="w-3.5 h-3.5 mr-0.5 text-emerald-600" />
            {salary}
          </div>
        </div>

        {/* Metadata Footer: Applied Date & Application ID */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary py-3 border-t border-b border-border/60 mb-4 bg-section/40 rounded-xl px-3">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Applied on {formattedAppliedDate}</span>
          </div>
          <div className="font-mono text-[11px] bg-surface px-2 py-0.5 rounded border border-border/60">
            ID: {_id ? _id.slice(-6) : "N/A"}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Link to={`/jobs/${job?._id || job}`} className="flex-1">
          <Button variant="outline" className="w-full h-10 text-xs font-semibold rounded-xl gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            View Job
          </Button>
        </Link>

        {onViewDetails && (
          <Button
            variant="secondary"
            onClick={() => onViewDetails(application)}
            className="h-10 px-3.5 text-xs font-semibold rounded-xl gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            Details
          </Button>
        )}

        {isPending && (
          <Button
            variant="outline"
            onClick={() => setShowConfirm(true)}
            className="h-10 px-3.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border-rose-200 rounded-xl gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Withdraw
          </Button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface border border-border p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-xl bg-rose-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-text">Withdraw Application?</h4>
                <p className="text-xs text-text-secondary">
                  Are you sure you want to cancel your application for <span className="font-semibold text-text">{jobTitle}</span>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                disabled={isWithdrawing}
                className="h-10 px-4 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmWithdraw}
                disabled={isWithdrawing}
                className="h-10 px-4 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
              >
                {isWithdrawing ? "Withdrawing..." : "Confirm Withdraw"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApplicationCard;
