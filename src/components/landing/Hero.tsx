import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import SectionBlobs from "./SectionBlobs";
import { EVENT } from "@/lib/constants";
import {
  CalendarIcon,
  ClockIcon,
  LeafIcon,
  LotusIcon,
  MapPinIcon,
  RefreshIcon,
} from "@/components/icons/WellnessIcons";

// Every retreat currently open for registration. Chennai draws straight from
// the EVENT constant used elsewhere on the site; Salem is new copy, kept in
// the same date/time format as Chennai's for a consistent plaque.
const LOCATIONS = [
  {
    name: "Chennai",
    dateLabel: EVENT.dateLabel,
    timeLabel: EVENT.timeLabel,
    location: EVENT.location,
  },
  {
    name: "Salem",
    dateLabel: "6th September 2026, Sunday",
    timeLabel: "9:00 AM – 6:00 PM",
    location: "Foothills Open Learning Centre, Salem, Tamil Nadu",
  },
] as const;

// The poster's three words, each with its own mark.
const MOTTO = [
  { icon: <LeafIcon />, word: "Pause." },
  { icon: <RefreshIcon />, word: "Reset." },
  { icon: <LotusIcon />, word: "Realign." },
];

const TONE_CLASSES = {
  green: "bg-green/10 text-green",
  terracotta: "bg-terracotta/10 text-terracotta",
};

interface HeroProps {
  /**
   * Show every retreat's date/time/location plaque, not just the first.
   * Only the /event page opts into this — the home page hero stays a
   * single-event teaser so it doesn't get crowded.
   */
  showAllLocations?: boolean;
}

export default function Hero({ showAllLocations = false }: HeroProps) {
  const locations = showAllLocations ? LOCATIONS : LOCATIONS.slice(0, 1);

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
      {/* The retreat itself, faded almost to nothing — texture behind the words
          rather than a picture. The gradient dissolves both seams into the
          page background, which is the same cream. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/eventimg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-cream-light),transparent_18%,transparent_82%,var(--color-cream-light))]" />
        {/* Soft-edged veil over the text column only, so the photo can stay
            strong at the edges without the copy fighting it. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_50%,rgba(247,242,231,0.96)_0%,rgba(247,242,231,0.8)_45%,transparent_80%)]" />
      </div>

      {/* wash={null} — the ink wash would grey the photo down. */}
      <SectionBlobs colors={["bg-green-dark/25", "bg-terracotta/25"]} wash={null} />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-terracotta/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-terracotta sm:px-4 sm:text-sm sm:tracking-[0.2em]">
          ✨ UPCOMING EVENT ✨
        </span>

        <h1 className="font-display mt-7 text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {EVENT.title}
        </h1>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7">
          {MOTTO.map((m, i) => (
            <li
              key={m.word}
              className={`flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-ink/80 uppercase sm:text-base ${
                i > 0 ? "border-ink/15 sm:border-l sm:pl-7" : ""
              }`}
            >
              <span className="h-5 w-5 text-green">{m.icon}</span>
              {m.word}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-6 inline-block rounded-full bg-green/10 px-4 py-1.5 text-lg font-medium text-green">
          {EVENT.tagline}
        </p>

        {/* The details are the point of this page — one panel per retreat,
            three columns each, so they read as a plaque rather than loose
            boxes. Stacked with space-y when more than one location shows. */}
        <div className="mx-auto mt-8 max-w-3xl space-y-6">
          {locations.map((loc) => {
            const details = [
              { icon: <CalendarIcon />, label: "Date", value: loc.dateLabel, tone: "green" },
              { icon: <ClockIcon />, label: "Time", value: loc.timeLabel, tone: "terracotta" },
              { icon: <MapPinIcon />, label: "Location", value: loc.location, tone: "green" },
            ] as const;

            return (
              <div
                key={loc.name}
                className="overflow-hidden rounded-2xl bg-transparent ring-1 ring-ink/10"
              >
                <span
                  aria-hidden="true"
                  className="block h-0.5 bg-gradient-to-r from-green/50 via-terracotta/50 to-green/50"
                />

                {locations.length > 1 && (
                  <p className="pt-4 text-center text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
                    {loc.name}
                  </p>
                )}

                <dl className="grid divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {details.map((d) => (
                    <div
                      key={d.label}
                      className="flex flex-col items-center px-5 py-5 sm:px-4"
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${TONE_CLASSES[d.tone]}`}
                      >
                        <span className="h-4 w-4">{d.icon}</span>
                      </span>

                      <dt className="mt-3 text-[9px] font-bold tracking-[0.18em] text-ink/60 uppercase">
                        {d.label}
                      </dt>
                      <dd className="font-display mt-1 text-center text-sm font-semibold leading-snug text-ink text-balance">
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>

        <div className="mt-9">
          <Link href="/register">
            <Button className="w-full sm:w-auto">Register Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
