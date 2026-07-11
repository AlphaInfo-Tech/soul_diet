import { ReactNode } from "react";

interface IconBadgeProps {
  icon: ReactNode;
  tone?: "green" | "terracotta";
  size?: "sm" | "md";
}

const TONE_CLASSES: Record<string, string> = {
  green: "bg-green/10 text-green",
  terracotta: "bg-terracotta/10 text-terracotta",
};

const SIZE_CLASSES: Record<string, { badge: string; icon: string }> = {
  sm: { badge: "h-8 w-8", icon: "h-4 w-4" },
  md: { badge: "h-9 w-9", icon: "h-5 w-5" },
};

export default function IconBadge({ icon, tone = "green", size = "md" }: IconBadgeProps) {
  const { badge, icon: iconSize } = SIZE_CLASSES[size];
  return (
    <span
      className={`inline-flex ${badge} shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[tone]}`}
    >
      <span className={iconSize}>{icon}</span>
    </span>
  );
}
