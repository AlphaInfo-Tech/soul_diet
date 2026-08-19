import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import ExperienceZone from "@/components/site/ExperienceZone";
import FaqAccordion from "@/components/site/FaqAccordion";
import { CheckIcon } from "@/components/icons/WellnessIcons";
import { FAQS, MEDITATION_BENEFITS, SERVICES, SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The Soul Diet 21-day programme, the five-week Mental Fitness series, guided meditation, and the Sound Healing + Ice Bath experience.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Ways to practise together"
        lede="Ten minutes daily, a journal and a pen. That is the whole list of things you need to begin."
      />

      <Section width="wide">
        <ExperienceZone services={SERVICES} />
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Before you begin"
          title="Precautions, honestly stated"
        />

        <div className="mt-8 rounded-2xl border border-terracotta/25 bg-terracotta/5 p-6 text-justify hyphens-auto sm:p-8">
          <p className="leading-relaxed text-ink/80">
            If you are pregnant, a heart patient, have a breathing problem, or
            have had any kind of surgery, please ask your doctor before doing
            any breathing exercise.
          </p>
        </div>
      </Section>

      <Section width="wide">
        <SectionHeading
          eyebrow="Benefits"
          title="What the practice builds"
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MEDITATION_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 rounded-xl bg-white/70 px-5 py-4 text-sm text-ink/75 shadow-sm ring-1 ring-ink/5"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section width="wide" tone="cream">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
          <span aria-hidden="true" className="h-px w-6 bg-terracotta" />
          Questions
        </p>
        <h2 className="font-display mt-4 mb-11 text-4xl leading-[1.1] text-ink sm:text-5xl">
          Before you <em className="text-terracotta">ask.</em>
        </h2>

        <FaqAccordion faqs={FAQS} />
      </Section>

      <Section tone="green">
        <div className="text-center">
          <p className="font-display text-2xl leading-relaxed sm:text-3xl">
            Fix a time in your daily schedule, and keep the appointment.
          </p>
          <p className="mt-5 text-cream-light/80">{SITE.abundanceLine}</p>

          <div className="mt-10">
            <Link href="/contact">
              <Button
                variant="ghost"
                className="w-full !bg-cream-light text-ink hover:!bg-cream-dark sm:w-auto"
              >
                Ask about a programme
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
