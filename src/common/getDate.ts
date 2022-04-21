export function getDate(date: string) {
  const newDate = new Date(Date.parse(date));
  const [daysName, month, day, year] = newDate.toDateString().split(' ');
  return `${daysName}, ${day} ${month} ${year}`;
}
