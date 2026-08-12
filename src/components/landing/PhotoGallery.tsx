"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Section, { type Tone } from "./Section";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons/WellnessIcons";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/lib/site-content";

interface PhotoGalleryProps {
  photos?: GalleryPhoto[];
  eyebrow?: string;
  title?: string;
  /** When set, renders a "see all" link under the scroller. */
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Forwarded to Section so the page can keep its light/cream alternation. */
  tone?: Tone;
}

export default function PhotoGallery({
  photos = GALLERY_PHOTOS.slice(0, 6),
  eyebrow = "Photo Gallery",
  title = "A Glimpse of the Experience",
  viewAllHref,
  viewAllLabel = "View the full gallery",
  tone,
}: PhotoGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByDirection(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <Section tone={tone}>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
          {eyebrow}
        </p>
        <h2 className="font-display mt-2 text-3xl text-ink">{title}</h2>
      </div>

      <div className="relative mt-8">
        <div
          ref={scrollerRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2"
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative h-64 w-64 shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-ink/5 sm:h-72 sm:w-80"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 20rem, 16rem"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByDirection(-1)}
          aria-label="Previous photos"
          className="absolute top-1/2 left-0 hidden h-10 w-10 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-white text-green shadow-md ring-1 ring-ink/10 hover:bg-cream sm:flex"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByDirection(1)}
          aria-label="Next photos"
          className="absolute top-1/2 right-0 hidden h-10 w-10 translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-white text-green shadow-md ring-1 ring-ink/10 hover:bg-cream sm:flex"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {viewAllHref && (
        <div className="mt-8 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green transition-colors hover:text-green-dark"
          >
            {viewAllLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      )}
    </Section>
  );
}
