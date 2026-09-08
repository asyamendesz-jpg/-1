import { el } from "@/locales/el";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";
import type { Locale, SiteCopy } from "@/lib/i18n/types";

export const dictionaries: Record<Locale, SiteCopy> = {
  ru,
  en,
  el,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "en" || value === "el";
}
