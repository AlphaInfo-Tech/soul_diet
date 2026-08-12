"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/Button";
import { ONE_TO_ONE_HREF } from "@/lib/site-content";

export default function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  // Step aside once the footer is on screen so it never buries those links.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting),
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // The event page carries its own booking CTAs.
  if (pathname === "/event") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-6 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden">
      <div
        className={`pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-1.5 rounded-full border border-ink/10 bg-cream-light/95 p-1.5 shadow-xl shadow-ink/15 backdrop-blur transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link href={ONE_TO_ONE_HREF}>
          <Button
            variant="secondary"
            className="px-4 py-2 text-sm whitespace-nowrap"
          >
            <span className="sm:hidden">One-to-One</span>
            <span className="hidden sm:inline">Book a One-to-One</span>
          </Button>
        </Link>
        <Link href="/event">
          <Button className="px-4 py-2 text-sm whitespace-nowrap">
            <span className="sm:hidden">Upcoming Event</span>
            <span className="hidden sm:inline">Book Upcoming Event</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
