import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Providers } from "@/providers/provider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a20" },
  ],
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root layout — sets up HTML shell, fonts, and providers.
 * The <html> lang is set by the [locale] layout below this.
 * suppressHydrationWarning is required by next-themes to avoid
 * the mismatch warning when it injects the `class` attribute.
 */
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
