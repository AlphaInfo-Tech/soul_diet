interface SectionBlobsProps {
  colors?: [string, string];
  wash?: string | null;
}

export default function SectionBlobs({
  colors = ["bg-green-dark/25", "bg-terracotta/25"],
  wash = "bg-ink/5",
}: SectionBlobsProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${colors[0]}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-3xl ${colors[1]}`}
      />
      {wash && <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${wash}`} />}
    </>
  );
}
