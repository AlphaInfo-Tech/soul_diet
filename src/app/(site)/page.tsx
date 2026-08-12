import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/landing/Section";
import SectionBlobs from "@/components/landing/SectionBlobs";
import PhotoGallery from "@/components/landing/PhotoGallery";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceCard from "@/components/site/ServiceCard";
import TestimonialCarousel from "@/components/site/TestimonialCarousel";
import {
  ArrowRightIcon,
  CheckIcon,
  LeafIcon,
  QuoteIcon,
  SparkleIcon,
  SunIcon,
} from "@/components/icons/WellnessIcons";
import {
  ABOUT_PARAGRAPHS,
  MEDITATION_BENEFITS,
  ONE_TO_ONE_HREF,
  POND_ANALOGY,
  PULL_QUOTES,
  SERVICES,
  SITE,
  TESTIMONIALS,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} — ${SITE.tagline}`,
  },
  description: SITE.shortPitch,
  alternates: { canonical: "/" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.shortPitch,
  founder: { "@type": "Person", name: SITE.founder },
  areaServed: "IN",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <Hero />
      <WhatIsSoulDiet />
      <AboutPreview />
      <ServicesPreview />
      <WhyMeditation />
      <PhotoGallery
        tone="cream"
        eyebrow="Gallery"
        title="Moments from the practice"
        viewAllHref="/gallery"
      />
      <TestimonialsPreview />
      <ContactCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* The room itself, faded almost to nothing — texture behind the words
          rather than a picture. The gradient dissolves both seams into the
          page background, which is the same cream. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/gallery/7.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-cream-light),transparent_18%,transparent_82%,var(--color-cream-light))]" />
        {/* Soft-edged veil over the text column only, so the photo can stay
            strong at the edges without the body copy fighting the brick. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_50%,rgba(247,242,231,0.96)_0%,rgba(247,242,231,0.8)_45%,transparent_80%)]" />
      </div>

      {/* wash={null} — the ink wash would grey the photo down. */}
      <SectionBlobs colors={["bg-green-dark/25", "bg-terracotta/25"]} wash={null} />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-terracotta/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-terracotta sm:text-sm">
          MEDITATION · MENTAL FITNESS · SELF ENQUIRY
        </span>

        <h1 className="font-display mt-7 text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
          {SITE.name}
        </h1>

        <p className="mx-auto mt-5 inline-block rounded-full bg-green/10 px-5 py-2 text-base font-medium text-green sm:text-lg">
          {SITE.tagline}
        </p>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/90 sm:text-lg">
          {SITE.shortPitch}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={ONE_TO_ONE_HREF} className="w-full sm:w-auto">
            <Button className="w-full shadow-lg shadow-green/25 hover:shadow-xl hover:shadow-green/30 sm:w-auto">
              Book a One-to-One
            </Button>
          </Link>
          <Link href="/event" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">
              Book Upcoming Event
            </Button>
          </Link>
        </div>

        <figure className="mx-auto mt-16 max-w-2xl">
          <QuoteIcon className="mx-auto h-8 w-8 text-terracotta/30" />
          <blockquote className="font-display mt-4 text-lg leading-relaxed text-ink/85 italic sm:text-xl">
            {PULL_QUOTES.windlessSky.text}
          </blockquote>
        </figure>
      </div>
    </section>
  );
}

function WhatIsSoulDiet() {
  return (
    <Section tone="cream">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
          What is Soul Diet?
        </p>
        <p className="font-display mt-4 text-3xl leading-snug text-ink sm:text-4xl">
          We eat for our body.
          <br />
          But what do we feed our mind?
        </p>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink/75">
          Soul Diet is a 21-day guided practice where you are put through
          various practices and taught to meditate — not as an escape from your
          life, but as a way of finding yourself inside it. Ten minutes a day, a
          journal, and a willingness to look honestly at what you are carrying.
        </p>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-green">
          {PULL_QUOTES.harmony.text}
        </p>
      </div>
    </Section>
  );
}

function AboutPreview() {
  return (
    <Section
      // Same faded-photo treatment as the hero — the room behind the story,
      // dissolved into the cream at both seams. `decoration` replaces the
      // tone's default blobs, so the ink wash never greys the photo down.
      decoration={
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Image
              src="/gallery/3.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-cream-light),transparent_18%,transparent_82%,var(--color-cream-light))]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_50%,rgba(247,242,231,0.96)_0%,rgba(247,242,231,0.8)_45%,transparent_80%)]" />
          </div>
          <SectionBlobs colors={["bg-green-dark/20", "bg-terracotta/15"]} wash={null} />
        </>
      }
    >
      <div className="rounded-3xl bg-white/70 p-8 shadow-sm sm:p-12">
        <SectionHeading
          align="left"
          eyebrow="About"
          title={`Guided by ${SITE.founder}`}
        />

        <p className="mt-3 text-sm font-medium text-green">{SITE.founderRole}</p>

        <div className="mt-6 space-y-4 leading-relaxed text-ink/80 sm:text-justify">
          {ABOUT_PARAGRAPHS.slice(0, 2).map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <p className="mt-6 border-l-2 border-terracotta/40 pl-5 font-display text-lg leading-relaxed text-ink/70 italic">
          {SITE.motto}
        </p>

        <Link
          href="/about"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-green transition-colors hover:text-green-dark"
        >
          Read the full story
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function ServicesPreview() {
  return (
    <Section width="wide" tone="cream">
      <SectionHeading
        eyebrow="Services"
        title="Ways to practise together"
        lede="Start wherever you are — a single guided sitting, a five-week series, or the full twenty-one days."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, 3).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/services">
          <Button variant="secondary">See all services</Button>
        </Link>
      </div>
    </Section>
  );
}

function WhyMeditation() {
  return (
    <Section
      width="wide"
      // Line art, not a photo — so it sits as a faint watermark behind the
      // section rather than a cropped fill. `mix-blend-multiply` drops the
      // drawing's white ground into the cream so only the strokes read.
      decoration={
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Image
              src="/gallery/light-within.png"
              alt=""
              fill
              sizes="100vw"
              className="object-contain object-center opacity-[0.08] mix-blend-multiply"
            />
          </div>
          <SectionBlobs colors={["bg-green-dark/20", "bg-terracotta/15"]} />
        </>
      }
    >
      <div className="max-w-2xl">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
          <span aria-hidden="true" className="h-px w-6 bg-terracotta" />
          Why Meditation
        </p>
        <h2 className="font-display mt-4 text-3xl leading-[1.1] text-ink sm:text-5xl">
          Stillness is not the goal.
          <br />
          <em className="text-terracotta">It is the instrument.</em>
        </h2>
        <p className="mt-3.5 max-w-[520px] leading-relaxed text-ink/70">
          A story about a pond, and what it has to do with your mind.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* ── The pond, told as four beats ── */}
        <div className="rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-ink/5 sm:p-9">
          <div className="flex items-center gap-2.5">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-green/12 text-green">
              <SunIcon className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">
              The pond
            </span>
          </div>
          <div className="mt-5 h-px bg-ink/10" />

          <ol className="mt-6">
            {POND_ANALOGY.map((paragraph, i) => (
              <li key={paragraph.slice(0, 40)} className="relative flex py-4">
                {i < POND_ANALOGY.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 bottom-0 left-[12px] border-l-[1.5px] border-dashed border-green/40"
                  />
                )}
                <span className="mr-4 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-green/12 text-[11px] font-semibold text-green ring-1 ring-green/15">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              </li>
            ))}
          </ol>

          <LeafIcon aria-hidden="true" className="mt-2 ml-[-2px] h-[30px] w-[30px] text-green opacity-40" />
        </div>

        {/* ── What the stillness gives back ── */}
        <div className="rounded-3xl bg-green p-8 text-cream-light shadow-sm sm:p-9">
          <div className="flex items-center gap-2.5">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-cream-light/15 text-cream-light">
              <SparkleIcon className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream-light/70">
              What it gives you
            </span>
          </div>
          <div className="mt-5 h-px bg-cream-light/15" />

          <ul className="mt-6">
            {MEDITATION_BENEFITS.slice(0, 8).map((benefit) => (
              <li key={benefit} className="flex py-2.5">
                <span className="mr-4 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-cream-light/15">
                  <CheckIcon className="h-3.5 w-3.5 text-cream-light" />
                </span>
                <span className="pt-1 text-sm leading-relaxed text-cream-light/80">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/services"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cream-light transition-opacity hover:opacity-80"
          >
            See how the practice is taught
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

function TestimonialsPreview() {
  return (
    <Section
      width="wide"
      // Same faded-photo treatment as the hero and the About section.
      decoration={
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Image
              src="/gallery/5.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-cream-light),transparent_18%,transparent_82%,var(--color-cream-light))]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_50%,rgba(247,242,231,0.96)_0%,rgba(247,242,231,0.8)_45%,transparent_80%)]" />
          </div>
          <SectionBlobs colors={["bg-green-dark/20", "bg-terracotta/15"]} wash={null} />
        </>
      }
    >
      <SectionHeading
        eyebrow="Testimonial"
        title="In their words"
        lede="Stories from people who gave the practice ten minutes a day."
      />

      <TestimonialCarousel testimonials={TESTIMONIALS} />

      <div className="mt-10 text-center">
        <Link href="/testimonials">
          <Button variant="secondary">Read more stories</Button>
        </Link>
      </div>
    </Section>
  );
}

function ContactCta() {
  return (
    <Section tone="cream">
      <div className="text-center">
        <h2 className="font-display text-3xl leading-snug text-ink sm:text-4xl">
          Not sure where to begin?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/75">
          Tell me what you are carrying and which practice you are curious
          about. There is no wrong starting point.
        </p>
        <p className="mt-6 font-display text-lg text-green italic">
          {SITE.abundanceLine}
        </p>

        <div className="mt-9">
          <Link href="/contact">
            <Button className="w-full shadow-lg shadow-green/25 sm:w-auto">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
