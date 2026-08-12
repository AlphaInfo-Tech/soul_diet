import { NextRequest, NextResponse } from "next/server";
import { OneToOneRequestBody, OneToOneResponse } from "@/lib/types";
import {
  SESSION_MINUTES,
  formatDateLabel,
  formatSlotRange,
  slotStartIso,
  validateAppointmentWindow,
} from "@/lib/one-to-one";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_RE = /^[6-9]\d{9}$/;

// Same best-effort in-memory limiter as /api/register — deters naive repeat
// submits, not a determined attacker. Serverless instances are ephemeral and
// may not share state.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function fail(error: string, status = 400) {
  const body: OneToOneResponse = { success: false, error };
  return NextResponse.json(body, { status });
}

function validate(body: Partial<OneToOneRequestBody>): string | null {
  if (!body.bookingId?.trim()) return "Missing session identifier.";
  if (!body.fullName?.trim()) return "Full name is required.";
  if (typeof body.age !== "number" || body.age < 16 || body.age > 90)
    return "Age must be between 16 and 90.";
  if (!body.city?.trim()) return "City is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim()))
    return "A valid email address is required.";
  if (!body.contactNumber?.trim() || !INDIA_PHONE_RE.test(body.contactNumber.trim()))
    return "A valid 10-digit Indian contact number is required.";

  // The appointment is re-checked here rather than trusted from the client —
  // the same gate the booking form runs, on a clock we control.
  if (typeof body.hour !== "number") return "Please choose a time slot.";
  return validateAppointmentWindow(body.date ?? "", body.hour);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many submissions. Please wait a minute and try again.", 429);
  }

  let body: Partial<OneToOneRequestBody>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  // Honeypot: a real visitor never fills this hidden field.
  if (body.website) return fail("Invalid submission.");

  const validationError = validate(body);
  if (validationError) return fail(validationError);

  const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  if (!webAppUrl) {
    console.error("GOOGLE_APPS_SCRIPT_WEB_APP_URL is not configured.");
    return fail("Booking is temporarily unavailable. Please try again shortly.", 500);
  }

  const date = body.date!;
  const hour = body.hour!;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const upstreamRes = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "one_to_one_booking",
        bookingId: body.bookingId!.trim(),
        fullName: body.fullName!.trim(),
        age: body.age,
        city: body.city!.trim(),
        email: body.email!.trim().toLowerCase(),
        contactNumber: body.contactNumber!.trim(),
        date,
        hour,
        // Sent pre-built so the script never has to guess a timezone.
        startIso: slotStartIso(date, hour),
        sessionMinutes: SESSION_MINUTES,
        dateLabel: formatDateLabel(date),
        slotLabel: formatSlotRange(hour),
      }),
      signal: controller.signal,
    });

    const upstreamData = await upstreamRes.json();

    if (!upstreamRes.ok || !upstreamData.success) {
      return fail(
        upstreamData.error || "Your booking could not be saved. Please try again.",
        502
      );
    }

    const successBody: OneToOneResponse = {
      success: true,
      fullName: body.fullName!.trim(),
      date,
      hour,
    };
    return NextResponse.json(successBody, { status: 200 });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error("Apps Script one-to-one relay failed:", err);
    return fail(
      isAbort
        ? "The server took too long to respond. Please try again."
        : "We couldn't complete your booking. Please try again.",
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}
