import type { Metadata } from "next";
import HomeLink from "@/components/register/HomeLink";
import BookingForm from "@/components/one-to-one/BookingForm";
import { SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Book a One-to-One",
  description:
    "Book a private one-to-one consultation with Soul Diet — pick a date and an hour that suits you, and get a confirmation straight away.",
  alternates: { canonical: "/one-to-one" },
};

export default function OneToOnePage() {
  return (
    <main className="flex-1 px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-lg">
        <HomeLink />
        <div className="mt-5 text-center">
          <p className="font-display text-lg text-green">{SITE.name}</p>
          <h1 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
            Book a One-to-One
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            A private session to work through what is specifically in your way.
            Two quick steps and the time is yours.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <BookingForm />
      </div>
    </main>
  );
}
