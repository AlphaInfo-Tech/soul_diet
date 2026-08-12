/**
 * One-to-one consultation booking rules.
 *
 * Shared by the booking form, the API route that validates a submission, and
 * (mirrored by hand) the Apps Script that writes the calendar event — so the
 * client and the server can never disagree about what a valid slot is.
 *
 * Everything here is in India Standard Time. Sessions are sold in Chennai, the
 * calendar lives in IST, and the visitor's device clock is not trusted for
 * anything that decides whether a booking is allowed.
 */

/** Appointments start on the hour, 9 AM through 5 PM — the last one ends at 6 PM. */
export const SLOT_START_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17] as const;

export const SESSION_MINUTES = 60;

/** Bookable from tomorrow up to this many days ahead. */
export const BOOKING_WINDOW_DAYS = 30;

const IST_OFFSET = "+05:30";
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** `YYYY-MM-DD` for the given instant, read as an IST wall-clock date. */
export function istDateKey(at: Date = new Date()): string {
  return new Date(at.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

export function addDaysToKey(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  // Built in UTC so the arithmetic can't be shifted by the runtime's timezone.
  const shifted = new Date(Date.UTC(y, m - 1, d + days));
  return shifted.toISOString().slice(0, 10);
}

/** The `min`/`max` a date input should accept, relative to today in IST. */
export function bookingBounds(now: Date = new Date()): {
  min: string;
  max: string;
} {
  const today = istDateKey(now);
  return {
    min: addDaysToKey(today, 1),
    max: addDaysToKey(today, BOOKING_WINDOW_DAYS),
  };
}

export function isValidSlotHour(hour: number): boolean {
  return (SLOT_START_HOURS as readonly number[]).includes(hour);
}

/** The exact instant a slot begins, pinned to IST rather than the caller's zone. */
export function slotStartIso(dateKey: string, hour: number): string {
  return `${dateKey}T${String(hour).padStart(2, "0")}:00:00${IST_OFFSET}`;
}

export function formatHour(hour: number): string {
  const suffix = hour < 12 ? "AM" : "PM";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}:00 ${suffix}`;
}

/** e.g. "9:00 AM – 10:00 AM" */
export function formatSlotRange(hour: number): string {
  return `${formatHour(hour)} – ${formatHour(hour + SESSION_MINUTES / 60)}`;
}

/** e.g. "Tuesday, 18 August 2026" — parsed as UTC so the label can't slip a day. */
export function formatDateLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Server-side gate for a requested appointment. Deliberately allows today as
 * well as tomorrow: a visitor west of IST can compute "tomorrow" as a date that
 * is still today here, and the in-the-past check below is the real guard.
 */
export function validateAppointmentWindow(
  dateKey: string,
  hour: number,
  now: Date = new Date()
): string | null {
  if (!DATE_KEY_RE.test(dateKey)) return "Please choose a valid appointment date.";
  if (!isValidSlotHour(hour)) return "Please choose a valid time slot.";

  const today = istDateKey(now);
  if (dateKey < today) return "That date has already passed.";
  if (dateKey > addDaysToKey(today, BOOKING_WINDOW_DAYS + 1))
    return `Appointments can only be booked up to ${BOOKING_WINDOW_DAYS} days ahead.`;

  const start = new Date(slotStartIso(dateKey, hour));
  if (Number.isNaN(start.getTime())) return "Please choose a valid appointment date.";
  if (start.getTime() <= now.getTime()) return "That time slot has already passed.";

  return null;
}
