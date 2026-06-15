import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  if (!date) return "Unknown date";
  const formattedDate = format(parseISO(date), "d MMMM, yyyy");

  return formattedDate;
};
