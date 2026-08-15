// Single source of truth for business hours + open/closed status.
// Baidyanath Enterprise: Monday–Saturday 9 AM–6 PM, Sunday closed (IST).

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  label: string;
  short: string;
  open: string; // "9:00 AM" — display
  close: string;
  openMin: number | null; // minutes from midnight, null = closed
  closeMin: number | null;
}

const WEEKDAY = { open: "9:00 AM", close: "6:00 PM", openMin: 9 * 60, closeMin: 18 * 60 };

export const WEEK: DayHours[] = [
  { day: 1, label: "Monday", short: "Mon", ...WEEKDAY },
  { day: 2, label: "Tuesday", short: "Tue", ...WEEKDAY },
  { day: 3, label: "Wednesday", short: "Wed", ...WEEKDAY },
  { day: 4, label: "Thursday", short: "Thu", ...WEEKDAY },
  { day: 5, label: "Friday", short: "Fri", ...WEEKDAY },
  { day: 6, label: "Saturday", short: "Sat", ...WEEKDAY },
  { day: 0, label: "Sunday", short: "Sun", open: "Closed", close: "", openMin: null, closeMin: null },
];

/** Current time in IST as {day, minutes-from-midnight}, independent of viewer TZ. */
function nowIST(): { day: number; minutes: number } {
  const now = new Date();
  // IST = UTC+5:30, no DST.
  const istMs = now.getTime() + (330 + now.getTimezoneOffset()) * 60000;
  const ist = new Date(istMs);
  return { day: ist.getDay(), minutes: ist.getHours() * 60 + ist.getMinutes() };
}

export interface OpenStatus {
  open: boolean;
  /** minutes until it opens (when closed) or closes (when open) */
  until: number | null;
  today: DayHours;
}

export function getOpenStatus(): OpenStatus {
  const { day, minutes } = nowIST();
  const today = WEEK.find((d) => d.day === day)!;
  if (today.openMin == null || today.closeMin == null) {
    return { open: false, until: null, today };
  }
  if (minutes < today.openMin) return { open: false, until: today.openMin - minutes, today };
  if (minutes >= today.closeMin) return { open: false, until: null, today };
  return { open: true, until: today.closeMin - minutes, today };
}

/** WEEK reordered to start on Monday, for display tables. */
export const WEEK_MON_FIRST: DayHours[] = [
  ...WEEK.filter((d) => d.day !== 0),
  WEEK.find((d) => d.day === 0)!,
];
