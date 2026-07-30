import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Globe,
  MapPin,
  Phone,
  Users,
  Calendar,
  Edit3,
  ExternalLink,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

// Inline SVG social icons (lucide-react doesn't export Facebook/Linkedin/Twitter/Github)
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
import { Button } from "../ui/button";

export function CompanyOverview({ company, onEditClick }) {
  if (!company) return null;

  const defaultBanner =
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="space-y-6">
      {/* Banner & Logo Card */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs relative">
        {/* Banner Image */}
        <div className="h-48 sm:h-64 w-full relative bg-gradient-to-r from-primary/20 via-primary/10 to-amber-500/20 overflow-hidden">
          <img
            src={company.banner || defaultBanner}
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30" />
        </div>

        {/* Header Details Layer */}
        <div className="px-6 pb-6 pt-0 relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Logo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-surface border-4 border-surface shadow-soft flex items-center justify-center font-bold text-3xl text-primary overflow-hidden shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-12 h-12 text-primary" />
              )}
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1 sm:mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
                  {company.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-200">
                  Verified Employer
                </span>
              </div>

              {company.tagline && (
                <p className="text-sm font-semibold text-primary">{company.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary pt-1">
                {company.industry && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    {company.industry}
                  </span>
                )}
                {company.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {company.location}
                  </span>
                )}
                {company.website && (
                  <a
                    href={
                      company.website.startsWith("http")
                        ? company.website
                        : `https://${company.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary font-bold hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {company.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="sm:mb-2 w-full sm:w-auto">
            <Button
              variant="primary"
              onClick={onEditClick}
              className="w-full sm:w-auto h-11 px-5 text-sm font-bold gap-2 rounded-xl shadow-md"
            >
              <Edit3 className="w-4 h-4" />
              Edit Company Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): About, Benefits, Social Links */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="p-6 bg-surface rounded-2xl border border-border space-y-3">
            <h3 className="text-lg font-bold text-text">About Company</h3>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {company.description ||
                "No detailed description provided yet. Click 'Edit Company Profile' to add your mission, culture, and overview."}
            </p>
          </div>

          {/* Perks & Benefits */}
          {company.benefits && company.benefits.length > 0 && (
            <div className="p-6 bg-surface rounded-2xl border border-border space-y-4">
              <h3 className="text-lg font-bold text-text">Employee Perks & Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-section border border-border/60 text-xs font-semibold text-text"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {company.socialLinks &&
            Object.values(company.socialLinks).some((link) => Boolean(link)) && (
              <div className="p-6 bg-surface rounded-2xl border border-border space-y-4">
                <h3 className="text-lg font-bold text-text">Connect & Social Media</h3>
                <div className="flex flex-wrap gap-3">
                  {company.socialLinks.linkedin && (
                    <a
                      href={company.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {company.socialLinks.twitter && (
                    <a
                      href={company.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold hover:bg-sky-100 transition-colors"
                    >
                      <TwitterIcon className="w-4 h-4" />
                      Twitter / X
                    </a>
                  )}
                  {company.socialLinks.github && (
                    <a
                      href={company.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-900 border border-gray-300 text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {company.socialLinks.facebook && (
                    <a
                      href={company.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold hover:bg-indigo-100 transition-colors"
                    >
                      <FacebookIcon className="w-4 h-4" />
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Right Column (1/3): Meta details card */}
        <div className="space-y-6">
          <div className="p-6 bg-surface rounded-2xl border border-border space-y-4">
            <h3 className="text-lg font-bold text-text border-b border-border pb-3">
              Company Overview
            </h3>

            <div className="space-y-4 text-xs font-medium">
              {company.companySize && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" /> Company Size
                  </span>
                  <span className="font-bold text-text">{company.companySize}</span>
                </div>
              )}

              {company.founded && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" /> Founded Year
                  </span>
                  <span className="font-bold text-text">{company.founded}</span>
                </div>
              )}

              {company.headquarters && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" /> Headquarters
                  </span>
                  <span className="font-bold text-text">{company.headquarters}</span>
                </div>
              )}

              {company.phone && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-primary" /> Contact Phone
                  </span>
                  <span className="font-bold text-text">{company.phone}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-1">
                <span className="text-text-secondary flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-primary" /> Active Job Listings
                </span>
                <span className="font-bold text-primary">
                  {company.jobs?.length || 0} Openings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;
