import Section from "./Section";
import SectionBlobs from "./SectionBlobs";
import { EVENT } from "@/lib/constants";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@/components/icons/WellnessIcons";

const DETAILS = [
  { icon: <CalendarIcon />, label: "Date", value: EVENT.dateLabel, tone: "green" },
  { icon: <ClockIcon />, label: "Time", value: EVENT.timeLabel, tone: "terracotta" },
  { icon: <MapPinIcon />, label: "Location", value: EVENT.location, tone: "green" },
] as const;

const TONE_CLASSES = {
  green: "bg-green text-cream-light",
  terracotta: "bg-terracotta text-cream-light",
};

export default function EventDetails() {
  return (
    <Section
      className="bg-cream"
      decoration={<SectionBlobs colors={["bg-terracotta/20", "bg-green-dark/20"]} wash={null} />}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {DETAILS.map((d) => (
          <div
            key={d.label}
            className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-ink/5 transition-transform hover:-translate-y-0.5"
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${TONE_CLASSES[d.tone]}`}
            >
              <span className="h-7 w-7">{d.icon}</span>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              {d.label}
            </p>
            <p className="mt-1.5 text-lg font-semibold text-ink">{d.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
