import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c-1.5-5.5 1-11 9-13.5C21 3.5 21 8 19 12c-2.5 5-8.5 8-14 7Z" />
      <path d="M5 19c2-4 5-7.5 10.5-11.5" />
    </svg>
  );
}

export function IceCubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="2" />
      <path d="M4.5 9h15M9 4.5v15" />
    </svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11h17c0 4.5-3.8 8-8.5 8s-8.5-3.5-8.5-8Z" />
      <path d="M12 11V5.5M12 5.5c-1.2 0-2-.8-2-2M12 5.5c1.2 0 2-.8 2-2" />
      <path d="M2.5 11h19" />
    </svg>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="9.5" width="16" height="10.5" rx="1.5" />
      <path d="M4 13.5h16" />
      <path d="M12 9.5v10.5" />
      <path d="M12 9.5C9.5 9.5 8 8.3 8 6.7 8 5.5 8.9 4.5 10 4.5c1.6 0 2 2.2 2 5Z" />
      <path d="M12 9.5c2.5 0 4-1.2 4-2.8 0-1.2-.9-2.2-2-2.2-1.6 0-2 2.2-2 5Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c.6 3.4 1.6 4.4 5 5-3.4.6-4.4 1.6-5 5-.6-3.4-1.6-4.4-5-5 3.4-.6 4.4-1.6 5-5Z" />
      <path d="M19 15c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="2" />
      <path d="M8.5 7.5v-1a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1" />
      <path d="M3.5 12.5h17" />
      <path d="M11 12.5h2v1.5h-2z" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v4M16 3v4" />
      <path d="M8 13.5h2.2M8 17h2.2M13.8 13.5H16M13.8 17H16" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21S5 14.3 5 9.5a7 7 0 0 1 14 0C19 14.3 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12.5 6 9l3.5 3-2 2c-.6.6-1.6.6-2.2 0" />
      <path d="M21.5 12.5 18 9l-3.5 3 3.5 3.5c.6.6 1.6.6 2.2 0L21.5 14" />
      <path d="M9.5 12 12 14.3c.6.6 1.6.6 2.2 0l.3-.3" />
      <path d="M6 9l2.8-2.2a2 2 0 0 1 2.5 0L12 7.3l.7-.5a2 2 0 0 1 2.5 0L18 9" />
    </svg>
  );
}
