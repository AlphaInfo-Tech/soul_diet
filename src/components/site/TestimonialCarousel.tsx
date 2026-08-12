"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons/WellnessIcons";
import TestimonialCard from "@/components/site/TestimonialCard";
import type { Testimonial } from "@/lib/site-content";

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // How far one card sits from the next, gap included. Measured rather than
  // hardcoded, because card width changes with the breakpoint.
  function stepPx(track: HTMLUListElement) {
    return track.scrollWidth / testimonials.length;
  }

  // The number of scroll positions depends on how many cards fit on screen,
  // so it has to be measured too — 2 on desktop, 4 on mobile, for 4 cards.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // setState lives in the observer callback, not the effect body. observe()
    // fires once immediately, which covers the initial measurement.
    const observer = new ResizeObserver(() => {
      const step = track.scrollWidth / testimonials.length;
      setPageCount(
        step ? Math.round((track.scrollWidth - track.clientWidth) / step) + 1 : 1,
      );
    });

    observer.observe(track);
    return () => observer.disconnect();
  }, [testimonials.length]);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * stepPx(track), behavior: "smooth" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const step = stepPx(track);
    if (step) setIndex(Math.round(track.scrollLeft / step));
  }

  const atStart = index <= 0;
  const atEnd = index >= pageCount - 1;

  return (
    <div className="mt-10">
      <ul
        ref={trackRef}
        onScroll={onScroll}
        role="group"
        aria-label="Testimonials"
        tabIndex={0}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name + testimonial.programme}
            // Widths subtract the gutters, or three cards plus two gap-5 gaps
            // would overflow the row.
            className="min-w-0 shrink-0 snap-start basis-full sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
          >
            <TestimonialCard {...testimonial} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollToIndex(index - 1)}
          disabled={atStart}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm ring-1 ring-ink/10 transition-colors hover:bg-cream-light focus:outline-none focus-visible:ring-2 focus-visible:ring-green disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-4.5 w-4.5" />
        </button>

        {/* Hidden until the observer has measured, so a lone placeholder dot
            never flashes before hydration. */}
        <div className="flex items-center gap-2.5" hidden={pageCount < 2}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green ${
                i === index ? "w-6 bg-terracotta" : "w-2.5 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(index + 1)}
          disabled={atEnd}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm ring-1 ring-ink/10 transition-colors hover:bg-cream-light focus:outline-none focus-visible:ring-2 focus-visible:ring-green disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRightIcon className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}
