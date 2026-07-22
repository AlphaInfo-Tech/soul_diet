import { NextRequest, NextResponse } from "next/server";
import { LeadRequestBody } from "@/lib/types";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_RE = /^[6-9]\d{9}$/;

interface LeadResponse {
  success: boolean;
  error?: string;
}

function fail(error: string, status = 400) {
  return NextResponse.json<LeadResponse>({ success: false, error }, { status });
}

function validate(body: Partial<LeadRequestBody>): string | null {
  if (!body.leadId?.trim()) return "Missing session identifier.";
  if (!body.fullName?.trim()) return "Full name is required.";
  if (typeof body.age !== "number" || body.age < 16 || body.age > 90)
    return "Age must be between 16 and 90.";
  if (!body.city?.trim()) return "City is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim()))
    return "A valid email address is required.";
  if (!body.contactNumber?.trim() || !INDIA_PHONE_RE.test(body.contactNumber.trim()))
    return "A valid 10-digit Indian contact number is required.";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadRequestBody>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  const validationError = validate(body);
  if (validationError) return fail(validationError);

  const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  if (!webAppUrl) {
    console.error("GOOGLE_APPS_SCRIPT_WEB_APP_URL is not configured.");
    return fail("Lead capture is temporarily unavailable.", 500);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const upstreamRes = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "stage1_lead",
        leadId: body.leadId!.trim(),
        fullName: body.fullName!.trim(),
        age: body.age,
        city: body.city!.trim(),
        email: body.email!.trim().toLowerCase(),
        contactNumber: body.contactNumber!.trim(),
      }),
      signal: controller.signal,
    });

    const upstreamData = await upstreamRes.json();

    if (!upstreamRes.ok || !upstreamData.success) {
      return fail(upstreamData.error || "Could not save lead. Please try again.", 502);
    }

    return NextResponse.json<LeadResponse>({ success: true }, { status: 200 });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error("Apps Script lead relay failed:", err);
    return fail(isAbort ? "Request timed out." : "We couldn't save your details.", 502);
  } finally {
    clearTimeout(timeout);
  }
}
