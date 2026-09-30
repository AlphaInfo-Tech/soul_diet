import type { Metadata } from "next";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import { CONTACT, SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms governing use of the ${SITE.name} website and registration for our programmes and events.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "30th September 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lede={`Last updated: ${LAST_UPDATED}`}
      />

      <Section>
        <div className="space-y-8 rounded-3xl bg-white/70 p-8 text-sm leading-relaxed text-ink/80 shadow-sm sm:p-12">
          <Clause title="1. Acceptance of these terms">
            <p>
              These terms govern your use of the {SITE.name} website
              (souldiet.in) and your registration for any {SITE.name}{" "}
              programme or event — including the One Day Retreat, the Soul
              Diet — 21 Day Programme, the Mental Fitness Series, Guided
              Meditation, the Sound Healing + Ice Bath Experience, and
              One-to-One Consultations. By browsing this site or submitting a
              registration, booking, or contact form, you agree to these
              terms.
            </p>
          </Clause>

          <Clause title="2. Registration & payment">
            <p>
              A seat at a paid event, such as the One Day Retreat, is
              confirmed only once payment is made via the UPI details
              provided at checkout and the corresponding transaction
              reference (UTR) and payment screenshot are submitted and
              verified.
            </p>
            <p className="mt-3">
              <span className="font-medium text-ink">
                The registration fee, once paid, is non-refundable.
              </span>{" "}
              This is the same condition you confirm at registration, and it
              applies regardless of whether you attend the event.
            </p>
          </Clause>

          <Clause title="3. Health, safety & medical disclosure">
            <p>
              Some of our offerings — in particular the Sound Healing + Ice
              Bath Experience — involve physical practices that are not
              suitable for everyone. During registration you&apos;re asked to
              disclose any medical condition, illness, or medication
              honestly and completely. Where a medical condition is
              disclosed, our team manually reviews it before your
              participation in the Ice Bath is confirmed, and may advise
              against a specific activity for your safety.
            </p>
            <p className="mt-3">
              Participation in yoga, meditation, sound healing, ice bath, and
              similar practices is voluntary and undertaken at your own risk.
              If you have any doubt about your fitness to participate, please
              consult a medical professional before registering.
            </p>
          </Clause>

          <Clause title="4. Accuracy of information">
            <p>
              You&apos;re responsible for the accuracy of the information you
              submit, including medical details. If information provided
              turns out to be incorrect, your registration may be cancelled
              — even if screening was already cleared and payment already
              made — without entitlement to a refund.
            </p>
          </Clause>

          <Clause title="5. Communications">
            <p>
              By registering, booking, or contacting us, you agree that we
              may reach you about your registration, booking, or enquiry by
              phone call, SMS, email, or WhatsApp, using the details you
              provide.
            </p>
          </Clause>

          <Clause title="6. Content ownership">
            <p>
              The text, images, and other content on this site belong to{" "}
              {SITE.name} and {SITE.founder}, unless stated otherwise.
              Testimonials published on this site are shared by real
              participants with their consent. Please don&apos;t reproduce or
              redistribute this content without our written permission.
            </p>
          </Clause>

          <Clause title="7. Limitation of liability">
            <p>
              We take reasonable care to run a safe event, but {SITE.name}{" "}
              and {SITE.founder} are not liable for any indirect,
              incidental, or consequential loss arising from your
              participation in a programme or event, to the extent
              permitted by law.
            </p>
          </Clause>

          <Clause title="8. Governing law">
            <p>
              These terms are governed by the laws of India, and any dispute
              is subject to the jurisdiction of the courts in Salem, Tamil
              Nadu.
            </p>
          </Clause>

          <Clause title="9. Changes to these terms">
            <p>
              We may update these terms from time to time. Continuing to use
              this site or registering for an event after a change means you
              accept the updated terms.
            </p>
          </Clause>

          <Clause title="10. Questions or concerns">
            <p>
              For any questions about these terms, write to us at{" "}
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
