import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Tag,
  FileText,
  MessageSquare,
  Send,
  RotateCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { contactSchema } from "../../validation/contactSchema";
import { contactService } from "../../services/contactService";

// ─── Field error message ──────────────────────────────────────────────────────
const FieldError = ({ message }) =>
  message ? (
    <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-error mt-1.5">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  ) : null;

// ─── Form field label ─────────────────────────────────────────────────────────
const FieldLabel = ({ htmlFor, children, required }) => (
  <label
    htmlFor={htmlFor}
    className="mb-1.5 block text-sm font-semibold text-text"
  >
    {children}
    {required && <span className="ml-0.5 text-error">*</span>}
  </label>
);

// ─── Character counter ────────────────────────────────────────────────────────
const CharCounter = ({ current, max }) => {
  const percent = current / max;
  const colorClass =
    percent >= 0.9
      ? "text-error"
      : percent >= 0.75
      ? "text-warning"
      : "text-text-secondary";
  return (
    <span className={`text-xs font-medium tabular-nums ${colorClass}`}>
      {current}/{max}
    </span>
  );
};

// ─── Main form component ──────────────────────────────────────────────────────
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: undefined,
      subject: undefined,
      message: "",
      privacyConsent: false,
    },
  });

  const privacyValue = watch("privacyConsent");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await contactService.sendContactMessage(data);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 2 business hours.",
      });
      reset();
      setMessageLength(0);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to send message. Please try again.";
      toast.error("Something went wrong", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setMessageLength(0);
  };

  return (
    <section
      id="contact-form"
      className="scroll-mt-20 bg-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* ── Left: Info sidebar ── */}
          <div className="space-y-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-section px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-soft-sm">
                <MessageSquare className="h-3.5 w-3.5" />
                Send Us a Message
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                We'd Love to Hear From You
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                Fill out the form and our team will respond within 2 business hours.
                Your message is secure and confidential.
              </p>
            </div>

            {/* What to expect */}
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 shadow-soft">
              <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                What to Expect
              </h3>
              {[
                { step: "01", label: "Submit your message using the form" },
                { step: "02", label: "Our team reviews your inquiry" },
                { step: "03", label: "Receive a personalized response" },
                { step: "04", label: "Issue resolved or query answered ✅" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary">
                    {item.step}
                  </span>
                  <p className="text-sm font-medium text-text leading-relaxed pt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick contact */}
            <div className="rounded-2xl border border-border bg-section p-6 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                Prefer Direct Contact?
              </h3>
              <a
                href="mailto:support@jobhub.com"
                className="flex items-center gap-3 text-sm font-semibold text-text hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                support@jobhub.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm font-semibold text-text hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft-lg sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
              className="space-y-5"
            >
              {/* Full Name */}
              <div>
                <FieldLabel htmlFor="contact-fullName" required>
                  Full Name
                </FieldLabel>
                <Input
                  id="contact-fullName"
                  type="text"
                  icon={User}
                  placeholder="John Doe"
                  error={!!errors.fullName}
                  aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
                  {...register("fullName")}
                />
                <FieldError message={errors.fullName?.message} />
              </div>

              {/* Email */}
              <div>
                <FieldLabel htmlFor="contact-email" required>
                  Email Address
                </FieldLabel>
                <Input
                  id="contact-email"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  error={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  {...register("email")}
                />
                <FieldError message={errors.email?.message} />
              </div>

              {/* Phone (optional) */}
              <div>
                <FieldLabel htmlFor="contact-phone">
                  Phone Number{" "}
                  <span className="ml-1 text-xs font-normal text-text-secondary">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  id="contact-phone"
                  type="tel"
                  icon={Phone}
                  placeholder="+91 98765 43210"
                  error={!!errors.phone}
                  {...register("phone")}
                />
                <FieldError message={errors.phone?.message} />
              </div>

              {/* Role & Subject — side by side on tablet+ */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Role */}
                <div>
                  <FieldLabel htmlFor="contact-role" required>
                    I am a
                  </FieldLabel>
                  <Select
                    id="contact-role"
                    icon={Tag}
                    error={!!errors.role}
                    aria-describedby={errors.role ? "contact-role-error" : undefined}
                    {...register("role")}
                  >
                    <option value="">Select your role</option>
                    <option value="jobseeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="visitor">General Visitor</option>
                  </Select>
                  <FieldError message={errors.role?.message} />
                </div>

                {/* Subject */}
                <div>
                  <FieldLabel htmlFor="contact-subject" required>
                    Subject
                  </FieldLabel>
                  <Select
                    id="contact-subject"
                    icon={FileText}
                    error={!!errors.subject}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    {...register("subject")}
                  >
                    <option value="">Select a subject</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="issue">Report an Issue</option>
                    <option value="recruiter">Recruiter Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </Select>
                  <FieldError message={errors.subject?.message} />
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel htmlFor="contact-message" required>
                    Message
                  </FieldLabel>
                  <CharCounter current={messageLength} max={2000} />
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 pointer-events-none text-text-secondary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <textarea
                    id="contact-message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell us how we can help you..."
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`w-full resize-none rounded-xl border bg-surface pl-11 pr-4 py-3 text-base text-text placeholder:text-text-placeholder transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                      errors.message
                        ? "border-error focus-visible:border-error focus-visible:ring-error/20"
                        : "border-border focus-visible:border-primary focus-visible:ring-primary/20"
                    }`}
                    {...register("message", {
                      onChange: (e) => setMessageLength(e.target.value.length),
                    })}
                  />
                </div>
                <FieldError message={errors.message?.message} />
              </div>

              {/* Privacy Policy checkbox */}
              <div className="rounded-xl border border-border bg-section px-4 py-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="contact-privacy"
                    checked={!!privacyValue}
                    onChange={(checked) => setValue("privacyConsent", checked, { shouldValidate: true })}
                    aria-describedby={errors.privacyConsent ? "contact-privacy-error" : undefined}
                  />
                  <label
                    htmlFor="contact-privacy"
                    className="cursor-pointer select-none text-sm leading-relaxed text-text-secondary"
                  >
                    I have read and agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
                      onClick={(e) => e.preventDefault()}
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to my data being used to process this inquiry.
                    <span className="ml-1 text-error font-bold">*</span>
                  </label>
                </div>
                <FieldError message={errors.privacyConsent?.message} />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                  aria-label="Reset contact form"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1 group"
                  aria-label="Submit contact form"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
