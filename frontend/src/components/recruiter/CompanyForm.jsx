import React, { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Phone,
  Users,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  Save,
  Loader2,
  CheckCircle2,
  Link2,
} from "lucide-react";

// Inline SVG social icons
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { Label } from "../ui/label";
import { ImageUploadCard } from "../common/ImageUploadCard";

export function CompanyForm({ initialValues = {}, onSubmit, loading, isSetup = false }) {
  const [formData, setFormData] = useState({
    name: initialValues.name || initialValues.companyName || "",
    tagline: initialValues.tagline || "",
    industry: initialValues.industry || "Technology",
    website: initialValues.website || "",
    phone: initialValues.phone || "",
    location: initialValues.location || "",
    headquarters: initialValues.headquarters || "",
    companySize: initialValues.companySize || "11-50 employees",
    founded: initialValues.founded || "",
    logo: initialValues.logo || "",
    banner: initialValues.banner || initialValues.coverImage || "",
    description: initialValues.description || "",
    benefits: Array.isArray(initialValues.benefits)
      ? initialValues.benefits.join(", ")
      : initialValues.benefits || "",
    socialLinks: {
      linkedin: initialValues.socialLinks?.linkedin || "",
      twitter: initialValues.socialLinks?.twitter || "",
      facebook: initialValues.socialLinks?.facebook || "",
      github: initialValues.socialLinks?.github || "",
    },
  });

  // Selected image File objects
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [removeBanner, setRemoveBanner] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const benefitsArray = formData.benefits
      ? formData.benefits.split(",").map((b) => b.trim()).filter(Boolean)
      : [];

    const data = new FormData();
    data.append("name", formData.name);
    data.append("companyName", formData.name);
    data.append("tagline", formData.tagline);
    data.append("industry", formData.industry);
    data.append("website", formData.website);
    data.append("phone", formData.phone);
    data.append("location", formData.location);
    data.append("headquarters", formData.headquarters);
    data.append("companySize", formData.companySize);
    data.append("founded", formData.founded);
    data.append("description", formData.description);
    data.append("benefits", JSON.stringify(benefitsArray));
    data.append("socialLinks", JSON.stringify(formData.socialLinks));

    // Handle logo file upload or removal
    if (logoFile) {
      data.append("logo", logoFile);
    } else if (removeLogo) {
      data.append("removeLogo", "true");
    } else {
      data.append("logo", formData.logo);
    }

    // Handle banner file upload or removal
    if (bannerFile) {
      data.append("banner", bannerFile);
    } else if (removeBanner) {
      data.append("removeBanner", "true");
    } else {
      data.append("banner", formData.banner);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Company Identity Section */}
      <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">Basic Company Details</h3>
            <p className="text-xs text-text-secondary">Official organization profile information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Company Name */}
          <div className="space-y-2">
            <Label required>Company Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Acme Corporation"
              icon={Building2}
              required
            />
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label>Company Tagline</Label>
            <Input
              value={formData.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
              placeholder="e.g. Building the future of software"
              icon={Sparkles}
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label required>Industry</Label>
            <Select
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              className="h-12 font-medium"
            >
              <option value="Technology">Technology / Software</option>
              <option value="Finance">Finance & Banking</option>
              <option value="Healthcare">Healthcare & Biotech</option>
              <option value="E-Commerce">E-Commerce & Retail</option>
              <option value="Education">Education & EdTech</option>
              <option value="Marketing">Marketing & Advertising</option>
              <option value="Design">Design & Creative Agency</option>
              <option value="Other">Other Industry</option>
            </Select>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label>Company Size</Label>
            <Select
              value={formData.companySize}
              onChange={(e) => handleChange("companySize", e.target.value)}
              className="h-12 font-medium"
            >
              <option value="1-10 employees">1-10 employees (Startup)</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="51-200 employees">51-200 employees</option>
              <option value="201-500 employees">201-500 employees</option>
              <option value="500+ employees">500+ employees (Enterprise)</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Brand Media Section: Logo Upload & Banner Upload Cards */}
      <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">Company Branding & Images</h3>
            <p className="text-xs text-text-secondary">
              Upload your official company logo and cover banner image
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo Upload Card */}
          <ImageUploadCard
            type="logo"
            label="Company Logo"
            description="Displayed on job cards, listings, and headers. Accepts PNG, JPG, WEBP (Max 5MB)."
            currentImageUrl={removeLogo ? "" : formData.logo}
            onFileSelect={(file) => {
              setLogoFile(file);
              setRemoveLogo(false);
            }}
            onImageRemove={() => {
              setLogoFile(null);
              setRemoveLogo(true);
            }}
          />

          {/* Cover Banner Upload Card */}
          <ImageUploadCard
            type="banner"
            label="Company Cover Banner"
            description="Displayed at top of Company Details & Overview page. Accepts PNG, JPG, WEBP (Max 5MB)."
            currentImageUrl={removeBanner ? "" : formData.banner}
            onFileSelect={(file) => {
              setBannerFile(file);
              setRemoveBanner(false);
            }}
            onImageRemove={() => {
              setBannerFile(null);
              setRemoveBanner(true);
            }}
          />
        </div>
      </div>

      {/* Contact & Location Section */}
      <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">Contact & Location</h3>
            <p className="text-xs text-text-secondary">Where candidates can find or contact you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Website URL */}
          <div className="space-y-2">
            <Label>Website URL</Label>
            <Input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://example.com"
              icon={Globe}
            />
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label>Contact Phone</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              icon={Phone}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label required>Primary Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g. San Francisco, CA or Remote"
              icon={MapPin}
              required
            />
          </div>

          {/* Headquarters */}
          <div className="space-y-2">
            <Label>Headquarters Address</Label>
            <Input
              value={formData.headquarters}
              onChange={(e) => handleChange("headquarters", e.target.value)}
              placeholder="e.g. 100 Innovation Way, Suite 400"
              icon={Building2}
            />
          </div>

          {/* Founded Year */}
          <div className="space-y-2">
            <Label>Founded Year</Label>
            <Input
              value={formData.founded}
              onChange={(e) => handleChange("founded", e.target.value)}
              placeholder="e.g. 2018"
              icon={Calendar}
            />
          </div>
        </div>
      </div>

      {/* Description & Benefits Section */}
      <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">Description & Benefits</h3>
            <p className="text-xs text-text-secondary">Tell candidates what makes your workplace special</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label required>Company Overview & Description</Label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={5}
            placeholder="Share your company mission, team culture, product vision, and engineering philosophy..."
            className="w-full p-4 bg-section rounded-xl border border-border text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-all leading-relaxed"
            required
          />
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <Label>Perks & Benefits (Comma Separated)</Label>
          <Input
            value={formData.benefits}
            onChange={(e) => handleChange("benefits", e.target.value)}
            placeholder="e.g. Health Insurance, Remote Work Allowance, Unlimited PTO, 401(k) Matching"
            icon={CheckCircle2}
          />
          <p className="text-[11px] text-text-secondary">Separate each benefit with a comma.</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">Social Media Profiles</h3>
            <p className="text-xs text-text-secondary">Links to your public social media pages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label>LinkedIn Profile URL</Label>
            <Input
              type="url"
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
              icon={Link2}
            />
          </div>

          <div className="space-y-2">
            <Label>Twitter / X Profile URL</Label>
            <Input
              type="url"
              value={formData.socialLinks.twitter}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              placeholder="https://twitter.com/yourcompany"
              icon={Link2}
            />
          </div>

          <div className="space-y-2">
            <Label>GitHub Profile URL</Label>
            <Input
              type="url"
              value={formData.socialLinks.github}
              onChange={(e) => handleSocialChange("github", e.target.value)}
              placeholder="https://github.com/yourcompany"
              icon={Link2}
            />
          </div>

          <div className="space-y-2">
            <Label>Facebook Page URL</Label>
            <Input
              type="url"
              value={formData.socialLinks.facebook}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              placeholder="https://facebook.com/yourcompany"
              icon={Link2}
            />
          </div>
        </div>
      </div>

      {/* Submit Controls */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="h-12 px-8 text-base font-bold shadow-md hover:shadow-lg rounded-xl gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving Profile...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              {isSetup ? "Complete Setup & Access Dashboard" : "Save Company Profile"}
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}

export default CompanyForm;
