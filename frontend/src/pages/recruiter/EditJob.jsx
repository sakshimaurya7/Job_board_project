import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  DollarSign,
  MapPin,
  FileText,
  Users,
  Sparkles,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { recruiterService } from "../../services/recruiterService";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import LoadingSkeleton from "../../components/recruiter/LoadingSkeleton";
import EmptyState from "../../components/recruiter/EmptyState";

export function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "Mid Level",
    location: "",
    jobType: "Full-time",
    position: "1",
  });

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await recruiterService.getJobById(id);
        if (res.success && res.job) {
          const job = res.job;
          setFormData({
            title: job.title || "",
            description: job.description || "",
            requirements: Array.isArray(job.requirements)
              ? job.requirements.join(", ")
              : job.requirements || "",
            salary: job.salary !== undefined ? String(job.salary) : "",
            experienceLevel: job.experienceLevel || "Mid Level",
            location: job.location || "",
            jobType: job.jobType || "Full-time",
            position: job.position !== undefined ? String(job.position) : "1",
          });
        } else {
          setError(res.message || "Job listing not found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error loading job listing.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
        position: Number(formData.position),
        requirements: formData.requirements
          ? formData.requirements.split(",").map((r) => r.trim()).filter(Boolean)
          : [],
      };

      const res = await recruiterService.updateJob(id, payload);
      if (res.success) {
        toast.success("Job listing updated successfully!");
        navigate("/recruiter/jobs");
      } else {
        setError(res.message || "Failed to update job.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error updating job.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (error && !formData.title) {
    return (
      <EmptyState
        title="Job Listing Not Found"
        description={error}
        actionText="Back to Job Management"
        onAction={() => navigate("/recruiter/jobs")}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-surface p-6 rounded-2xl border border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/recruiter/jobs")}
            className="h-10 w-10 p-0 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </Button>
          <div>
            <h1 className="text-2xl font-black text-text">Edit Job Listing</h1>
            <p className="text-xs text-text-secondary truncate max-w-md">
              Update details for <span className="font-bold text-primary">{formData.title}</span>
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details Section */}
        <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">Job Specification</h3>
              <p className="text-xs text-text-secondary">Title, category, location & position details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Job Title */}
            <div className="space-y-2 md:col-span-2">
              <Label required>Job Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                icon={Briefcase}
                required
              />
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label required>Employment Type</Label>
              <Select
                value={formData.jobType}
                onChange={(e) => handleChange("jobType", e.target.value)}
                className="h-12 font-medium"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </Select>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label required>Experience Level</Label>
              <Select
                value={formData.experienceLevel}
                onChange={(e) => handleChange("experienceLevel", e.target.value)}
                className="h-12 font-medium"
              >
                <option value="Entry Level">Entry Level (0-2 yrs)</option>
                <option value="Mid Level">Mid Level (2-5 yrs)</option>
                <option value="Senior Level">Senior Level (5+ yrs)</option>
                <option value="Executive">Executive / Lead</option>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label required>Job Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                icon={MapPin}
                required
              />
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label required>Annual Salary (USD)</Label>
              <Input
                type="number"
                min="0"
                step="1000"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                placeholder="120000"
                icon={DollarSign}
                required
              />
            </div>

            {/* Number of Openings */}
            <div className="space-y-2">
              <Label required>Open Positions</Label>
              <Input
                type="number"
                min="0"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="1"
                icon={Users}
                required
              />
            </div>
          </div>
        </div>

        {/* Description & Requirements */}
        <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">Description & Requirements</h3>
              <p className="text-xs text-text-secondary">Detailed job duties, qualifications and tech stack</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label required>Job Description</Label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={6}
              placeholder="Outline role summary, responsibilities, day-to-day work..."
              className="w-full p-4 bg-section rounded-xl border border-border text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-all leading-relaxed"
              required
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label required>Key Skills & Qualifications (Comma Separated)</Label>
            <Input
              value={formData.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              placeholder="e.g. React.js, Node.js, TypeScript"
              icon={Sparkles}
              required
            />
          </div>
        </div>

        {/* Submit Controls */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/recruiter/jobs")}
            className="h-12 px-6 font-semibold rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="h-12 px-8 text-base font-bold shadow-md hover:shadow-lg rounded-xl gap-2"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Job Listing
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditJob;
