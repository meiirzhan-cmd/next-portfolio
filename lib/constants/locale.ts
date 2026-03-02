/** Supported locales — must match folder names in src/data/ */
export const LOCALES = ["en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

/** Default locale used for fallback and root redirect */
export const DEFAULT_LOCALE: Locale = "en";

/** Locale display labels (shown in language switcher dropdown if expanded) */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
} as const;

/** HTML lang attribute values */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  ru: "ru",
} as const;

/** OpenGraph locale format */
export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
} as const;
