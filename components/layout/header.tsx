"use client";

import { Locale, NAV_ROUTES } from "@/lib/constants";
import { useAnimations } from "@/providers/animation-provider";
import { CommonTranslations } from "@/types";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore, useState } from "react";
import MobileNav from "./mobile-nav";
import { cn } from "@/utils/cn";
import ThemeToggle from "./theme-toggle";
import AnimationToggle from "./animation-toggle";
import LanguageSwitcher from "./language-switcher";
import Link from "next/link";
import { motion } from "motion/react";
import { localePath } from "@/i18n/config";

interface HeaderProps {
  locale: Locale;
  translations: CommonTranslations;
}
const Header = ({ locale, translations }: HeaderProps) => {
  const pathname = usePathname();
  const { animationsEnabled } = useAnimations();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Track scroll position for header background via useSyncExternalStore
  const subscribeScroll = useCallback((callback: () => void) => {
    globalThis.window.addEventListener("scroll", callback, { passive: true });
    return () => globalThis.window.removeEventListener("scroll", callback);
  }, []);
  const getScrollSnapshot = useCallback(
    () => globalThis.window.scrollY > 20,
    [],
  );
  const getServerSnapshot = useCallback(() => false, []);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerSnapshot,
  );

  // Close mobile nav on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => setMobileNavOpen(false);
    globalThis.window.addEventListener("popstate", handlePopState);
    return () =>
      globalThis.window.removeEventListener("popstate", handlePopState);
  }, []);

  const { nav, accessibility, animation: animationLabels } = translations;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-(--z-sticky)",
          "h-(--header-height)",
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "header-blur border-b border-(--color-border)"
            : "bg-transparent border-b border-transparent",
        )}
        role="banner"
      >
        <div className="container-wide h-full flex items-center justify-between">
          {/* ── Logo / Home Link ── */}
          <Link
            href={localePath("/", locale)}
            className={cn(
              "font-display font-bold text-xl tracking-tight",
              "text-(--color-foreground)",
              "hover:text-(--color-primary) interactive",
            )}
            aria-label={`${translations.nav.home} — Meiirzhan`}
          >
            <span className="text-(--color-primary)">M</span>
            <span className="hidden xs:inline">eiirzhan</span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_ROUTES.map((route) => {
              const href = localePath(route.href, locale);
              const isActive =
                pathname === href ||
                (route.href !== "/" && pathname.startsWith(href));

              return (
                <Link
                  key={route.key}
                  href={href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg interactive",
                    isActive
                      ? "text-(--color-primary)"
                      : "text-(--color-foreground-muted) hover:text-(--color-foreground)",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {nav[route.key]}

                  {/* Active indicator — animated underline */}
                  {isActive &&
                    (animationsEnabled ? (
                      <motion.span
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-(--color-primary) rounded-full"
                        layoutId="nav-active-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-(--color-primary) rounded-full" />
                    ))}
                </Link>
              );
            })}
          </nav>

          {/* ── Controls (theme, lang, animation, hamburger) ── */}
          <div className="flex items-center gap-1">
            {/* Animation toggle */}
            <AnimationToggle
              enableLabel={animationLabels.enable}
              disableLabel={animationLabels.disable}
              ariaLabel={accessibility.toggleAnimation}
              className="hidden sm:flex"
            />

            {/* Theme toggle */}
            <ThemeToggle ariaLabel={accessibility.toggleTheme} />

            {/* Language switcher */}
            <LanguageSwitcher
              locale={locale}
              ariaLabel={accessibility.toggleLanguage}
            />

            {/* Mobile hamburger — visible below lg */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className={cn(
                "lg:hidden size-9 rounded-full flex items-center justify-center",
                "text-(--color-foreground-muted)",
                "hover:text-(--color-foreground)",
                "hover:bg-(--color-secondary) interactive",
              )}
              aria-label={accessibility.openMenu}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
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
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        locale={locale}
        navLabels={nav}
        closeLabel={accessibility.closeMenu}
        currentPath={pathname}
      />
    </>
  );
};

export default Header;
