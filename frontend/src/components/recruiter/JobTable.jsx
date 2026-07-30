import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Edit3,
  Trash2,
  MapPin,
  DollarSign,
  Calendar,
  AlertTriangle,
  MoreVertical,
  PlusCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { recruiterService } from "../../services/recruiterService";

export function JobTable({ jobs = [], onDeleteSuccess }) {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await recruiterService.deleteJob(deleteTarget._id);
      if (res.success) {
        toast.success("Job listing deleted successfully.");
        if (onDeleteSuccess) onDeleteSuccess(deleteTarget._id);
        setDeleteTarget(null);
      } else {
        toast.error(res.message || "Failed to delete job.");
      }
    } catch (err) {
      toast.error(err.message || "Error deleting job.");
    } finally {
      setDeleting(false);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="p-12 text-center bg-surface rounded-2xl border border-border">
        <Briefcase className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-40" />
        <h4 className="text-lg font-bold text-text">No Jobs Found</h4>
        <p className="text-sm text-text-secondary mt-1 max-w-sm mx-auto mb-6">
          You haven't posted any jobs yet matching your filter criteria.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate("/recruiter/jobs/create")}
          className="h-11 px-6 text-sm font-bold gap-2 rounded-xl"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Job Listing
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium border-collapse">
            <thead>
              <tr className="bg-section text-text-secondary border-b border-border uppercase tracking-wider text-[11px]">
                <th className="py-4 px-5">Job Details</th>
                <th className="py-4 px-5">Location</th>
                <th className="py-4 px-5">Salary</th>
                <th className="py-4 px-5">Experience</th>
                <th className="py-4 px-5">Applicants</th>
                <th className="py-4 px-5">Posted Date</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {jobs.map((job) => {
                const applicantCount = job.applications?.length || 0;
                const createdDate = job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <tr key={job._id} className="hover:bg-section/50 transition-colors">
                    {/* Job Details */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h4
                            onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}
                            className="text-sm font-bold text-text hover:text-primary cursor-pointer transition-colors line-clamp-1"
                          >
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge type={job.jobType || "Full-time"} />
                            <span className="text-[11px] text-text-secondary">
                              {job.position || 1} Openings
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1 text-text">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-semibold">{job.location}</span>
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="font-bold text-text text-sm">
                        ${Number(job.salary || 0).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-text-secondary block">/ year</span>
                    </td>

                    {/* Experience */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-section rounded-lg border border-border text-text font-semibold">
                        {job.experienceLevel || "Mid Level"}
                      </span>
                    </td>

                    {/* Applicants */}
                    <td className="py-4 px-5">
                      <button
                        onClick={() => navigate(`/recruiter/applicants?jobId=${job._id}`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-bold"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{applicantCount} Candidates</span>
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="py-4 px-5 text-text-secondary whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{createdDate}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}
                          className="h-8 px-3 text-xs font-semibold gap-1 rounded-xl"
                          title="Edit Job"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-primary" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(job)}
                          className="h-8 w-8 p-0 rounded-xl text-error hover:bg-error/10 hover:text-error"
                          title="Delete Job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center font-bold mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text">Delete Job Listing?</h3>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-text">"{deleteTarget.title}"</span>? All associated candidate application records for this position will be affected.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="h-10 px-4 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="h-10 px-5 text-xs font-bold rounded-xl gap-2"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobTable;
