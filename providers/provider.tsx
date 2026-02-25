"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AnimationProvider } from "./animation-provider";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Composes all client-side providers into one wrapper.
 * Used once in the root layout to avoid nesting in server components.
 */
export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <ThemeProvider>
      <AnimationProvider>{children}</AnimationProvider>
    </ThemeProvider>
  );
}
