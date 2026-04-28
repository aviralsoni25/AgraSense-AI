import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatDate(input: string | number | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(input));
}

export function getSeverityColor(severity: "low" | "medium" | "high") {
  if (severity === "high") return "text-rose-600";
  if (severity === "medium") return "text-amber-600";
  return "text-emerald-600";
}

export function toPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function slugify(input: string) {
  return input.toLowerCase().replace(/\s+/g, "-");
}
