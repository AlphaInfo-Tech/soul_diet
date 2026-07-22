import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Stage3Data } from "@/lib/types";
import {
  TICKETS,
  MAX_SCREENSHOT_SIZE_BYTES,
  ALLOWED_SCREENSHOT_TYPES,
  UPI_PAYEE,
  PAYMENT_UPLOAD_TIMEOUT_MS,
} from "@/lib/constants";
import { buildUpiLink } from "@/lib/upi";
import { FieldWrapper, TextField } from "./FormFields";
import DynamicQr from "./DynamicQr";

interface Props {
  data: Stage3Data;
  errors: Record<string, string>;
  onChange: (patch: Partial<Stage3Data>) => void;
  paymentStartedAt: number | null;
  onPayAttempt: () => void;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Stage3Payment({
  data,
  errors,
  onChange,
  paymentStartedAt,
  onPayAttempt,
}: Props) {
  const selectedTicket = data.ticketId ? TICKETS[data.ticketId] : null;
  const awaitingReturnRef = useRef(false);
  const screenshotFieldRef = useRef<HTMLDivElement>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === "visible" && awaitingReturnRef.current) {
        awaitingReturnRef.current = false;
        const expired =
          paymentStartedAt !== null &&
          Date.now() - paymentStartedAt >= PAYMENT_UPLOAD_TIMEOUT_MS;
        if (!data.screenshotBase64 && !expired) {
          setShowWelcomeBack(true);
          screenshotFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [data.screenshotBase64, paymentStartedAt]);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_SCREENSHOT_TYPES.includes(file.type)) {
      onChange({ screenshotFile: null, screenshotBase64: "", screenshotName: "" });
      alert("Please upload a JPG or PNG image.");
      return;
    }
    if (file.size > MAX_SCREENSHOT_SIZE_BYTES) {
      onChange({ screenshotFile: null, screenshotBase64: "", screenshotName: "" });
      alert("File is too large. Please upload an image under 5MB.");
      return;
    }

    const base64 = await fileToBase64(file);
    onChange({ screenshotFile: file, screenshotBase64: base64, screenshotName: file.name });
    setShowWelcomeBack(false);
  }

  const upiLink = selectedTicket
    ? buildUpiLink({
        payeeVpa: UPI_PAYEE.vpa,
        payeeName: UPI_PAYEE.name,
        amount: selectedTicket.amount,
        transactionNote: `SOULDIET-2026 ${selectedTicket.label}`,
      })
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-ink">Ticket & Payment</h2>
        <p className="mt-1 text-sm text-ink/60">
          Pick your ticket, complete the payment, and upload your screenshot as proof.
        </p>
      </div>

      <FieldWrapper label="Select Ticket" error={errors.ticketId}>
        <div className="space-y-3">
          {Object.values(TICKETS).map((t) => (
            <label
              key={t.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 transition-colors ${
                data.ticketId === t.id
                  ? "border-green bg-green/10"
                  : "border-ink/15 bg-white hover:border-ink/30"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="ticketId"
                  value={t.id}
                  checked={data.ticketId === t.id}
                  onChange={() => onChange({ ticketId: t.id })}
                  className="h-4 w-4 accent-green"
                />
                <span className="text-sm font-medium text-ink">{t.label}</span>
              </span>
              <span className="font-display text-lg text-green">
                ₹{t.amount.toLocaleString("en-IN")}
              </span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <div className="rounded-2xl border border-ink/15 bg-white p-5 text-center">
        <p className="text-sm font-medium text-ink">Scan &amp; Pay</p>
        <p className="mt-1 text-xs text-ink/50">
          {selectedTicket
            ? `Pay ₹${selectedTicket.amount.toLocaleString("en-IN")} for ${selectedTicket.label}`
            : "Select a ticket above to see the amount"}
        </p>
        <div className="mx-auto mt-4 flex h-52 w-52 items-center justify-center overflow-hidden rounded-xl bg-cream">
          {upiLink ? (
            <DynamicQr value={upiLink} size={208} className="h-full w-full object-contain" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/qr-soul-diet.jpeg"
              alt="Payment QR code"
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-ink">
          UPI ID: <span className="text-green">{UPI_PAYEE.vpa}</span>
        </p>

        {selectedTicket && (
          <a
            href={upiLink ?? undefined}
            onClick={() => {
              awaitingReturnRef.current = true;
              onPayAttempt();
            }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-medium text-cream-light transition-colors hover:bg-green-dark sm:w-auto"
          >
            Pay via UPI App
          </a>
        )}

        <p className="mt-4 text-xs text-ink/50">
          Pay via any UPI app (or scan the QR code above), then come back to
          this page and upload your payment screenshot below.
        </p>
        <p className="mt-1 text-xs font-medium text-terracotta">
          Please upload your screenshot within 5 minutes of paying, or
          you&apos;ll need to start over.
        </p>
        <p className="mt-3 text-xs text-ink/50">
          For queries, call{" "}
          <a href="tel:7759988447" className="font-medium text-green">
            7759988447
          </a>
        </p>
      </div>

      <div ref={screenshotFieldRef}>
        {showWelcomeBack && !data.screenshotBase64 && (
          <p className="mb-3 rounded-xl bg-green/10 px-4 py-3 text-sm text-green">
            Welcome back! Please upload your payment screenshot below to
            finish registering.
          </p>
        )}
        <FieldWrapper label="Payment Screenshot" error={errors.screenshotFile} hint="JPG or PNG, up to 5MB">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-ink/25 bg-white px-4 py-8 text-center hover:border-green/50">
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFile}
              className="sr-only"
            />
            {data.screenshotName ? (
              <span className="text-sm font-medium text-green">✓ {data.screenshotName}</span>
            ) : (
              <span className="text-sm text-ink/60">Tap to upload your screenshot</span>
            )}
          </label>
        </FieldWrapper>
      </div>

      <TextField
        id="utr"
        label="UTR / Transaction ID"
        value={data.utr}
        onChange={(e) => onChange({ utr: e.target.value })}
        placeholder="12-digit reference number"
        hint="Helps us match your payment faster."
        error={errors.utr}
      />
    </div>
  );
}
