/**
 * Formats a duration in seconds into a human-readable string.
 * Examples: "2h 34m", "3 days 12h", "45m 30s", "15s"
 *
 * @param seconds - Duration in seconds
 * @returns Human-readable time string
 */
export function formatTransferTime(seconds: number): string {
  if (seconds < 0) {
    return '0s';
  }

  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0 && days === 0) {
    // Only show minutes if we're not showing days (to avoid clutter)
    parts.push(`${minutes}m`);
  }

  if (secs > 0 && days === 0 && hours === 0) {
    // Only show seconds if we're not showing days or hours
    parts.push(`${secs}s`);
  }

  return parts.join(' ') || '0s';
}
