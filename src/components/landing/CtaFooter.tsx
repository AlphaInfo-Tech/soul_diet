import Link from "next/link";
import Button from "@/components/Button";
import Section from "./Section";
import { EVENT } from "@/lib/constants";

export default function CtaFooter() {
  return (
    <Section tone="green">
      <div className="text-center">
        <p className="font-display text-2xl leading-relaxed sm:text-3xl">
          You deserve the best version of you.
          <br />
          {EVENT.motto}
        </p>
        <p className="mt-4 text-cream-light/80">
          Abundance of love and light
        </p>

        <div className="mt-10">
          <Link href="/register">
            <Button
              variant="ghost"
              className="w-full !bg-cream-light text-ink hover:!bg-cream-dark sm:w-auto"
            >
              Register Now
            </Button>
          </Link>
        </div>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-light/70">
            For registrations, call
          </p>
          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl bg-cream-light px-6 py-3">
            {EVENT.registrationPhones.map((phone, i) => (
              <span key={phone.href} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="text-ink/30">
                    /
                  </span>
                )}
                <a
                  href={phone.href}
                  className="text-xl font-bold tracking-wide text-green transition-colors hover:text-green-dark sm:text-2xl"
                >
                  {phone.display}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
