import React from "react";
import { Globe, ExternalLink, MessageSquare } from "lucide-react";
import { Card } from "../ui/card";

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const CompanySocialLinks = ({ company }) => {
  const { website, linkedin, github, twitter, facebook, instagram } = company || {};

  const links = [
    { id: "website", label: "Website", url: website, icon: Globe, color: "hover:text-primary" },
    { id: "linkedin", label: "LinkedIn", url: linkedin || (website ? `https://linkedin.com/company/${company.name?.toLowerCase().replace(/\s+/g, '-')}` : null), icon: LinkedinIcon, color: "hover:text-info" },
    { id: "github", label: "GitHub", url: github, icon: GithubIcon, color: "hover:text-text" },
    { id: "twitter", label: "Twitter / X", url: twitter, icon: TwitterIcon, color: "hover:text-info" },
    { id: "facebook", label: "Facebook", url: facebook, icon: FacebookIcon, color: "hover:text-info" },
    { id: "instagram", label: "Instagram", url: instagram, icon: InstagramIcon, color: "hover:text-secondary" },
  ].filter((item) => Boolean(item.url));

  if (links.length === 0) return null;

  return (
    <Card className="p-6 bg-surface border border-border rounded-3xl shadow-soft mb-8">
      <h3 className="text-base font-extrabold text-text mb-4">Connect & Social Media</h3>
      <div className="flex flex-wrap items-center gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          const formattedUrl = link.url.startsWith("http") ? link.url : `https://${link.url}`;
          return (
            <a
              key={link.id}
              href={formattedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-section border border-border text-xs font-bold text-text-secondary ${link.color} hover:bg-surface hover:shadow-sm transition-all duration-300`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          );
        })}
      </div>
    </Card>
  );
};

export default CompanySocialLinks;
