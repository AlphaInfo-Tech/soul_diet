import type { Metadata } from "next";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import { CONTACT, SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects the information you share with us.`,
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "30th September 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede={`Last updated: ${LAST_UPDATED}`}
      />

      <Section>
        <div className="space-y-8 rounded-3xl bg-white/70 p-8 text-sm leading-relaxed text-ink/80 shadow-sm sm:p-12">
          <Clause title="1. What this policy covers">
            <p>
              This policy explains what personal information {SITE.name}{" "}
              collects through souldiet.in — including our event
              registration form, one-to-one booking form, and contact form —
              and how we use it.
            </p>
          </Clause>

          <Clause title="2. Information we collect">
            <p className="font-medium text-ink">Event registration</p>
            <p className="mt-1">
              Full name, age, city, email address, phone number, whether you
              have a medical condition or are on medication (and details, if
              so), your consent confirmation, and — for paid events — your
              payment transaction reference (UTR) and payment screenshot.
            </p>
            <p className="mt-4 font-medium text-ink">One-to-one booking</p>
            <p className="mt-1">
              Full name, age, city, email address, phone number, and your
              chosen appointment date and time.
            </p>
            <p className="mt-4 font-medium text-ink">Contact form</p>
            <p className="mt-1">
              Full name, email address, phone number, subject, and your
              message.
            </p>
          </Clause>

          <Clause title="3. How we use your information">
            <p>
              We use this information to process and confirm your
              registration or booking, verify your payment, carry out the
              health and safety screening described in our{" "}
              <a
                href="/terms"
                className="font-medium text-green underline underline-offset-2"
              >
                Terms & Conditions
              </a>{" "}
              (in particular for the Ice Bath experience), respond to your
              enquiry, and contact you about your registration, booking, or
              message.
            </p>
          </Clause>

          <Clause title="4. Who we share it with">
            <p>
              Registration and booking details are stored using a Google
              Sheets–based backend that processes submissions on our behalf.
              We do not sell your personal information. Payment for events
              is made directly by you via UPI; we don&apos;t collect or store
              your card, bank, or UPI credentials — only the transaction
              reference and screenshot you choose to submit as proof of
              payment.
            </p>
          </Clause>

          <Clause title="5. How long we keep it">
            <p>
              We keep registration and booking information for as long as
              needed to run the event and for our accounting records.{" "}
              {/* TODO: confirm an exact retention period with Gayathri before this goes live. */}
              A specific retention period will be confirmed and added here.
            </p>
          </Clause>

          <Clause title="6. Your rights">
            <p>
              You can ask us to access, correct, or delete the personal
              information we hold about you by writing to{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-medium text-green underline underline-offset-2"
              >
                {CONTACT.email}
              </a>
              . We&apos;ll respond as soon as we reasonably can.
            </p>
          </Clause>

          <Clause title="7. Security">
            <p>
              We take reasonable measures to protect the information you
              share with us. That said, no method of storage or transmission
              over the internet is completely secure, and we can&apos;t guarantee
              absolute security.
            </p>
          </Clause>

          <Clause title="8. Children's privacy">
            <p>
              Our services are not directed at children, and we don&apos;t
              knowingly collect personal information from children.
            </p>
          </Clause>

          <Clause title="9. Changes to this policy">
            <p>
              We may update this policy from time to time. Continuing to use
              this site after a change means you accept the updated policy.
            </p>
          </Clause>

          <Clause title="10. Contact us">
            <p>
              For any privacy-related questions, write to us at{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-medium text-green underline underline-offset-2"
              >
                {CONTACT.email}
              </a>{" "}
              or call{" "}
              <a
                href={CONTACT.phoneHref}
                className="font-medium text-green underline underline-offset-2"
              >
                {CONTACT.phone}
              </a>
              .
            </p>
          </Clause>
        </div>
      </Section>
    </>
  );
}

function Clause({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
