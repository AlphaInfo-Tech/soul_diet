import Link from "next/link";
import Button from "@/components/Button";
import SectionBlobs from "./SectionBlobs";
import { EVENT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
      <SectionBlobs colors={["bg-green-dark/25", "bg-terracotta/25"]} />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-terracotta/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-terracotta sm:px-4 sm:text-sm sm:tracking-[0.2em]">
          ✨ FOR THE FIRST TIME IN SALEM ✨
        </span>

        <h1 className="font-display mt-7 text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {EVENT.name}
        </h1>
        <p className="mx-auto mt-4 inline-block rounded-full bg-green/10 px-4 py-1.5 text-lg font-medium text-green">
          {EVENT.tagline}
        </p>

        <div className="mx-auto mt-10 max-w-xl space-y-4 text-center text-base leading-relaxed text-ink/80">
          <p>When was the last time you truly paused?</p>
          <p>
            Not to answer another call. Not to solve another problem. Not to
            plan your next move. Just... to breathe.
          </p>
          <p>
            As a business owner, you&apos;re constantly carrying
            responsibilities, making decisions, and pouring your energy into
            everyone and everything around you.
          </p>
          <p>
            But what if your next breakthrough doesn&apos;t come from working
            harder... What if it comes from slowing down?
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <Link href="/register">
            <Button className="w-full shadow-lg shadow-green/25 hover:shadow-xl hover:shadow-green/30 sm:w-auto">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
