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
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
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
  if (!p.ticketType || typeof p.amount !== "number") return "Invalid ticket selection.";
  if (!p.screenshotBase64) return "Payment screenshot is required.";
  if (p.consentAgreed !== true) return "Consent is required.";
  return null;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
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
  ]);
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
