export const EVENT = {
  name: "SOUL DIET",
  tagline: "A Wellness Experience for Business Owners",
  dateLabel: "19 July 2026, Sunday",
  timeLabel: "9:30 AM – 3:00 PM",
  location: "Foothills Open Learning Centre, Salem, Tamil Nadu",
  year: 2026,
} as const;

export const TICKETS = {
  SOUND_HEALING: {
    id: "SOUND_HEALING",
    label: "Sound Healing",
    fullLabel: "Sound Healing – ₹2,999",
    amount: 2999,
    ticketType: "Sound Healing",
  },
  SOUND_HEALING_ICE_BATH: {
    id: "SOUND_HEALING_ICE_BATH",
    label: "Sound Healing + Ice Bath",
    fullLabel: "Sound Healing + Ice Bath – ₹3,999",
    amount: 3999,
    ticketType: "Sound Healing + Ice Bath",
  },
} as const;

export type TicketId = keyof typeof TICKETS;

export const MAX_SCREENSHOT_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_SCREENSHOT_TYPES = ["image/jpeg", "image/png", "image/jpg"];
