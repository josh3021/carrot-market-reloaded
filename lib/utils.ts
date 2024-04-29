export function formatToWon(price: number) {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string) {
  const time = new Date(date).getTime();
  const now = Date.now();
  const diff = Math.round((time - now) / 86400000);

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "day");
}
