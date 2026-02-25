"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AnimationContextValue {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const AnimationContext = createContext<AnimationContextValue>({
  animationsEnabled: true,
  toggleAnimations: () => {},
  setAnimationsEnabled: () => {},
});

export function useAnimations(): AnimationContextValue {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimations must be used within AnimationProvider");
  }
  return context;
}

interface AnimationProviderProps {
  children: ReactNode;
}

function getInitialAnimationsEnabled(): boolean {
  if (globalThis.window === undefined) return true;

  const saved = localStorage.getItem(STORAGE_KEYS.animations);
  if (saved !== null) return saved === "true";

  return !globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimationProvider({
  children,
}: Readonly<AnimationProviderProps>) {
  const [isAnimated, setIsAnimated] = useState(getInitialAnimationsEnabled);
  // Subscribe to prefers-reduced-motion changes (only when no manual preference)
  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const handler = (e: MediaQueryListEvent) => {
      const manualPref = localStorage.getItem(STORAGE_KEYS.animations);
      if (manualPref === null) {
        setIsAnimated(!e.matches);
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Sync data attribute on <html>
  useEffect(() => {
    document.documentElement.dataset.animations = isAnimated
      ? "enabled"
      : "disabled";
  }, [isAnimated]);

  const setAnimationsEnabled = useCallback((enabled: boolean) => {
    setIsAnimated(enabled);
    localStorage.setItem(STORAGE_KEYS.animations, String(enabled));
  }, []);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(!isAnimated);
  }, [isAnimated, setAnimationsEnabled]);

  const value = useMemo<AnimationContextValue>(
    () => ({
      animationsEnabled: isAnimated,
      toggleAnimations,
      setAnimationsEnabled,
    }),
    [isAnimated, toggleAnimations, setAnimationsEnabled],
  );

  return <AnimationContext value={value}>{children}</AnimationContext>;
}
