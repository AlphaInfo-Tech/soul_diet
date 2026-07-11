import type { Metadata } from "next";
import HomeLink from "@/components/register/HomeLink";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata: Metadata = {
  title: "Register — SOUL DIET",
  description: "Reserve your seat for the Soul Diet wellness experience in Salem, 19 July 2026.",
};

export default function RegisterPage() {
  return (
    <main className="flex-1 px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-lg">
        <HomeLink />
        <div className="mt-5 text-center">
          <p className="font-display text-lg text-green">SOUL DIET</p>
          <h1 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
            Reserve Your Seat
          </h1>
        </div>
      </div>

      <div className="mt-10">
        <RegisterForm />
      </div>
    </main>
  );
}
