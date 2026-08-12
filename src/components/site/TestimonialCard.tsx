import { QuoteIcon } from "@/components/icons/WellnessIcons";
import type { Testimonial } from "@/lib/site-content";

export default function TestimonialCard({
  quote,
  name,
  headline,
  location,
  programme,
}: Testimonial) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-7">
      <QuoteIcon className="h-7 w-7 shrink-0 text-terracotta/30" />

      {headline && (
        <p className="mt-4 font-semibold text-ink">{headline}</p>
      )}

      <blockquote
        className={`flex-1 text-sm leading-relaxed text-ink/80 ${headline ? "mt-2" : "mt-4"}`}
      >
        {quote}
      </blockquote>

      <figcaption className="mt-6 border-t border-ink/10 pt-4">
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-xs text-ink/55">
          {/* Joined rather than interpolated — most entries have no location,
              which would otherwise render a stray leading " · ". */}
          {[location, programme].filter(Boolean).join(" · ")}
        </p>
      </figcaption>
    </figure>
  );
}
