"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/icons/WellnessIcons";
import type { GalleryPhoto } from "@/lib/site-content";

/** A swipe shorter than this is treated as a tap, not a navigation. */
const SWIPE_THRESHOLD_PX = 40;

export default function GalleryCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocusedRef.current?.focus();
  }, []);

  // Serves both the carousel and the lightbox arrows.
  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + photos.length) % photos.length);
    },
    [photos.length],
  );

  function open() {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // Only the close button is focusable inside the dialog — keep it there.
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    step(delta < 0 ? 1 : -1);
  }

  const active = photos[index];

  return (
    <>
      <div
        onKeyDown={onKeyDown}
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative">
          <button
            type="button"
            onClick={open}
            className="relative block aspect-4/3 w-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            <span className="sr-only">Open larger view</span>
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-md transition-colors hover:bg-cream-light focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-md transition-colors hover:bg-cream-light focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Manual-only carousel, so announcing the new photo is safe here. */}
        <p aria-live="polite" className="mt-4 text-center text-sm text-ink/70">
          {active.alt}
          <span className="ml-2 text-ink/40">
            {index + 1} / {photos.length}
          </span>
        </p>

        <div className="mt-5 flex items-center justify-center gap-2.5">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green ${
                i === index ? "w-6 bg-terracotta" : "w-2.5 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-ink">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <p className="mt-3 text-center text-sm text-cream-light/80">
              {active.alt}
              <span className="ml-2 text-cream-light/50">
                {index + 1} / {photos.length}
              </span>
            </p>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute -top-2 right-0 flex h-10 w-10 -translate-y-full items-center justify-center rounded-full bg-cream-light text-ink shadow-md hover:bg-cream-dark"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-md hover:bg-cream-light"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-md hover:bg-cream-light"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
