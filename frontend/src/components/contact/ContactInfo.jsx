import React from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { ContactCard } from "./ContactCard";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    title: "Email Support",
    value: "support@jobhub.com",
    subtitle: "For general queries and job seeker help",
  },
  {
    icon: Mail,
    title: "Business Email",
    value: "business@jobhub.com",
    subtitle: "Partnerships, recruiters & enterprise plans",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 98765 43210",
    subtitle: "Mon – Fri, 9:00 AM – 6:00 PM IST",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Mon – Fri · 9 AM – 6 PM",
    subtitle: "Indian Standard Time (IST, UTC +5:30)",
  },
];

export function ContactInfo() {
  return (
    <section className="bg-section py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-soft-sm">
            <MapPin className="h-3.5 w-3.5" />
            Contact Details
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Ways to Reach Us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary leading-relaxed">
            Choose the channel that works best for you. We're available across
            multiple touchpoints to ensure you get help fast.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CONTACT_ITEMS.map((item) => (
            <ContactCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
