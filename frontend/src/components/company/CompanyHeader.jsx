import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Globe,
  CheckCircle2,
  Share2,
  Plus,
  Check,
  Calendar,
  Users,
  Briefcase,
  Star,
  Sparkles,
} from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const CompanyHeader = ({ company }) => {
  const [following, setFollowing] = useState(false);

  const {
    name,
    logo,
    location = "Remote",
    website = "",
    industry = "Technology",
    companySize = "50-200",
    size,
    foundedYear = "2020",
    isVerified = true,
    rating = 4.8,
    jobs = [],
  } = company;

  const openJobsCount = Array.isArray(jobs) ? jobs.length : 0;
  const displaySize = size || companySize;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${name} on JobHub`,
          text: `Check out open positions at ${name}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Company profile link copied to clipboard!");
    }
  };

  const toggleFollow = () => {
    setFollowing((prev) => !prev);
    if (!following) {
      toast.success(`You are now following ${name}`);
    } else {
      toast.info(`Unfollowed ${name}`);
    }
  };

  return (
    <div className="relative bg-surface border border-border rounded-3xl overflow-hidden shadow-soft mb-8">
      {/* Top Banner Gradient Background */}
      <div className="h-44 sm:h-56 w-full bg-gradient-to-r from-primary/90 via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        {/* Subtle Background Pattern */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute left-10 top-5 w-40 h-40 bg-accent/20 rounded-full blur-xl" />
      </div>

      {/* Main Profile Info Section */}
      <div className="px-6 sm:px-8 pb-8 pt-0 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
          {/* Company Logo Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative p-1.5 bg-surface rounded-3xl shadow-soft-lg border-2 border-border">
              <Avatar
                src={logo}
                fallback={name}
                alt={name}
                size="xl"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl"
              />
              {isVerified && (
                <div
                  className="absolute bottom-2 right-2 bg-surface rounded-full p-1 shadow-md"
                  title="Verified Employer"
                >
                  <CheckCircle2 className="w-6 h-6 text-success fill-success/15" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                  {name}
                </h1>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-success/10 text-success border border-success/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-primary">{industry}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-secondary" /> {displaySize} Employees
                </span>
                {website && (
                  <>
                    <span>•</span>
                    <a
                      href={website.startsWith("http") ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      <Globe className="w-3.5 h-3.5" /> Website
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: Follow & Share */}
          <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
            <Button
              onClick={handleShare}
              variant="outline"
              className="h-11 px-4 text-xs font-bold border-border text-text-secondary hover:text-primary gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>

            <Button
              onClick={toggleFollow}
              variant={following ? "secondary" : "primary"}
              className="h-11 px-6 text-xs font-bold gap-2 shadow-sm"
            >
              {following ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Follow Company</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/60">
          <div className="p-3.5 rounded-2xl bg-section/80 border border-border/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Open Positions</p>
              <p className="text-sm font-extrabold text-text">{openJobsCount} Jobs</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-section/80 border border-border/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
              <Star className="w-5 h-5 fill-warning" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Employee Rating</p>
              <p className="text-sm font-extrabold text-text">{rating} / 5.0</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-section/80 border border-border/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Founded Year</p>
              <p className="text-sm font-extrabold text-text">{foundedYear}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-section/80 border border-border/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-success/10 text-success flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Culture</p>
              <p className="text-sm font-extrabold text-text">Innovative & Inclusive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
