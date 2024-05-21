export function formatToWon(price: number) {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string) {
  const time = new Date(date).getTime();
  const now = Date.now();
  const dayDiff = Math.round((time - now) / 86400000);
  const formatter = new Intl.RelativeTimeFormat("ko");
  if (dayDiff !== 0) return formatter.format(dayDiff, "day");

  const hourDiff = Math.round((time - now) / 3600000);
  if (hourDiff !== 0) return formatter.format(hourDiff, "hour");

  const minDiff = Math.round((time - now) / 60000);
  if (minDiff !== 0) return formatter.format(minDiff, "minute");

  const secDiff = Math.round((time - now) / 1000);
  return formatter.format(secDiff, "second");
}
