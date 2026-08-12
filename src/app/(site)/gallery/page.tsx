import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import GalleryCarousel from "@/components/site/GalleryCarousel";
import { GALLERY_PHOTOS, SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from Soul Diet sessions — sound healing, ice bath, satvic lunch and the people who showed up for themselves.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the practice"
        lede="Sessions, gatherings and the quiet in between."
      />

      <Section width="wide">
        <GalleryCarousel photos={GALLERY_PHOTOS} />
      </Section>

      <Section tone="cream">
        <div className="text-center">
          <h2 className="font-display text-3xl leading-snug text-ink">
            The next one could have you in it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/75">
            {SITE.shortPitch}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/event" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">See the upcoming event</Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
