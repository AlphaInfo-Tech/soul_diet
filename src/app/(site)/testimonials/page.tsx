import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import TestimonialCard from "@/components/site/TestimonialCard";
import { SITE, TESTIMONIALS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Stories from people who practised with Soul Diet — the 21-day programme, the mental fitness series and guided meditation.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonial"
        title="In their words"
        lede="This is my small story of mental transformation — will you share yours, and inspire us with it?"
      />

      <Section width="wide">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name + t.programme} {...t} />
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Share your story"
          title="Your transformation might be someone's starting point"
          lede="If a practice shifted something for you — however small — writing it down helps the next person believe it is possible."
        />

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Send your story</Button>
          </Link>
        </div>

        <p className="mt-8 text-center font-display text-lg text-green italic">
          {SITE.abundanceLine}
        </p>
      </Section>
    </>
  );
}
