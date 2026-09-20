import { EVENT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-dark px-6 py-10 text-center text-sm text-cream-light/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-terracotta/15 blur-3xl"
      />
      <div className="relative">
        <p className="font-display text-lg text-cream-light">{EVENT.name}</p>
        <p className="mt-2">
          {EVENT.dateLabel} · {EVENT.timeLabel} · {EVENT.location}
        </p>
        <p className="mt-4">
          © {EVENT.year} Soul Diet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
