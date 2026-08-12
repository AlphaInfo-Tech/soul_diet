import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Included from "@/components/landing/Included";
import CtaFooter from "@/components/landing/CtaFooter";
import { EVENT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "One Day Retreat — Sound Healing + Ice Bath in Chennai",
  description: `${EVENT.motto} A one day wellness retreat in ${EVENT.city} — sound healing, ice bath experience, guided reset and meaningful connection. ${EVENT.dateLabel}. Food and refreshments provided.`,
};

export default function EventPage() {
  return (
    <>
      <Hero />
      <Included />
      <CtaFooter />
    </>
  );
}
