export const EVENT = {
  name: "SOUL DIET",
  /** The event itself — the /event page leads with this, not the brand name. */
  title: "One Day Retreat",
  tagline: "A Wellness Experience",
  motto: "Pause. Reset. Realign.",
  dateLabel: "27th September 2026, Sunday",
  timeLabel: "5:30 PM – 7:30 PM",
  location:
    "Yoga Mithraa Block No. 5, Part Senthil, 115/9, Public School Road, Jagir Ammapalayam, Salem, Tamil Nadu 636302",
  city: "Salem",
  year: 2026,
  /**
   * Numbers printed on the event poster. The first is also `CONTACT.phone` in
   * site-content.ts — kept here too because these are event facts, and that
   * file's header asks for event facts to live in this one.
   */
  registrationPhones: [
    { display: "77599 88447", href: "tel:+917759988447" },
    { display: "90030 51789", href: "tel:+919003051789" },
  ],
} as const;

export const TICKETS = {
  ONE_DAY_RETREAT: {
    id: "ONE_DAY_RETREAT",
    label: "One Day Retreat",
    fullLabel: "One Day Retreat – ₹1,299",
    amount: 1299,
    ticketType: "One Day Retreat",
  },
} as const;

export type TicketId = keyof typeof TICKETS;

export const MAX_SCREENSHOT_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_SCREENSHOT_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const UPI_PAYEE = {
  vpa: "gurugayathriguru-1@oksbi",
  name: "Soul Diet",
} as const;

export const REGISTRATION_DRAFT_KEY = "soul-diet-registration-draft";
export const PAYMENT_UPLOAD_TIMEOUT_MS = 5 * 60 * 1000;
