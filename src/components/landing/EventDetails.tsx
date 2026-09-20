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
  green: "bg-green/10 text-green",
  terracotta: "bg-terracotta/10 text-terracotta",
};

export default function EventDetails() {
  return (
    <Section
      className="bg-cream"
      decoration={<SectionBlobs colors={["bg-terracotta/20", "bg-green-dark/20"]} wash={null} />}
    >
      <div className="flex items-center gap-4">
        <h2 className="font-display text-lg font-bold text-ink">Event Details</h2>
        <span aria-hidden="true" className="h-0.5 w-16 rounded-full bg-terracotta/30" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {DETAILS.map((d) => (
          <div
            key={d.label}
            // items-start, not centred: the location value wraps to several
            // lines and the icon should stay level with the label.
            className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-ink/5"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${TONE_CLASSES[d.tone]}`}
            >
              <span className="h-5 w-5">{d.icon}</span>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/50">
                {d.label}
              </p>
              <p className="mt-0.5 text-sm font-bold text-ink">{d.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
