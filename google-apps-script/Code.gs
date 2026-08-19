/**
 * SOUL DIET — Registration backend (Google Apps Script Web App)
 *
 * Deploy: Extensions > Apps Script in your Google Sheet, paste this file as
 * Code.gs, then Deploy > New deployment > Web app
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy the resulting /exec URL into GOOGLE_APPS_SCRIPT_WEB_APP_URL in the
 * Next.js project's environment variables.
 */

const SHEET_NAME = "Registrations";
const DRIVE_FOLDER_NAME = "SoulDiet_Payment_Screenshots";
const REG_PREFIX = "SOULDIET-2026-";

const SHEET_HEADERS = [
  "Timestamp",
  "Registration No.",
  "Full Name",
  "Age",
  "City",
  "Email",
  "Contact Number",
  "Has Medical Condition",
  "Medical Condition Details",
  "On Medication",
  "Medication Details",
  "Consent Agreed",
  "Ticket Type",
  "Amount",
  "UTR / Transaction ID",
  "Payment Screenshot Drive Link",
  "Status",
  "Event Location",
  "Event Date",
];

const LEADS_SHEET_NAME = "General Leads";
const LEADS_SHEET_HEADERS = [
  "Timestamp",
  "Lead ID",
  "Full Name",
  "Age",
  "City",
  "Email",
  "Contact Number",
  "Last Updated",
];

/**
 * One-to-one consultations. A single tab holds both halves of the funnel: the
 * row is written when step 1 is completed (Status "Lead") and updated in place
 * when the appointment is confirmed, so abandoned enquiries stay visible.
 */
const ONE_TO_ONE_SHEET_NAME = "One-to-One Bookings";
const ONE_TO_ONE_SHEET_HEADERS = [
  "Timestamp",
  "Booking ID",
  "Full Name",
  "Age",
  "City",
  "Email",
  "Contact Number",
  "Appointment Date",
  "Time Slot",
  "Calendar Event ID",
  "Status",
  "Last Updated",
];

/**
 * ⚠️ PASTE YOUR CALENDAR ID HERE before deploying.
 * Google Calendar → the calendar's Settings → "Integrate calendar" → Calendar ID.
 * Looks like "abc123@group.calendar.google.com", or your own address for the
 * default calendar. The account running this script must be able to edit it.
 */
const ONE_TO_ONE_CALENDAR_ID = "";

const ONE_TO_ONE_SESSION_MINUTES = 60;

const CONTACT_SHEET_NAME = "Contact Enquiries";
const CONTACT_SHEET_HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Contact Number",
  "Subject",
  "Message",
  "Status",
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.type === "stage1_lead") {
      return handleStage1Lead_(payload);
    }

    if (payload.type === "contact_enquiry") {
      return handleContactEnquiry_(payload);
    }

    if (payload.type === "one_to_one_lead") {
      return handleOneToOneLead_(payload);
    }

    if (payload.type === "one_to_one_booking") {
      return handleOneToOneBooking_(payload);
    }

    const error = validatePayload_(payload);
    if (error) return jsonOutput_({ success: false, error: error });

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);

    let registrationNo, driveLink;
    try {
      const sheet = getSheet_();
      registrationNo = generateUniqueRegistrationNo_(sheet);
      driveLink = uploadScreenshot_(payload, registrationNo);
      appendRow_(sheet, payload, registrationNo, driveLink);
    } finally {
      lock.releaseLock();
    }

    return jsonOutput_({
      success: true,
      registrationNo: registrationNo,
      ticketType: payload.ticketType,
      amount: payload.amount,
    });
  } catch (err) {
    return jsonOutput_({ success: false, error: "Server error: " + err.message });
  }
}

function validatePayload_(p) {
  if (!p.fullName || !p.email || !p.contactNumber) return "Missing required fields.";
  if (!p.eventLocation || !p.eventDate) return "Please select an event location.";
  if (!p.ticketType || typeof p.amount !== "number") return "Invalid ticket selection.";
  if (!p.screenshotBase64) return "Payment screenshot is required.";
  if (p.consentAgreed !== true) return "Consent is required.";
  return null;
}

function getSheet_() {
  return getOrCreateSheet_(SHEET_NAME, SHEET_HEADERS);
}

function getOrCreateSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function handleStage1Lead_(payload) {
  const error = validateLeadPayload_(payload);
  if (error) return jsonOutput_({ success: false, error: error });

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = getOrCreateSheet_(LEADS_SHEET_NAME, LEADS_SHEET_HEADERS);
    const now = new Date();
    const existingRow = findRowByLeadId_(sheet, payload.leadId);

    if (existingRow) {
      sheet
        .getRange(existingRow, 3, 1, 6)
        .setValues([[
          payload.fullName,
          payload.age,
          payload.city,
          payload.email,
          payload.contactNumber,
          now,
        ]]);
    } else {
      sheet.appendRow([
        now,
        payload.leadId,
        payload.fullName,
        payload.age,
        payload.city,
        payload.email,
        payload.contactNumber,
        now,
      ]);
    }
  } finally {
    lock.releaseLock();
  }

  return jsonOutput_({ success: true });
}

function validateLeadPayload_(p) {
  if (!p.leadId) return "Missing session identifier.";
  if (!p.fullName || !p.email || !p.contactNumber) return "Missing required fields.";
  return null;
}

function handleContactEnquiry_(payload) {
  const error = validateContactPayload_(payload);
  if (error) return jsonOutput_({ success: false, error: error });

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = getOrCreateSheet_(CONTACT_SHEET_NAME, CONTACT_SHEET_HEADERS);
    sheet.appendRow([
      new Date(),
      payload.fullName,
      payload.email,
      payload.contactNumber || "",
      payload.subject,
      payload.message,
      "New",
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonOutput_({ success: true });
}

/** Step 1 of the booking — upsert the person's details as a pending lead. */
function handleOneToOneLead_(payload) {
  const error = validateOneToOneLeadPayload_(payload);
  if (error) return jsonOutput_({ success: false, error: error });

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = getOrCreateSheet_(ONE_TO_ONE_SHEET_NAME, ONE_TO_ONE_SHEET_HEADERS);
    upsertOneToOneLeadRow_(sheet, payload);
  } finally {
    lock.releaseLock();
  }

  return jsonOutput_({ success: true });
}

/**
 * Step 2 — claim the slot on the calendar and confirm the row.
 *
 * The whole thing runs inside the script lock so two people submitting the
 * same slot at once can't both pass the clash check.
 */
function handleOneToOneBooking_(payload) {
  const error = validateOneToOneBookingPayload_(payload);
  if (error) return jsonOutput_({ success: false, error: error });

  if (!ONE_TO_ONE_CALENDAR_ID) {
    return jsonOutput_({
      success: false,
      error: "Bookings are not configured yet. Please call us to book.",
    });
  }

  const calendar = CalendarApp.getCalendarById(ONE_TO_ONE_CALENDAR_ID);
  if (!calendar) {
    return jsonOutput_({
      success: false,
      error:
        "Bookings are not configured yet. Please call us to book. (Calendar not found or not shared with the script account.)",
    });
  }

  const start = new Date(payload.startIso);
  if (isNaN(start.getTime())) {
    return jsonOutput_({ success: false, error: "Invalid appointment time." });
  }
  const minutes = payload.sessionMinutes || ONE_TO_ONE_SESSION_MINUTES;
  const end = new Date(start.getTime() + minutes * 60 * 1000);

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  let eventId;
  try {
    // getEvents returns anything overlapping the range; back-to-back sessions
    // that merely touch at the boundary are not treated as a clash.
    const overlapping = calendar.getEvents(start, end).filter(function (e) {
      return e.getEndTime() > start && e.getStartTime() < end;
    });
    if (overlapping.length > 0) {
      return jsonOutput_({
        success: false,
        error: "That time slot has just been booked. Please choose another.",
      });
    }

    const event = calendar.createEvent(
      "One-to-One · " + payload.fullName,
      start,
      end,
      {
        description: [
          "Name: " + payload.fullName,
          "Age: " + payload.age,
          "City: " + payload.city,
          "Email: " + payload.email,
          "Phone: " + payload.contactNumber,
          "",
          "Booked via souldiet.in",
        ].join("\n"),
      }
    );
    eventId = event.getId();

    // A calendar that cannot invite guests must not sink an otherwise good
    // booking — the session is already held either way.
    try {
      event.addGuest(payload.email);
    } catch (guestErr) {
      Logger.log("Could not add guest to one-to-one event: " + guestErr.message);
    }

    const sheet = getOrCreateSheet_(ONE_TO_ONE_SHEET_NAME, ONE_TO_ONE_SHEET_HEADERS);
    // Covers the case where the lead call never landed (offline, blocked).
    const row = upsertOneToOneLeadRow_(sheet, payload);
    sheet
      .getRange(row, 8, 1, 5)
      .setValues([[payload.date, payload.slotLabel, eventId, "Confirmed", new Date()]]);
  } finally {
    lock.releaseLock();
  }

  return jsonOutput_({ success: true, eventId: eventId });
}

/** Writes or refreshes the person's details, returning the row number. */
function upsertOneToOneLeadRow_(sheet, payload) {
  const now = new Date();
  const existingRow = findRowByLeadId_(sheet, payload.bookingId);

  if (existingRow) {
    sheet
      .getRange(existingRow, 3, 1, 5)
      .setValues([[
        payload.fullName,
        payload.age,
        payload.city,
        payload.email,
        payload.contactNumber,
      ]]);
    sheet.getRange(existingRow, 12).setValue(now);
    return existingRow;
  }

  sheet.appendRow([
    now,
    payload.bookingId,
    payload.fullName,
    payload.age,
    payload.city,
    payload.email,
    payload.contactNumber,
    "",
    "",
    "",
    "Lead",
    now,
  ]);
  return sheet.getLastRow();
}

function validateOneToOneLeadPayload_(p) {
  if (!p.bookingId) return "Missing session identifier.";
  if (!p.fullName || !p.email || !p.contactNumber) return "Missing required fields.";
  return null;
}

function validateOneToOneBookingPayload_(p) {
  const leadError = validateOneToOneLeadPayload_(p);
  if (leadError) return leadError;
  if (!p.date || typeof p.hour !== "number") return "Please choose a date and time slot.";
  if (!p.startIso) return "Invalid appointment time.";
  return null;
}

function validateContactPayload_(p) {
  if (!p.fullName || !p.email) return "Missing required fields.";
  if (!p.subject) return "Missing subject.";
  if (!p.message) return "Missing message.";
  return null;
}

function findRowByLeadId_(sheet, leadId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const values = sheet.getRange(2, 2, lastRow - 1, 1).getValues(); // column B
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(leadId)) return i + 2;
  }
  return null;
}

function generateUniqueRegistrationNo_(sheet) {
  const existing = getExistingRegistrationNumbers_(sheet);

  let attempts = 0;
  while (attempts < 200) {
    const candidate = REG_PREFIX + String(Math.floor(Math.random() * 10000)).padStart(4, "0");
    if (!existing.has(candidate)) return candidate;
    attempts++;
  }
  throw new Error("Could not generate a unique registration number. Please try again.");
}

function getExistingRegistrationNumbers_(sheet) {
  const lastRow = sheet.getLastRow();
  const set = new Set();
  if (lastRow < 2) return set;

  const values = sheet.getRange(2, 2, lastRow - 1, 1).getValues(); // column B
  values.forEach((row) => {
    if (row[0]) set.add(String(row[0]));
  });
  return set;
}

function uploadScreenshot_(payload, registrationNo) {
  const match = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/.exec(payload.screenshotBase64);
  if (!match) throw new Error("Invalid screenshot data.");

  const mimeType = match[1];
  const base64Data = match[2];
  const extension = mimeType === "image/png" ? "png" : "jpg";
  const safeName = String(payload.fullName).replace(/[^a-zA-Z0-9]+/g, "_").slice(0, 40);
  const fileName = `${registrationNo}_${safeName}.${extension}`;

  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
  const folder = getOrCreateFolder_(DRIVE_FOLDER_NAME);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return file.getUrl();
}

function getOrCreateFolder_(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function appendRow_(sheet, payload, registrationNo, driveLink) {
  sheet.appendRow([
    new Date(),
    registrationNo,
    payload.fullName,
    payload.age,
    payload.city,
    payload.email,
    payload.contactNumber,
    payload.hasMedicalCondition,
    payload.medicalConditionDetails || "",
    payload.onMedication,
    payload.medicationDetails || "",
    payload.consentAgreed ? "Yes" : "No",
    payload.ticketType,
    payload.amount,
    payload.utr || "",
    driveLink,
    "Pending Verification",
    payload.eventLocation || "",
    payload.eventDate || "",
  ]);
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
