interface Faq {
  q: string;
  a: string;
}

/**
 * Two-column accordion built on native <details>, so it opens and closes
 * without JavaScript. The +/− indicator is driven purely by the `open`
 * attribute via Tailwind's `group-open:` variant.
 */
export default function FaqAccordion({ faqs }: { faqs: readonly Faq[] }) {
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <div className="grid gap-x-14 sm:grid-cols-2">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex}>
          {column.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-ink/10 py-5 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-ink/15 text-base font-light leading-none text-ink/45 transition-colors group-open:border-terracotta/15 group-open:bg-terracotta/15 group-open:text-terracotta"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>

              <p className="mt-3.5 max-w-[500px] text-justify text-sm leading-[1.75] text-ink/70 hyphens-auto">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
