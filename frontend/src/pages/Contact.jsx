import React, { useEffect, Suspense, lazy } from "react";
import { ContactSkeleton } from "../components/contact/ContactSkeleton";

// ─── Lazy-loaded section components ──────────────────────────────────────────
const ContactHero   = lazy(() => import("../components/contact/ContactHero").then((m) => ({ default: m.ContactHero })));
const ContactInfo   = lazy(() => import("../components/contact/ContactInfo").then((m) => ({ default: m.ContactInfo })));
const ContactForm   = lazy(() => import("../components/contact/ContactForm").then((m) => ({ default: m.ContactForm })));
const ContactFAQ    = lazy(() => import("../components/contact/ContactFAQ").then((m) => ({ default: m.ContactFAQ })));
const OfficeInfo    = lazy(() => import("../components/contact/OfficeInfo").then((m) => ({ default: m.OfficeInfo })));
const SocialLinks   = lazy(() => import("../components/contact/SocialLinks").then((m) => ({ default: m.SocialLinks })));
const CTASection    = lazy(() => import("../components/contact/CTASection").then((m) => ({ default: m.CTASection })));

// ─── Page component ───────────────────────────────────────────────────────────
export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | JobHub — Get in Touch";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Suspense fallback={<ContactSkeleton />}>
      <main
        className="min-h-screen bg-background text-text selection:bg-accent selection:text-text"
        aria-label="Contact page"
      >
        {/* 1. Hero */}
        <ContactHero />

        {/* 2. Contact Information Cards */}
        <ContactInfo />

        {/* 3. Contact Form (with two-column info + form layout) */}
        <ContactForm />

        {/* 4. FAQ */}
        <ContactFAQ />

        {/* 5. Office Information + Map */}
        <OfficeInfo />

        {/* 6. Social Links */}
        <SocialLinks />

        {/* 7. Call to Action */}
        <CTASection />
      </main>
    </Suspense>
  );
}
