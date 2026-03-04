"use client";

import { useAnimations } from "@/providers/animation-provider";
import { cn } from "@/utils/cn";

interface AnimationToggleProps {
  enableLabel: string;
  disableLabel: string;
  ariaLabel: string;
  className?: string;
}

const AnimationToggle = ({
  enableLabel,
  disableLabel,
  ariaLabel,
  className,
}: Readonly<AnimationToggleProps>) => {
  const { animationsEnabled, toggleAnimations } = useAnimations();

  return (
    <button
      onClick={toggleAnimations}
      className={cn(
        "relative size-9 rounded-full flex items-center justify-center",
        "text-(--color-foreground-muted)",
        "hover:text-(--color-foreground)",
        "hover:bg-(--color-secondary) interactive",
        className,
      )}
      aria-label={ariaLabel}
      aria-pressed={animationsEnabled}
      title={animationsEnabled ? disableLabel : enableLabel}
      type="button"
    >
      {/* Sparkle icon when enabled */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("size-5", !animationsEnabled && "opacity-40")}
        aria-hidden="true"
      >
        {animationsEnabled ? (
          <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
        ) : (
          <>
            {/* Pause / static icon when disabled */}
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </>
        )}
      </svg>
    </button>
  );
};

export default AnimationToggle;
