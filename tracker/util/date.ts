export function getFormattedDate(date: Date): string {
  const newDate = new Date(date);

  return newDate.toISOString().slice(0, 10);
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
