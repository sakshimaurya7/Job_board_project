import React from "react";
import { Globe, Mail, Phone, MapPin, ExternalLink, Building } from "lucide-react";
import { Card } from "../ui/card";

export const CompanyContact = ({ company }) => {
  const {
    website,
    email = `contact@${company.name?.toLowerCase().replace(/\s+/g, '') || 'company'}.com`,
    phone = "+1 (555) 019-2834",
    location = "San Francisco, CA",
    address = company.address || `${location}`,
  } = company || {};

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.name || ''} ${address}`
  )}`;

  return (
    <Card className="p-6 bg-surface border border-border rounded-3xl shadow-soft mb-8 space-y-4">
      <div className="flex items-center gap-2 text-text font-extrabold text-base border-b border-border/60 pb-3">
        <Building className="w-4 h-4 text-primary" />
        <h3>Contact & Office Information</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {website && (
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-section/70 border border-border/50">
            <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-text-secondary">Website</p>
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold line-clamp-1"
              >
                {website}
              </a>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-section/70 border border-border/50 min-w-0">
          <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-text-secondary">Business Email</p>
            <a href={`mailto:${email}`} className="text-text hover:text-primary font-semibold truncate block" title={email}>
              {email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-section/70 border border-border/50">
          <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-text-secondary">Phone Number</p>
            <p className="text-text font-semibold">{phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-section/70 border border-border/50">
          <MapPin className="w-4 h-4 text-error shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-text-secondary">Headquarters Address</p>
            <p className="text-text font-semibold line-clamp-1">{address}</p>
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-bold mt-1 inline-flex items-center gap-1 text-[11px]"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompanyContact;
