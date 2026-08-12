import Section from "./Section";
import IconBadge from "@/components/IconBadge";
import {
  LeafIcon,
  IceCubeIcon,
  BowlIcon,
  GiftIcon,
  SparkleIcon,
  LotusIcon,
  PeopleIcon,
} from "@/components/icons/WellnessIcons";

const INCLUDED_ITEMS = [
  {
    icon: <LeafIcon />,
    title: "Sound Healing",
    text: "Deep relaxation through healing vibrations.",
  },
  {
    icon: <IceCubeIcon />,
    title: "Ice Bath Experience",
    text: "Boost energy, resilience and mental clarity.",
  },
  {
    icon: <LotusIcon />,
    title: "Guided Reset",
    text: "Release stress, reconnect and realign your goals.",
  },
  {
    icon: <PeopleIcon />,
    title: "Meaningful Connection",
    text: "Connect with like-minded people.",
  },
];

const EXTRAS = [
  { icon: <GiftIcon />, text: "Wellness Goodie Kit" },
  { icon: <SparkleIcon />, tone: "terracotta" as const, text: "Surprise Bonus" },
];

export default function Included() {
  return (
    <Section tone="cream">
      <div className="rounded-3xl bg-white/70 p-8 shadow-sm sm:p-12">
        <h2 className="font-display text-3xl text-ink">Experience Includes</h2>

        <p className="mt-4 leading-relaxed text-ink/80">
          Take a mindful break from the hustle and gift yourself a day of deep
          relaxation, clarity, and renewal.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {INCLUDED_ITEMS.map((item) => (
            <li key={item.title} className="flex gap-3">
              <IconBadge icon={item.icon} />
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-9 text-xs font-semibold uppercase tracking-widest text-ink/50">
          Also included
        </p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {EXTRAS.map((extra) => (
            <li
              key={extra.text}
              className="flex items-center gap-2.5 rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink/80"
            >
              <IconBadge icon={extra.icon} tone={extra.tone} size="sm" />
              {extra.text}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green/10 px-5 py-4">
          <span className="h-6 w-6 shrink-0 text-green">
            <BowlIcon />
          </span>
          <p className="font-medium text-green">
            Food and refreshments will be provided
          </p>
        </div>
      </div>
    </Section>
  );
}
