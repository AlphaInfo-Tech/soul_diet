import Link from "next/link";
import Button from "@/components/Button";
import { EVENT } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream-light/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-display text-lg text-green">
          {EVENT.name}
        </Link>
        <Link href="/register">
          <Button className="px-4 py-2 text-sm sm:px-6 sm:py-3">Register Now</Button>
        </Link>
      </div>
    </header>
  );
}
