import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "How do I apply for a job on JobHub?",
    answer:
      "Applying is simple. Create a free Job Seeker account, complete your profile with your resume and details, then browse available jobs and click 'Apply Now' on any listing. Your application is sent directly to the recruiter. You can track all your applications from the 'My Applications' dashboard.",
  },
  {
    id: "faq-2",
    question: "How can recruiters post jobs on the platform?",
    answer:
      "Recruiters need to register with the 'Recruiter' role, then complete the mandatory Company Setup step. Once your company profile is verified, you can access the Recruiter Dashboard and post unlimited job listings using the 'Create Job' form. All posted jobs are live immediately.",
  },
  {
    id: "faq-3",
    question: "How do I reset my password?",
    answer:
      "On the Login page, click 'Forgot Password?' and enter your registered email address. You'll receive a password reset link within a few minutes. Check your spam folder if you don't see it. The reset link expires in 1 hour for security.",
  },
  {
    id: "faq-4",
    question: "How can I update my company profile?",
    answer:
      "Recruiters can update their company details by navigating to the Recruiter Dashboard → My Company → Edit Company. You can update your company name, logo, description, website, and location. Changes are reflected immediately across all your job listings.",
  },
  {
    id: "faq-5",
    question: "How do I contact the support team?",
    answer:
      "You can reach us through this Contact page by filling out the form above, or directly at support@jobhub.com. For urgent issues, call us at +91 98765 43210 during office hours (Mon–Fri, 9 AM–6 PM IST). We typically respond within 2 business hours.",
  },
  {
    id: "faq-6",
    question: "How can I track the status of my job applications?",
    answer:
      "Navigate to 'My Applications' from your profile menu. You'll see all applications with their current status — Pending, Reviewed, Shortlisted, or Rejected. You'll also receive email notifications whenever your application status changes.",
  },
];

export function ContactFAQ() {
  return (
    <section className="bg-section py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-soft-sm">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Can't find the answer you're looking for? Send us a message using
            the form above and we'll get back to you shortly.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible>
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
