"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons/WellnessIcons";
import { SERVICE_ICONS } from "@/components/site/service-icons";
import type { Service } from "@/lib/site-content";

interface Accent {
  /** Chip fill, kicker text, active step dot. */
  primary: string;
  /** Badge and inactive step-dot background. */
  pale: string;
  /** Top of the card gradient. */
  card: string;
  /** Card and control borders. */
  sand: string;
}

/**
 * One accent per service. Every `primary` is a palette token from globals.css;
 * the pale/card/sand tints are lighter derivations of it that exist only here.
 * Selecting a chip writes these onto the section as CSS variables, so the whole
 * zone re-tints from a single state change.
 */
const ACCENTS: Record<string, Accent> = {
  "soul-diet-21": {
    primary: "var(--color-green)",
    pale: "#dfe6dc",
    card: "#eef1e9",
    sand: "#c9d4c4",
  },
  "mental-fitness": {
    primary: "var(--color-green-light)",
    pale: "#e2e9de",
    card: "#f0f3ec",
    sand: "#cfdac9",
  },
  "guided-meditation": {
    primary: "var(--color-sand)",
    pale: "#f0e4cf",
    card: "#f6efe1",
    sand: "#ddc9a6",
  },
  "sound-healing-ice-bath": {
    primary: "var(--color-terracotta)",
    pale: "#f2ddd4",
    card: "#f8ece6",
    sand: "#e3c3b6",
  },
  "one-to-one": {
    primary: "var(--color-clay)",
    pale: "#ecdcd6",
    card: "#f5ebe7",
    sand: "#d9c1b8",
  },
};

const FALLBACK_ACCENT = ACCENTS["soul-diet-21"];

export default function ExperienceZone({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(0);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = services[activeIndex];
  const accent = ACCENTS[active.id] ?? FALLBACK_ACCENT;
  const steps = active.details;
  const Icon = SERVICE_ICONS[active.icon];

  // Every selection path runs through here so the stepper can never be left
  // pointing past the end of a shorter service's details list.
  function selectService(index: number) {
    setActiveIndex(index);
    setStep(0);
  }

  function onChipKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const lastIndex = services.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = activeIndex === lastIndex ? 0 : activeIndex + 1;
    else if (e.key === "ArrowLeft") next = activeIndex === 0 ? lastIndex : activeIndex - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = lastIndex;

    if (next === null) return;
    e.preventDefault();
    selectService(next);
    chipRefs.current[next]?.focus();
  }

  return (
    <div
      style={
        {
          "--xp-primary": accent.primary,
          "--xp-pale": accent.pale,
          "--xp-card": accent.card,
          "--xp-sand": accent.sand,
        } as React.CSSProperties
      }
    >
      <div className="max-w-2xl">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
          <span aria-hidden="true" className="h-px w-6 bg-terracotta" />
          What we offer
        </p>
        <h2 className="font-display mt-2 text-3xl leading-tight text-ink sm:text-4xl">
          Five ways to practise.
          <br />
          <em className="text-[var(--xp-primary)] transition-colors duration-300">
            One at a time.
          </em>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/75">
          Pick a practice to see what it involves, how long it runs, and what a
          session actually looks like — step by step.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Choose a service"
        onKeyDown={onChipKeyDown}
        className="scrollbar-hide -mx-6 mt-8 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {services.map((service, i) => {
          const isActive = i === activeIndex;
          const ChipIcon = SERVICE_ICONS[service.icon];

          return (
            <button
              key={service.id}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`xp-tab-${service.id}`}
              aria-selected={isActive}
              aria-controls="xp-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectService(i)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
                isActive
                  ? "-translate-y-px border-[var(--xp-primary)] bg-[var(--xp-primary)] text-cream-light shadow-lg"
                  : "border-[var(--xp-sand)] bg-[var(--xp-card)] text-ink/70 hover:border-[var(--xp-primary)] hover:text-ink"
              }`}
            >
              <ChipIcon className="h-4 w-4 shrink-0" />
              {service.shortTitle ?? service.title}
            </button>
          );
        })}
      </div>

      <div
        id="xp-panel"
        role="tabpanel"
        aria-labelledby={`xp-tab-${active.id}`}
        className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
      >
        {/* ── Selected service ── */}
        <article className="min-w-0 rounded-3xl border border-[var(--xp-sand)] bg-linear-to-b from-[var(--xp-card)] to-white p-6 shadow-zone transition-colors duration-300 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--xp-primary)] transition-colors duration-300">
                {active.format} · {active.duration}
              </p>
              <h3 className="font-display mt-2 text-3xl leading-tight text-ink sm:text-4xl">
                {active.title}
              </h3>
            </div>

            <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--xp-pale)] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--xp-primary)] transition-colors duration-300">
              {active.featured ? "Signature" : "Ongoing"}
            </span>
          </div>

          {active.photo && (
            <div className="relative mt-5 aspect-4/3 w-full overflow-hidden rounded-2xl bg-white shadow-md">
              <Image
                src={active.photo.src}
                alt={active.photo.alt}
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <p className="mt-5 text-sm leading-relaxed text-ink/75">
            {active.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--xp-sand)] pt-5 transition-colors duration-300">
            <Link href={active.href ?? "/contact"}>
              <Button
                className="!bg-[var(--xp-primary)] text-cream-light hover:opacity-90"
              >
                {active.ctaLabel ?? (active.href ? "See the event" : "Ask about this")}
              </Button>
            </Link>
            <span className="text-[11px] text-ink/50">
              {steps.length} steps · {active.duration}
            </span>
          </div>
        </article>

        {/* ── What it looks like, step by step ── */}
        <article className="min-w-0 rounded-3xl border border-[var(--xp-sand)] bg-linear-to-b from-[var(--xp-card)] to-white p-6 shadow-zone transition-colors duration-300 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--xp-primary)] transition-colors duration-300">
                What it looks like
              </p>
              <p className="mt-2 text-sm text-ink/60">
                Walk through the practice.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {steps.map((detail, i) => (
                <div key={detail} className="flex items-center gap-2">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-0.5 w-6 rounded-full bg-[var(--xp-sand)] transition-colors duration-300 sm:block"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-label={`Step ${i + 1} of ${steps.length}`}
                    aria-current={i === step}
                    className={`h-8 w-8 shrink-0 rounded-full text-sm font-extrabold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
                      i === step
                        ? "-translate-y-px bg-[var(--xp-primary)] text-cream-light"
                        : "bg-[var(--xp-pale)] text-[var(--xp-primary)]"
                    }`}
                  >
                    {i + 1}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--xp-sand)] bg-cream-light/60 p-5 transition-colors duration-300">
            <span className="inline-flex rounded-full bg-[var(--xp-pale)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--xp-primary)] transition-colors duration-300">
              Step {step + 1} of {steps.length}
            </span>

            <div className="mt-4 flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-[var(--xp-primary)] transition-colors duration-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                {active.shortTitle ?? active.title}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {steps[step]}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--xp-sand)] px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Previous
            </button>

            <button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--xp-sand)] px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
