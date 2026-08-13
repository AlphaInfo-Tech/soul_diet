interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "center" | "left";
  /** Flush the lede on both edges instead of following `align`. */
  justifyLede?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  justifyLede = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={alignment}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
        {eyebrow}
      </p>
      <h2 className="font-display mt-2 text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-ink/75 ${
            align === "center" ? "mx-auto" : ""
          } ${justifyLede ? "text-justify hyphens-auto" : ""}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
