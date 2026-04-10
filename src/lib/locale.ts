import type { Locale } from "@/types/content";

export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "pt";
export const SUPPORTED_LOCALES: Locale[] = ["pt", "en"];

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "pt" || value === "en";
}

export function detectLocaleFromHeader(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes("pt")) return "pt";
  if (normalized.includes("en")) return "en";

  return DEFAULT_LOCALE;
}

export function detectLocaleFromNavigator(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const lang = navigator.language.toLowerCase();

  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("en")) return "en";

  return DEFAULT_LOCALE;
}
