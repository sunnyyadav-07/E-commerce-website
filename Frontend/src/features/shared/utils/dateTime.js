/**
 * Formats an ISO date string to a readable date (e.g. "10 Aug 2026")
 */
export const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

/**
 * Formats an ISO date string to a readable date (long month, e.g. "10 August 2026")
 */
export const fmtDateLong = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

/**
 * Formats an ISO date string to a 12-hour time (e.g. "06:34 PM")
 */
export const fmtTime = (iso) =>
  iso
    ? new Date(iso).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "-";
