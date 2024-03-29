import dayjs from "dayjs";

export function formatDate(date: string): string {
  const isValidDate = dayjs(date).isValid();
  if (isValidDate) {
    const dateFormated = dayjs(date).format("MMMM D, YYYY");

    return dateFormated;
  }
  return "No date";
}
