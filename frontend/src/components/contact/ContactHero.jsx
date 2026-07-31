import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Briefcase,
  ArrowRight,
  Sparkles,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../ui/button";

// ─── Floating badge sub-component ───────────────────────────────────────────
const FloatingBadge = ({ icon: Icon, label, value, colorClass, delay = "" }) => (
  <div
    className={`flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft-lg ${delay}`}
  >
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${colorClass}`}
    >
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-xs font-medium text-text-secondary">{label}</p>
      <p className="text-sm font-extrabold text-text">{value}</p>
    </div>
  </div>
);

// ─── Conversation thread illustration ────────────────────────────────────────
const ConversationIllustration = () => (
  <div className="relative rounded-3xl border border-border bg-surface p-6 shadow-soft-lg overflow-hidden group">
    {/* Soft glow */}
    <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-accent/30 blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />

    {/* Header */}
    <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/40 bg-section text-primary shadow-soft-sm">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text">Support Center</h4>
          <p className="text-xs text-text-secondary">JobHub Platform</p>
        </div>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-success/10 border border-success/20 px-3 py-1 text-xs font-bold text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
        Online
      </span>
    </div>

    {/* Chat bubbles */}
    <div className="space-y-3">
      {/* Incoming */}
      <div className="flex items-end gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-section border border-border text-xs font-bold text-primary">
          JH
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-section border border-border px-3.5 py-2.5 text-xs text-text leading-relaxed">
          Hi there! How can we help you today? 👋
        </div>
      </div>

      {/* Outgoing */}
      <div className="flex items-end gap-2 flex-row-reverse">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
          U
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-xs text-white leading-relaxed">
          I need help with my job application.
        </div>
      </div>

      {/* Incoming */}
      <div className="flex items-end gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-section border border-border text-xs font-bold text-primary">
          JH
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-section border border-border px-3.5 py-2.5 text-xs text-text leading-relaxed">
          Of course! Let me look into that for you right away ✅
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-section border border-border text-xs font-bold text-primary">
          JH
        </div>
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-section border border-border px-4 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>

    {/* Response time bar */}
    <div className="mt-5 rounded-xl border border-border bg-background p-3">
      <div className="flex items-center justify-between text-xs font-semibold text-text mb-1.5">
        <span>Average Response Time</span>
        <span className="text-primary">Under 2 hours</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/50">
        <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-primary to-secondary" />
      </div>
    </div>
  </div>
);

// ─── Main hero component ──────────────────────────────────────────────────────
export function ContactHero() {
  const scrollToForm = () => {
    const formEl = document.getElementById("contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Background soft glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-96 w-full max-w-7xl -translate-x-1/2 rounded-full bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* ── Left: Content ── */}
          <div className="space-y-6 text-left lg:col-span-7">
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-section px-4 py-2 text-xs font-semibold tracking-wide text-primary shadow-soft md:text-sm">
              <Sparkles className="h-4 w-4 animate-pulse text-primary" />
              <span>We're Here to Help — Always</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-text sm:text-5xl lg:text-6xl">
              Get in{" "}
              <span className="text-primary underline decoration-accent/60 underline-offset-4">
                Touch
              </span>{" "}
              <br className="hidden sm:inline" />
              With Our Team
            </h1>

            {/* Supporting text */}
            <p className="max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              Have questions, feedback, or need assistance? We're here to help
              job seekers and recruiters every step of the way.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                onClick={scrollToForm}
                className="group w-full sm:w-auto h-13 px-8 text-base shadow-soft hover:shadow-soft-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Send Message</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Link to="/jobs" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="group w-full sm:w-auto h-13 px-8 text-base"
                >
                  <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>Browse Jobs</span>
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                <span className="text-xs font-medium text-text-secondary md:text-sm">
                  24/7 Support
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-xs font-medium text-text-secondary md:text-sm">
                  Fast Response
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0 text-secondary" />
                <span className="text-xs font-medium text-text-secondary md:text-sm">
                  Email & Phone
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Illustration ── */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="relative w-full max-w-md lg:max-w-none">
              <ConversationIllustration />

              {/* Floating badge — response time */}
              <div className="absolute -bottom-4 -left-4 sm:left-4 animate-bounce [animation-duration:3.5s]">
                <FloatingBadge
                  icon={Phone}
                  label="Support Line"
                  value="Always Available"
                  colorClass="bg-primary/10 text-primary"
                />
              </div>

              {/* Floating badge — satisfaction */}
              <div className="absolute -top-4 -right-4 sm:right-4">
                <FloatingBadge
                  icon={CheckCircle2}
                  label="Satisfaction"
                  value="98% Resolved"
                  colorClass="bg-success/10 text-success"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
