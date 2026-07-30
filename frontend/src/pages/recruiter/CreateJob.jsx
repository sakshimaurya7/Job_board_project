import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  DollarSign,
  MapPin,
  FileText,
  Users,
  Layers,
  Sparkles,
  ArrowLeft,
  PlusCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { recruiterService } from "../../services/recruiterService";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select";
import { Label } from "../../components/ui/label";

export function CreateJob() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loadingCompany, setLoadingCompany] = useState(true);
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

  // Verify company exists
  useEffect(() => {
    const checkCompany = async () => {
      setLoadingCompany(true);
      try {
        const res = await recruiterService.getMyCompany();
        if (res.success && res.companies && res.companies.length > 0) {
          const comp = res.companies[0];
          setCompanyId(comp._id);
          setCompanyName(comp.name);
          if (!formData.location && comp.location) {
            setFormData((prev) => ({ ...prev, location: comp.location }));
          }
        } else {
          toast.warning("Please complete your company setup before posting a job.");
          navigate("/company/setup");
        }
      } catch (err) {
        toast.error("Failed to verify company ownership.");
      } finally {
        setLoadingCompany(false);
      }
    };

    checkCompany();
  }, [navigate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyId) {
      toast.error("No company profile linked.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
        position: Number(formData.position),
        companyId,
        requirements: formData.requirements
          ? formData.requirements.split(",").map((r) => r.trim()).filter(Boolean)
          : [],
      };

      const res = await recruiterService.createJob(payload);
      if (res.success) {
        toast.success("Job opening posted successfully!");
        navigate("/recruiter/jobs");
      } else {
        setError(res.message || "Failed to post job.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error posting job.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCompany) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
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
            <h1 className="text-2xl font-black text-text">Post a New Job Opening</h1>
            <p className="text-xs text-text-secondary">
              Listing under <span className="font-bold text-primary">{companyName}</span>
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
                placeholder="e.g. Senior Full Stack Engineer (React & Node.js)"
                icon={Briefcase}
                required
                autoFocus
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
                placeholder="e.g. 120000"
                icon={DollarSign}
                required
              />
            </div>

            {/* Number of Openings */}
            <div className="space-y-2">
              <Label required>Open Positions</Label>
              <Input
                type="number"
                min="1"
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
              placeholder="Outline role summary, responsibilities, day-to-day work, and candidate expectations..."
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
              placeholder="e.g. React.js, Node.js, TypeScript, PostgreSQL, AWS, Docker"
              icon={Sparkles}
              required
            />
            <p className="text-[11px] text-text-secondary">Separate skills with commas.</p>
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
                Publishing Listing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Publish Job Listing
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;
