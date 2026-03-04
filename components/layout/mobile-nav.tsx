"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useAnimations } from "@/providers/animation-provider";
import { NAV_ROUTES } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import { localePath } from "@/i18n/config";
import { cn } from "@/utils/cn";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  navLabels: Record<string, string>;
  closeLabel: string;
  currentPath: string;
}

const MobileNav = ({
  isOpen,
  onClose,
  locale,
  navLabels,
  closeLabel,
  currentPath,
}: Readonly<MobileNavProps>) => {
  const { animationsEnabled } = useAnimations();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const overlayVariants = animationsEnabled
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : undefined;

  const drawerVariants = animationsEnabled
    ? ({
        initial: { x: "100%" },
        animate: {
          x: 0,
          transition: { type: "spring", damping: 30, stiffness: 300 },
        },
        exit: { x: "100%", transition: { duration: 0.2 } },
      } as const)
    : undefined;

  const itemVariants = animationsEnabled
    ? {
        closed: { opacity: 0, x: 20 },
        open: (i: number) => ({
          opacity: 1,
          x: 0,
          transition: { delay: 0.1 + i * 0.05 },
        }),
      }
    : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-(--z-overlay) bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
            {...overlayVariants}
          />

          {/* Drawer */}
          <motion.nav
            className={cn(
              "fixed top-0 right-0 bottom-0 z-(--z-modal) w-[min(80vw,20rem)]",
              "bg-(--color-background) border-l border-(--color-border)",
              "flex flex-col p-6 lg:hidden",
              "shadow-xl",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            {...drawerVariants}
          >
            {/* Close button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className={cn(
                  "size-9 rounded-full flex items-center justify-center",
                  "text-(--color-foreground-muted)",
                  "hover:text-(--color-foreground)",
                  "hover:bg-(--color-secondary) interactive",
                )}
                aria-label={closeLabel}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col gap-1">
              {NAV_ROUTES.map((route, i) => {
                const href = localePath(route.href, locale);
                const isActive =
                  currentPath === href ||
                  (route.href !== "/" && currentPath.startsWith(href));

                return (
                  <motion.li
                    key={route.key}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-lg font-medium interactive",
                        isActive
                          ? "text-(--color-primary) bg-(--color-primary)/8"
                          : "text-(--color-foreground-muted) hover:text-(--color-foreground) hover:bg-(--color-secondary)",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {navLabels[route.key]}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
