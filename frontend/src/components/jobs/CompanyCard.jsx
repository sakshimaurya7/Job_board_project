import React from "react";
import { Building2, MapPin, Globe, Users, ExternalLink } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";

export const CompanyCard = ({ company }) => {
  if (!company) return null;

  const companyName = company.name || "Company Overview";
  const logo = company.logo;
  const location = company.location || "Global";
  const website = company.website;
  const description = company.description || "Leading innovator building cutting-edge solutions.";

  return (
    <Card className="p-6 bg-surface border border-border rounded-3xl shadow-soft">
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Building2 className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-text">About Company</h3>
      </div>

      <div className="flex items-center gap-3.5 mb-4">
        <Avatar src={logo} fallback={companyName} size="lg" />
        <div>
          <h4 className="text-base font-bold text-text">{companyName}</h4>
          <div className="flex items-center text-xs text-text-secondary gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed line-clamp-4 mb-4">
        {description}
      </p>

      <div className="space-y-2.5 pt-3 border-t border-border/60 text-xs">
        <div className="flex items-center justify-between text-text-secondary">
          <div className="flex items-center gap-1.5 font-medium">
            <Users className="w-4 h-4 text-primary" />
            <span>Company Size</span>
          </div>
          <span className="font-bold text-text">25-50 Employees</span>
        </div>

        {website && (
          <div className="flex items-center justify-between text-text-secondary pt-1">
            <div className="flex items-center gap-1.5 font-medium">
              <Globe className="w-4 h-4 text-primary" />
              <span>Website</span>
            </div>
            {/* href conditional rendering is used for the purpose like some websites will be saved as google.com so it will add the https: automatically and the website link will become https:google.com
              rel = "noopener noreferrer" is used to improve security and prevent the opened page from accessing the original page through the browser.
            */}
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CompanyCard;
