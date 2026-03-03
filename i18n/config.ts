import { DEFAULT_LOCALE, Locale, LOCALES } from "@/lib/constants";

/** Type guard — is the string a valid locale? */
export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Safely parse locale from route param, fallback to default */
export function parseLocale(value: string | undefined): Locale {
  if (value && isValidLocale(value)) return value;
  return DEFAULT_LOCALE;
}

/** Get the alternate locale (for language switcher) */
export function getAlternateLocale(current: Locale): Locale {
  return current === "en" ? "ru" : "en";
}

/** Build a localized path */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
