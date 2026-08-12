import {
  BowlIcon,
  BriefcaseIcon,
  HandshakeIcon,
  IceCubeIcon,
  LeafIcon,
  SparkleIcon,
} from "@/components/icons/WellnessIcons";
import type { IconKey } from "@/lib/site-content";

/** Maps a service's `icon` key to its component. Shared by ServiceCard and ExperienceZone. */
export const SERVICE_ICONS: Record<
  IconKey,
  React.ComponentType<{ className?: string }>
> = {
  leaf: LeafIcon,
  sparkle: SparkleIcon,
  bowl: BowlIcon,
  ice: IceCubeIcon,
  handshake: HandshakeIcon,
  briefcase: BriefcaseIcon,
};
