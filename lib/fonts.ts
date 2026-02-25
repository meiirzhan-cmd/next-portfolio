import { Outfit, Source_Sans_3 } from "next/font/google";

/**
 * Display font — headings and hero text.
 * Outfit: geometric, modern, distinctive.
 */
export const fontDisplay = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-family-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/**
 * Body font — paragraphs, UI text, navigation.
 * Source Sans 3: readable, professional, Cyrillic support.
 */
export const fontBody = Source_Sans_3({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-family-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Combined CSS variable class string for <body> */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
