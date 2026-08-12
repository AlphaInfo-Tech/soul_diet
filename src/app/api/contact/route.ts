import { NextRequest, NextResponse } from "next/server";
import { ContactRequestBody, ContactResponse } from "@/lib/types";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_RE = /^[6-9]\d{9}$/;
const MAX_MESSAGE_LENGTH = 4000;

function fail(error: string, status = 400) {
  return NextResponse.json<ContactResponse>({ success: false, error }, { status });
}

function validate(body: Partial<ContactRequestBody>): string | null {
  if (!body.fullName?.trim()) return "Your name is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim()))
    return "A valid email address is required.";
  // Phone is optional here — only reject a value that was supplied and is wrong.
  if (body.contactNumber?.trim() && !INDIA_PHONE_RE.test(body.contactNumber.trim()))
    return "Enter a valid 10-digit Indian contact number.";
  if (!body.subject?.trim()) return "Please pick what this is about.";
  if (!body.message?.trim()) return "A message is required.";
  if (body.message.trim().length > MAX_MESSAGE_LENGTH)
    return "That message is too long.";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactRequestBody>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  // Honeypot: a bot filled the hidden field. Report success and drop it.
  if (body.website?.trim()) {
    return NextResponse.json<ContactResponse>({ success: true }, { status: 200 });
  }

  const validationError = validate(body);
  if (validationError) return fail(validationError);

  const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  if (!webAppUrl) {
    console.error("GOOGLE_APPS_SCRIPT_WEB_APP_URL is not configured.");
    return fail("The contact form is temporarily unavailable.", 500);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const upstreamRes = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact_enquiry",
        fullName: body.fullName!.trim(),
        email: body.email!.trim().toLowerCase(),
        contactNumber: body.contactNumber?.trim() || "",
        subject: body.subject!.trim(),
        message: body.message!.trim(),
      }),
      signal: controller.signal,
    });

    const upstreamData = await upstreamRes.json();

    if (!upstreamRes.ok || !upstreamData.success) {
      return fail(upstreamData.error || "Could not send your message. Please try again.", 502);
    }

    return NextResponse.json<ContactResponse>({ success: true }, { status: 200 });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error("Apps Script contact relay failed:", err);
    return fail(isAbort ? "Request timed out." : "We couldn't send your message.", 502);
  } finally {
    clearTimeout(timeout);
  }
}
