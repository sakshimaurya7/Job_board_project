import React from "react";
import { MapPin, Clock, Globe, HeadphonesIcon, Building2 } from "lucide-react";

// ─── Map placeholder ──────────────────────────────────────────────────────────
const MapPlaceholder = () => (
  <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-section">
    {/* Grid pattern */}
    <svg
      className="absolute inset-0 h-full w-full opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F97316" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    {/* Concentric rings */}
    <div className="absolute h-48 w-48 rounded-full border border-primary/10" />
    <div className="absolute h-32 w-32 rounded-full border border-primary/20" />
    <div className="absolute h-16 w-16 rounded-full border border-primary/30" />

    {/* Map pin */}
    <div className="relative flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-soft-lg">
        <MapPin className="h-7 w-7" />
      </div>
      <div className="rounded-xl bg-surface border border-border px-4 py-2 shadow-soft text-center">
        <p className="text-xs font-bold text-text">JobHub HQ</p>
        <p className="text-xs text-text-secondary">Bangalore, India</p>
      </div>
    </div>

    {/* Future-ready label */}
    <div className="absolute bottom-3 right-3 rounded-lg border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-text-secondary shadow-sm">
      Interactive map — coming soon
    </div>
  </div>
);

// ─── Hours row ────────────────────────────────────────────────────────────────
const HoursRow = ({ day, hours, isToday }) => (
  <div
    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
      isToday ? "bg-primary/10 border border-primary/30" : "hover:bg-section"
    } transition-colors`}
  >
    <span className={`font-semibold ${isToday ? "text-primary" : "text-text"}`}>
      {day}
      {isToday && (
        <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
          Today
        </span>
      )}
    </span>
    <span className={`font-medium ${isToday ? "text-primary" : "text-text-secondary"}`}>
      {hours}
    </span>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export function OfficeInfo() {
  const today = new Date().getDay(); // 0=Sun, 1=Mon...

  const schedule = [
    { day: "Monday",    hours: "9:00 AM – 6:00 PM", dayNum: 1 },
    { day: "Tuesday",   hours: "9:00 AM – 6:00 PM", dayNum: 2 },
    { day: "Wednesday", hours: "9:00 AM – 6:00 PM", dayNum: 3 },
    { day: "Thursday",  hours: "9:00 AM – 6:00 PM", dayNum: 4 },
    { day: "Friday",    hours: "9:00 AM – 6:00 PM", dayNum: 5 },
    { day: "Saturday",  hours: "Closed",            dayNum: 6 },
    { day: "Sunday",    hours: "Closed",            dayNum: 0 },
  ];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-section px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-soft-sm">
            <Building2 className="h-3.5 w-3.5" />
            Find Us
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Office Information
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Visit us, call us, or drop us an email. Our team is ready to assist
            you during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* ── Left: Map ── */}
          <div className="flex flex-col gap-6">
            <MapPlaceholder />

            {/* Address card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-1">
                  Office Address
                </p>
                <p className="text-base font-semibold text-text leading-relaxed">
                  JobHub Technologies Pvt. Ltd.
                  <br />
                  123, Tech Park, Whitefield
                  <br />
                  Bangalore, Karnataka 560066
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col gap-6">
            {/* Business hours */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text">Business Hours</h3>
              </div>
              <div className="space-y-1">
                {schedule.map((item) => (
                  <HoursRow
                    key={item.day}
                    day={item.day}
                    hours={item.hours}
                    isToday={today === item.dayNum}
                  />
                ))}
              </div>
            </div>

            {/* Support availability + timezone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-section p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                  <HeadphonesIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Support
                  </p>
                  <p className="text-sm font-bold text-text mt-1">
                    Mon – Fri
                  </p>
                  <p className="text-xs text-text-secondary">
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-section p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Timezone
                  </p>
                  <p className="text-sm font-bold text-text mt-1">
                    IST (UTC +5:30)
                  </p>
                  <p className="text-xs text-text-secondary">
                    India Standard Time
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
