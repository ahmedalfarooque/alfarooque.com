import type { Locale } from "@/types/content";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}

export function directionFor(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function oppositeLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}
