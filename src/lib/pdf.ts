import { EVENT } from "./constants";
import { RegisterSuccessResponse } from "./types";

export async function downloadSummaryPdf(result: RegisterSuccessResponse) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const marginX = 56;
  let y = 80;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(74, 93, 69);
  doc.text(EVENT.name, marginX, y);

  y += 22;
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 70);
  doc.text(EVENT.tagline, marginX, y);

  y += 36;
  doc.setDrawColor(220, 210, 180);
  doc.line(marginX, y, 539, y);

  y += 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 25);
  doc.text("Registration Confirmed", marginX, y);

  const rows: [string, string][] = [
    ["Registration No.", result.registrationNo],
    ["Full Name", result.fullName],
    ["Ticket Type", result.ticketType],
    ["Amount Paid", `Rs. ${result.amount.toLocaleString("en-IN")}`],
    ["Event Date", EVENT.dateLabel],
    ["Event Time", EVENT.timeLabel],
    ["Location", EVENT.location],
  ];

  y += 28;
  doc.setFontSize(11);
  for (const [label, value] of rows) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 100);
    doc.text(label, marginX, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 25);
    doc.text(value, marginX + 160, y);

    y += 24;
  }

  y += 24;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(140, 140, 125);
  doc.text(
    "Please save this summary and show it at entry on event day.",
    marginX,
    y
  );

  doc.save(`${result.registrationNo}-SoulDiet-Summary.pdf`);
}
