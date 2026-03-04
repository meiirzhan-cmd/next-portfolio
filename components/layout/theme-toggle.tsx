"use client";

import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";
import { useCallback, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

interface ThemeToggleProps {
  ariaLabel: string;
  className?: string;
}

const ThemeToggle = ({ ariaLabel, className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const getSnapshot = useCallback(() => true, []);
  const getServerSnapshot = useCallback(() => false, []);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch — render placeholder until mounted
  if (!mounted) {
    return (
      <button
        className={cn(
          "relative size-9 rounded-full flex items-center justify-center",
          "text-(--color-foreground-muted)",
          "hover:bg-(--color-secondary) interactive",
          className,
        )}
        aria-label={ariaLabel}
        disabled
      >
        <span className="size-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative size-9 rounded-full flex items-center justify-center",
        "text-(--color-foreground-muted)",
        "hover:text-(--color-foreground)",
        "hover:bg-(--color-secondary) interactive",
        className,
      )}
      aria-label={ariaLabel}
      type="button"
    >
      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "size-5 transition-transform duration-300",
          isDark ? "scale-0 rotate-90" : "scale-100 rotate-0",
        )}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute size-5 transition-transform duration-300",
          isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90",
        )}
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
