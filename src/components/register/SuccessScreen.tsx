"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";
import { EVENT } from "@/lib/constants";
import { downloadSummaryPdf } from "@/lib/pdf";
import { RegisterSuccessResponse } from "@/lib/types";

export default function SuccessScreen({ result }: { result: RegisterSuccessResponse }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadSummaryPdf(result);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
      <div className="text-4xl">🌿</div>
      <h1 className="font-display mt-4 text-2xl text-ink">
        You&apos;re in, {result.fullName}!
      </h1>

      <div className="mt-6 rounded-2xl bg-cream px-6 py-5">
        <p className="text-xs font-medium tracking-wide text-ink/50">
          REGISTRATION NO.
        </p>
        <p className="font-display mt-1 text-2xl text-green">
          {result.registrationNo}
        </p>
      </div>

      <div className="mt-6 space-y-1.5 text-left text-sm text-ink/80">
        <div className="flex justify-between border-b border-ink/10 py-2">
          <span className="text-ink/50">Ticket</span>
          <span className="font-medium">{result.ticketType}</span>
        </div>
        <div className="flex justify-between border-b border-ink/10 py-2">
          <span className="text-ink/50">Amount</span>
          <span className="font-medium">₹{result.amount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between border-b border-ink/10 py-2">
          <span className="text-ink/50">Date</span>
          <span className="font-medium">{EVENT.dateLabel}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-ink/50">Location</span>
          <span className="text-right font-medium">{EVENT.location}</span>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink/70">
        We&apos;ve noted your details — our team will verify your payment and
        reach out on WhatsApp/email if anything&apos;s missing. Please
        screenshot or save your registration number for entry on event day.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading ? "Preparing PDF…" : "Download Summary as PDF"}
        </Button>
        <Link href="/">
          <Button variant="ghost" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
