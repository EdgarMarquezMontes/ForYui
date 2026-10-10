export function formatCountdown(target: Date, now: Date) {
  const seconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${days}d · ${String(hours).padStart(2, "0")}h · ${String(minutes).padStart(2, "0")}m`;
}
