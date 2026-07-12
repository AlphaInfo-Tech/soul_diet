"use client";

import { useRef } from "react";
import Section from "./Section";
import SectionBlobs from "./SectionBlobs";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/WellnessIcons";

const PHOTOS = [
  { src: "/gallery/1.jpg", alt: "Sound Healing session" },
  { src: "/gallery/2.jpg", alt: "Ice Bath experience" },
  { src: "/gallery/3.jpg", alt: "Satvic Lunch spread" },
  { src: "/gallery/4.jpg", alt: "Wellness Goodie Kit" },
  { src: "/gallery/5.jpg", alt: "Community connection" },
  { src: "/gallery/6.jpg", alt: "Event venue" },
];

export default function PhotoGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByDirection(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <Section decoration={<SectionBlobs colors={["bg-green-dark/20", "bg-terracotta/20"]} />}>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
          Photo Gallery
        </p>
        <h2 className="font-display mt-2 text-3xl text-ink">A Glimpse of the Experience</h2>
      </div>

      <div className="relative mt-8">
        <div
          ref={scrollerRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2"
        >
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="flex h-64 w-64 shrink-0 snap-start items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-ink/5 sm:h-72 sm:w-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover"
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
    </Section>
  );
}
