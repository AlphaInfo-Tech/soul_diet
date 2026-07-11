import Section from "./Section";
import SectionBlobs from "./SectionBlobs";
import IconBadge from "@/components/IconBadge";
import {
  LeafIcon,
  IceCubeIcon,
  BowlIcon,
  GiftIcon,
  SparkleIcon,
  HandshakeIcon,
} from "@/components/icons/WellnessIcons";

const INCLUDED_ITEMS = [
  { icon: <LeafIcon />, text: "Sound Healing" },
  { icon: <IceCubeIcon />, text: "Optional Ice Bath Experience" },
  { icon: <BowlIcon />, text: "Nourishing Satvic Lunch" },
  { icon: <GiftIcon />, text: "Wellness Goodie Kit" },
  { icon: <SparkleIcon />, tone: "terracotta" as const, text: "Surprise Bonus" },
  {
    icon: <HandshakeIcon />,
    text: "Meaningful connection with like-minded business owners",
  },
];

export default function Included() {
  return (
    <Section decoration={<SectionBlobs colors={["bg-green-dark/20", "bg-terracotta/20"]} />}>
      <div className="rounded-3xl bg-white/60 p-8 shadow-sm sm:p-12">
        <h2 className="font-display text-3xl text-ink">
          A Wellness Experience for Business Owners
        </h2>
        <p className="mt-2 text-lg text-green">Pause. Reset. Realign.</p>

        <p className="mt-6 leading-relaxed text-ink/80">
          Take a mindful break from the hustle of business and gift yourself
          a day of deep relaxation, clarity, and renewal.
        </p>

        <p className="mt-6 font-medium text-ink">Your experience includes:</p>
        <ul className="mt-3 grid gap-3.5 sm:grid-cols-2">
          {INCLUDED_ITEMS.map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-ink/80">
              <IconBadge icon={item.icon} tone={item.tone} size="sm" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
