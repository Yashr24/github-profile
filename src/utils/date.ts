/**
 * Converts an ISO date string to a human-readable relative label.
 * e.g. "2020-11-24T18:29:12Z" → "Updated 4 years ago"
 */
export function formatRelativeDate(isoDate: string): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (years > 0)   return `Updated ${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0)  return `Updated ${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0)    return `Updated ${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0)   return `Updated ${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Updated just now";
}
