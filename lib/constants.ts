export const SITE_CONFIG = {
  /** Site name — used in <title> template */
  name: "Meiirzhan — Full Stack Developer",

  /** Short name — used in manifests / bookmarks */
  shortName: "Meiirzhan",

  /** Localized descriptions */
  description: {
    en: "Full Stack Developer specializing in modern technology, Next.js, React, and TypeScript.",
    ru: "Full Stack разработчик, специализирующийся на современных технологиях, Next.js, React и TypeScript.",
  },

  /** Canonical URL — no trailing slash */
  url: "https://meiirzhancv.it.com",

  /** Default OG image path (relative to public/) */
  ogImage: "/images/common/og-image.jpg",

  /** Author name */
  author: "Meiirzhan",

  /** Contact email */
  email: "rikimarubro@gmail.com",

  /** Year the site was first published (for copyright) */
  startYear: 2026,
} as const;
export const STORAGE_KEYS = {
  animations: "portfolio-animations-enabled",
  theme: "portfolio-theme",
  locale: "portfolio-locale",
  cookieConsent: "portfolio-cookie-consent",
} as const;
