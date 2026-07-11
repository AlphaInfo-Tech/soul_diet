"use client";

import { useRouter } from "next/navigation";

export default function HomeLink() {
  const router = useRouter();

  function handleClick() {
    const confirmed = window.confirm(
      "Leave registration? Your form details entered so far will be cleared."
    );
    if (confirmed) router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-green/40 hover:text-green"
    >
      <span aria-hidden="true">←</span>
      Home
    </button>
  );
}
