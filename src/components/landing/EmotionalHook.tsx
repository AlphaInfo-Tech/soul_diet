import Link from "next/link";
import Section from "./Section";
import Button from "@/components/Button";
import IconBadge from "@/components/IconBadge";
import {
  LeafIcon,
  IceCubeIcon,
  BriefcaseIcon,
  BowlIcon,
  GiftIcon,
  SparkleIcon,
} from "@/components/icons/WellnessIcons";

const HOOK_ITEMS = [
  { icon: <LeafIcon />, text: "Experience the calming power of Sound Healing" },
  {
    icon: <IceCubeIcon />,
    text: "Challenge and awaken your body with an Ice Bath Experience (optional)",
  },
  {
    icon: <BriefcaseIcon />,
    text: "An exclusive wellness experience created especially for business owners, entrepreneurs, founders, and professionals who are ready to reset, recharge, and realign",
  },
  { icon: <BowlIcon />, text: "Enjoy a nourishing Satvic Lunch" },
  { icon: <GiftIcon />, text: "Receive a thoughtfully curated Wellness Goodie Kit" },
  {
    icon: <SparkleIcon />,
    tone: "terracotta" as const,
    text: "Plus, an exclusive surprise bonus to continue your wellness journey beyond the event.",
  },
];

export default function EmotionalHook() {
  return (
    <Section className="bg-cream">
      <ul className="space-y-5 text-base text-ink/90">
        {HOOK_ITEMS.map((item) => (
          <li key={item.text} className="flex items-center gap-4 text-left">
            <IconBadge icon={item.icon} tone={item.tone} />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-xl text-center">
        <Link href="/register">
          <Button className="w-full shadow-lg shadow-green/25 hover:shadow-xl hover:shadow-green/30 sm:w-auto">
            Register Now
          </Button>
        </Link>
      </div>
    </Section>
  );
}
