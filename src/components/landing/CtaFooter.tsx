import Link from "next/link";
import Button from "@/components/Button";
import Section from "./Section";
import SectionBlobs from "./SectionBlobs";

export default function CtaFooter() {
  return (
    <Section
      className="bg-green text-cream-light"
      decoration={<SectionBlobs colors={["bg-black/15", "bg-terracotta/25"]} wash={null} />}
    >
      <div className="text-center">
        <p className="font-display text-2xl leading-relaxed sm:text-3xl">
          Your business deserves the best version of you.
          <br />
          Pause. Reset. Realign.
        </p>
        <p className="mt-4 text-cream-light/80">
          Abundance of love and light
        </p>

        <div className="mt-10">
          <Link href="/register">
            <Button
              variant="ghost"
              className="w-full bg-[#e9e2d7] text-ink hover:bg-[#ddd0ac] sm:w-auto"
            >
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
