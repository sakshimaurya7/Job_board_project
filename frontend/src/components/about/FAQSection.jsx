import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { SectionHeading } from "../common/SectionHeading";

const FAQS = [
  {
    value: "faq-1",
    question: "How do I apply for jobs on the platform?",
    answer: "Applying is simple! Create a free candidate account, complete your profile, and click 'Apply Now' on any job listing. You can attach your resume, add a personalized cover letter, and track your application status directly from your candidate dashboard.",
  },
  {
    value: "faq-2",
    question: "Is registration free for job seekers?",
    answer: "Yes, 100%! Searching for jobs, creating a candidate profile, uploading your resume, and applying to unlimited listings is completely free for all job seekers.",
  },
  {
    value: "faq-3",
    question: "How do employers post jobs and verify their company?",
    answer: "Employers can register an account, set up their official organization profile, and submit job postings. Our admin team performs a quick security check to verify company credentials before postings go live.",
  },
  {
    value: "faq-4",
    question: "Can I update my profile, skills, and resume at any time?",
    answer: "Absolutely! You can update your bio, skills, location preferences, portfolio links, and resume documents anytime via your profile settings. Changes immediately sync for future job applications.",
  },
  {
    value: "faq-5",
    question: "How can I contact support if I run into issues?",
    answer: "You can reach our dedicated support team via the Contact Us page or email support@jobboardplatform.com. Our support representatives are available 24/7 to assist with account recovery, profile help, or recruitment inquiries.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Got Questions? We Have"
          highlight="Answers"
          subtitle="Find answers to common questions about accounts, job applications, and employer services."
          align="center"
        />

        <div className="mt-10">
          <Accordion type="single" defaultValue="faq-1" collapsible>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
