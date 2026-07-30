import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Users,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Star,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const CompanyCard = ({ company }) => {
  const {
    _id,
    name,
    logo,
    location = "Remote",
    description = "",
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

  return (
    <Card className="group relative flex flex-col justify-between p-6 bg-surface border border-border rounded-2xl shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
      <div>
        {/* Top Bar: Logo, Name, Verified Badge, Rating */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <Avatar
                src={logo}
                fallback={name}
                alt={name}
                size="lg"
                className="border-2 border-border group-hover:border-primary/50 transition-colors shadow-sm"
              />
              {isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-surface rounded-full p-0.5 shadow-sm"
                  title="Verified Employer"
                >
                  <CheckCircle2 className="w-4 h-4 text-success fill-success/10" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  to={`/companies/${_id}`}
                  className="font-bold text-text text-base group-hover:text-primary transition-colors line-clamp-1"
                >
                  {name}
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-secondary mt-0.5">
                <span className="font-semibold text-primary">{industry}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-text-secondary" />
                  <span className="truncate max-w-[120px]">{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Placeholder */}
          <div className="flex items-center gap-1 bg-warning/10 text-warning px-2.5 py-1 rounded-xl border border-warning/20 shrink-0 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Company Quick Badges: Size & Open Jobs */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-section text-text-secondary border border-border">
            <Users className="w-3 h-3 text-secondary" />
            {displaySize} Employees
          </span>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${
              openJobsCount > 0
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-section text-text-secondary border-border"
            }`}
          >
            <Briefcase className="w-3 h-3" />
            {openJobsCount} {openJobsCount === 1 ? "Open Job" : "Open Jobs"}
          </span>

          {foundedYear && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-section text-text-secondary border border-border hidden sm:inline-flex">
              <Calendar className="w-3 h-3 text-text-secondary" />
              Est. {foundedYear}
            </span>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-5 min-h-[2.5rem]">
          {description || "Leading innovator building next-generation digital solutions and empowered workplace culture."}
        </p>
      </div>

      <div>
        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
          {website ? (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-semibold text-text-secondary hover:text-primary flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website</span>
            </a>
          ) : (
            <span className="text-xs text-text-secondary font-medium">Verified Partner</span>
          )}

          <Link to={`/companies/${_id}`}>
            <Button
              variant="outline"
              className="h-9 px-4 text-xs font-bold border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 gap-1.5 shadow-sm"
            >
              <span>View Company</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;
