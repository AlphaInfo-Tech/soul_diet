"use client";

import { useState } from "react";
import Button from "@/components/Button";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/register/FormFields";
import { CheckIcon } from "@/components/icons/WellnessIcons";
import { CONTACT, CONTACT_SUBJECTS } from "@/lib/site-content";
import type { ContactFormState, ContactResponse } from "@/lib/types";
import { validateContact } from "@/lib/validation";

const EMPTY: ContactFormState = {
  fullName: "",
  email: "",
  contactNumber: "",
  subject: "",
  message: "",
};

export default function ContactForm({
  defaultSubject = "",
}: {
  defaultSubject?: string;
}) {
  const initial: ContactFormState = { ...EMPTY, subject: defaultSubject };
  const [form, setForm] = useState<ContactFormState>(initial);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateContact(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data: ContactResponse = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "We couldn't send that. Please try again.");
        return;
      }

      setSent(true);
      setForm(initial);
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-ink/5 sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green text-cream-light">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="font-display mt-5 text-2xl text-ink">Message Sent Successfully</h3>
        <p className="mt-3 leading-relaxed text-ink/70">
          Thank you for writing in. {CONTACT.responseTime}
        </p>
        <Button
          variant="secondary"
          className="mt-7"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    // The extra bottom padding clears the floating CTA pill, which would
    // otherwise sit over the submit button below lg.
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 pb-20 shadow-sm ring-1 ring-ink/5 sm:p-8 sm:pb-20 lg:pb-8"
    >
      <div className="space-y-5">
        <TextField
          id="contact-name"
          label="Your name"
          name="name"
          autoComplete="name"
          placeholder="Gayathri"
          value={form.fullName}
          error={errors.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />

        <TextField
          id="contact-email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <TextField
          id="contact-phone"
          label="Contact number"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="9876543210"
          hint="Optional — 10-digit Indian mobile number."
          value={form.contactNumber}
          error={errors.contactNumber}
          onChange={(e) => update("contactNumber", e.target.value.replace(/\D/g, "").slice(0, 10))}
        />

        <SelectField
          id="contact-subject"
          label="What is this about?"
          name="subject"
          placeholder="Choose one…"
          options={CONTACT_SUBJECTS}
          value={form.subject}
          error={errors.subject}
          onChange={(e) => update("subject", e.target.value)}
        />

        <TextAreaField
          id="contact-message"
          label="Your message"
          name="message"
          rows={5}
          placeholder="Tell me what you are carrying, and what you are curious about."
          value={form.message}
          error={errors.message}
          onChange={(e) => update("message", e.target.value)}
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
      </div>

      {submitError && (
        <p role="alert" className="mt-5 rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="mt-7 w-full">
        {submitting ? "Sending…" : "Send message"}
      </Button>

      <p className="mt-4 text-center text-xs text-ink/50">{CONTACT.responseTime}</p>
    </form>
  );
}
