import { EVENT_LOCATIONS, TICKETS } from "./constants";
import { validateAppointmentWindow } from "./one-to-one";
import {
  AppointmentData,
  ContactFormState,
  Stage1Data,
  Stage2Data,
  Stage3Data,
} from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_RE = /^[6-9]\d{9}$/;

export function validateStage1(data: Stage1Data): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) errors.fullName = "Please enter your full name.";

  const age = Number(data.age);
  if (!data.age.trim()) errors.age = "Please enter your age.";
  else if (!Number.isFinite(age) || age < 16 || age > 90)
    errors.age = "Age must be between 16 and 90.";

  if (!data.city.trim()) errors.city = "Please enter your city of residence.";

  if (!data.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "That email address doesn't look right.";

  if (!data.contactNumber.trim())
    errors.contactNumber = "Please enter your contact number.";
  else if (!INDIA_PHONE_RE.test(data.contactNumber.trim()))
    errors.contactNumber = "Enter a valid 10-digit Indian mobile number.";

  return errors;
}

export function validateEventLocation(value: string): Record<string, string> {
  const errors: Record<string, string> = {};

  // Membership check, not just truthiness — a draft restored from
  // sessionStorage can carry a location that no longer exists.
  if (!value || !EVENT_LOCATIONS.some((l) => l.label === value))
    errors.eventLocation = "Please select your event location.";

  return errors;
}

export function validateContact(data: ContactFormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) errors.fullName = "Please enter your name.";

  if (!data.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "That email address doesn't look right.";

  // Phone is optional — validate only when something was typed.
  if (data.contactNumber.trim() && !INDIA_PHONE_RE.test(data.contactNumber.trim()))
    errors.contactNumber = "Enter a valid 10-digit Indian mobile number.";

  if (!data.subject) errors.subject = "Please pick what this is about.";

  if (!data.message.trim()) errors.message = "Please tell us a little about it.";
  else if (data.message.trim().length < 10)
    errors.message = "A sentence or two helps us reply properly.";

  return errors;
}

export function validateStage2(data: Stage2Data): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.hasMedicalCondition)
    errors.hasMedicalCondition = "Please let us know either way.";
  else if (
    data.hasMedicalCondition === "Yes" &&
    !data.medicalConditionDetails.trim()
  )
    errors.medicalConditionDetails = "Please share a few details so our team can review.";

  if (!data.onMedication) errors.onMedication = "Please let us know either way.";
  else if (data.onMedication === "Yes" && !data.medicationDetails.trim())
    errors.medicationDetails = "Please share a few details so our team can review.";

  if (!data.consentAgreed)
    errors.consentAgreed = "Please confirm and agree to continue.";

  return errors;
}

export function validateStage3(data: Stage3Data): Record<string, string> {
  const errors: Record<string, string> = {};

  // Membership check, not just truthiness — a draft restored from
  // sessionStorage can carry a ticket id that no longer exists.
  if (!data.ticketId || !(data.ticketId in TICKETS))
    errors.ticketId = "Please select a ticket.";
  if (!data.utr.trim()) errors.utr = "Please enter your UTR / Transaction ID.";
  if (!data.screenshotBase64) errors.screenshotFile = "Please upload your payment screenshot.";

  return errors;
}

export function validateAppointment(data: AppointmentData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.date) errors.date = "Please choose a date.";
  if (data.hour === null) errors.hour = "Please choose a time slot.";

  // Only run the window/past checks once both halves are present, so nobody is
  // told a slot has passed before they have even picked a date.
  if (data.date && data.hour !== null) {
    const windowError = validateAppointmentWindow(data.date, data.hour);
    if (windowError) errors.date = windowError;
  }

  return errors;
}
