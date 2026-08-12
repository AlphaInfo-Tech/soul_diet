import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import { QuoteIcon } from "@/components/icons/WellnessIcons";
import {
  ABOUT_PARAGRAPHS,
  PRACTICES,
  PULL_QUOTES,
  SELF_QUESTIONS,
  SITE,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.founder} — engineer, former lecturer and meditation practitioner of twenty years. The story behind Soul Diet.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={SITE.founder}
        lede={SITE.founderRole}
      />

      <Section>
        <div className="rounded-3xl bg-white/70 p-8 shadow-sm sm:p-12">
          {/* Justified only from `sm` up — the phone column is too narrow a
              measure for it without opening rivers between words. */}
          <div className="space-y-5 leading-relaxed text-ink/80 sm:text-justify">
            {ABOUT_PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <figure className="mt-10 border-t border-ink/10 pt-8">
            <QuoteIcon className="h-7 w-7 text-terracotta/30" />
            <blockquote className="font-display mt-3 text-xl leading-relaxed text-ink/75 italic">
              {SITE.motto}
            </blockquote>
            <figcaption className="mt-3 text-sm text-ink/55">
              {SITE.founder}
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="The practice"
          title="What I follow, and what I teach"
          lede="Nothing here happened on the same day. There were sleepless nights, late morning wake-ups and a lot of pending work — but slowly and steadily it became better."
        />

        <ol className="mt-10 space-y-6">
          {PRACTICES.map((practice, i) => (
            <li key={practice.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="font-display mt-0.5 w-8 shrink-0 text-2xl text-terracotta/50"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-medium text-ink">{practice.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  {practice.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Self enquiry"
          title="Ask yourself these, repeatedly"
        />

        <ul className="mx-auto mt-10 max-w-xl space-y-3">
          {SELF_QUESTIONS.map((q) => (
            <li
              key={q}
              className="font-display rounded-2xl bg-white/70 px-6 py-4 text-center text-lg text-ink/80 shadow-sm ring-1 ring-ink/5"
            >
              {q}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-ink/65">
          Every day when you wake up, check what your first thought is. Go to
          sleep with some prayer, laughter, gratitude, love — and by stretching
          and relaxing your body.
        </p>
      </Section>

      <Section tone="green">
        <div className="text-center">
          <p className="font-display text-2xl leading-relaxed sm:text-3xl">
            {PULL_QUOTES.loveIsYou.text}
          </p>
          <p className="mt-5 text-cream-light/80">{SITE.abundanceLine}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/services" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                className="w-full !bg-cream-light text-ink hover:!bg-cream-dark sm:w-auto"
              >
                Explore Services
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                className="w-full border border-cream-light/40 text-cream-light hover:bg-cream-light/10 sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
