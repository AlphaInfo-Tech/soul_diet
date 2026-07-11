import Section from "./Section";
import SectionBlobs from "./SectionBlobs";
import { TICKETS } from "@/lib/constants";

export default function Pricing() {
  return (
    <Section decoration={<SectionBlobs colors={["bg-green-dark/20", "bg-terracotta/20"]} />}>
      <div className="text-center">
        <h2 className="font-display text-3xl text-ink">💰 Investment</h2>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-3xl border border-green/15 bg-white/60 p-8 text-center shadow-sm">
          <p className="text-2xl">🌿</p>
          <p className="mt-3 font-medium text-ink">
            {TICKETS.SOUND_HEALING.label}
          </p>
          <p className="mt-2 font-display text-3xl text-green">
            ₹{TICKETS.SOUND_HEALING.amount.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-green bg-white/80 p-8 text-center shadow-sm">
          <p className="text-2xl">🧊</p>
          <p className="mt-3 font-medium text-ink">
            {TICKETS.SOUND_HEALING_ICE_BATH.label}
          </p>
          <p className="mt-2 font-display text-3xl text-green">
            ₹{TICKETS.SOUND_HEALING_ICE_BATH.amount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-sm font-medium tracking-wide text-terracotta">
        ⚜️ Limited seats
      </p>
    </Section>
  );
}
