import { ReactNode } from "react";
import SectionBlobs from "@/components/landing/SectionBlobs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Flush the lede on both edges instead of following the centred heading. */
  justifyLede?: boolean;
  children?: ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  lede,
  justifyLede = false,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
      <SectionBlobs colors={["bg-green-dark/25", "bg-terracotta/20"]} />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {lede && (
          <p
            className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg ${
              justifyLede ? "text-justify hyphens-auto" : ""
            }`}
          >
            {lede}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
