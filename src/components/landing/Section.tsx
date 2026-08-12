import { ReactNode } from "react";
import SectionBlobs from "./SectionBlobs";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Overrides the tone's blobs when a section needs a one-off treatment. */
  decoration?: ReactNode;
  /** `prose` (default) keeps the original narrow column; `wide` fits 3-col grids. */
  width?: "prose" | "wide";
  /**
   * The surface this section sits on. Pages alternate `light` and `cream` so
   * every boundary shows a tone change; `green` is the closing call-to-action.
   */
  tone?: Tone;
}

export type Tone = keyof typeof TONES;

/**
 * One place decides what a tone looks like — surface, blob colours and wash
 * travel together, so the rhythm can't drift call site by call site.
 * `light` leaves the body background showing through.
 */
const TONES = {
  light: {
    surface: "",
    blobs: ["bg-green-dark/20", "bg-terracotta/15"],
    wash: "bg-ink/5",
  },
  cream: {
    surface: "bg-cream",
    blobs: ["bg-terracotta/20", "bg-green-dark/20"],
    wash: null,
  },
  green: {
    surface: "bg-green text-cream-light",
    blobs: ["bg-ink/20", "bg-terracotta/25"],
    wash: null,
  },
} as const satisfies Record<
  string,
  { surface: string; blobs: readonly [string, string]; wash: string | null }
>;

const WIDTH_CLASSES = {
  prose: "max-w-3xl",
  wide: "max-w-6xl",
};

export default function Section({
  children,
  className = "",
  id,
  decoration,
  width = "prose",
  tone = "light",
}: SectionProps) {
  const { surface, blobs, wash } = TONES[tone];

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-16 sm:py-20 ${surface} ${className}`}
    >
      {decoration ?? <SectionBlobs colors={[...blobs]} wash={wash} />}
      <div className={`relative mx-auto ${WIDTH_CLASSES[width]}`}>{children}</div>
    </section>
  );
}
