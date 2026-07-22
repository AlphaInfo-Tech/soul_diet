import { NextRequest, NextResponse } from "next/server";
import { RegisterRequestBody, RegisterResponse } from "@/lib/types";
import { MAX_SCREENSHOT_SIZE_BYTES, ALLOWED_SCREENSHOT_TYPES, TICKETS } from "@/lib/constants";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_RE = /^[6-9]\d{9}$/;
const DATA_URL_RE = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/;

// Best-effort in-memory rate limit. Serverless instances are ephemeral and
// may not share state, so this only deters naive repeat-submit bots, not a
// determined attacker — a real deployment should back this with Upstash/KV.
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
  const body: RegisterResponse = { success: false, error };
  return NextResponse.json(body, { status });
}

function validate(body: Partial<RegisterRequestBody>): string | null {
  if (!body.fullName?.trim()) return "Full name is required.";
  if (typeof body.age !== "number" || body.age < 16 || body.age > 90)
    return "Age must be between 16 and 90.";
  if (!body.city?.trim()) return "City is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim()))
    return "A valid email address is required.";
  if (!body.contactNumber?.trim() || !INDIA_PHONE_RE.test(body.contactNumber.trim()))
    return "A valid 10-digit Indian contact number is required.";

  if (body.hasMedicalCondition !== "Yes" && body.hasMedicalCondition !== "No")
    return "Please answer the medical condition question.";
  if (body.hasMedicalCondition === "Yes" && !body.medicalConditionDetails?.trim())
    return "Please provide medical condition details.";

  if (body.onMedication !== "Yes" && body.onMedication !== "No")
    return "Please answer the medication question.";
  if (body.onMedication === "Yes" && !body.medicationDetails?.trim())
    return "Please provide medication details.";

  if (body.consentAgreed !== true) return "You must confirm and agree to the consent statement.";

  const validTicket = Object.values(TICKETS).find(
    (t) => t.ticketType === body.ticketType && t.amount === body.amount
  );
  if (!validTicket) return "Invalid ticket selection.";

  if (!body.utr?.trim()) return "UTR / Transaction ID is required.";

  if (!body.screenshotBase64) return "Payment screenshot is required.";
  const match = DATA_URL_RE.exec(body.screenshotBase64);
  if (!match) return "Payment screenshot must be a valid image upload.";
  const [, mimeType, base64Data] = match;
  if (!ALLOWED_SCREENSHOT_TYPES.includes(mimeType)) return "Screenshot must be a JPG or PNG image.";

  const sizeBytes = Math.ceil((base64Data.length * 3) / 4);
  if (sizeBytes > MAX_SCREENSHOT_SIZE_BYTES) return "Screenshot must be under 5MB.";

  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many submissions. Please wait a minute and try again.", 429);
  }

  let body: Partial<RegisterRequestBody>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  // Honeypot: a real visitor never fills this hidden field.
  if (body.website) {
    return fail("Invalid submission.");
  }

  const validationError = validate(body);
  if (validationError) return fail(validationError);

  const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  if (!webAppUrl) {
    console.error("GOOGLE_APPS_SCRIPT_WEB_APP_URL is not configured.");
    return fail("Registration is temporarily unavailable. Please try again shortly.", 500);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const upstreamRes = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: body.fullName!.trim(),
        age: body.age,
        city: body.city!.trim(),
        email: body.email!.trim().toLowerCase(),
        contactNumber: body.contactNumber!.trim(),
        hasMedicalCondition: body.hasMedicalCondition,
        medicalConditionDetails: body.medicalConditionDetails ?? "",
        onMedication: body.onMedication,
        medicationDetails: body.medicationDetails ?? "",
        consentAgreed: body.consentAgreed,
        ticketType: body.ticketType,
        amount: body.amount,
        utr: body.utr ?? "",
        screenshotBase64: body.screenshotBase64,
        screenshotName: body.screenshotName ?? "screenshot.jpg",
      }),
      signal: controller.signal,
    });

    const upstreamData = await upstreamRes.json();

    if (!upstreamRes.ok || !upstreamData.success) {
      return fail(upstreamData.error || "Registration could not be saved. Please try again.", 502);
    }

    const successBody: RegisterResponse = {
      success: true,
      registrationNo: upstreamData.registrationNo,
      ticketType: body.ticketType!,
      amount: body.amount!,
      fullName: body.fullName!.trim(),
    };
    return NextResponse.json(successBody, { status: 200 });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error("Apps Script relay failed:", err);
    return fail(
      isAbort
        ? "The server took too long to respond. Please try again."
        : "We couldn't complete your registration. Please try again.",
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}
