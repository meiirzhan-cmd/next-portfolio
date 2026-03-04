"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import { getAlternateLocale } from "@/i18n/config";
import { cn } from "@/utils/cn";

interface LanguageSwitcherProps {
  locale: Locale;
  ariaLabel: string;
  className?: string;
}

const LanguageSwitcher = ({
  locale,
  ariaLabel,
  className,
}: Readonly<LanguageSwitcherProps>) => {
  const pathname = usePathname();
  const altLocale = getAlternateLocale(locale);

  // Replace current locale prefix with the alternate one
  const altPath = pathname.replace(`/${locale}`, `/${altLocale}`);

  return (
    <Link
      href={altPath}
      className={cn(
        "relative size-9 rounded-full flex items-center justify-center",
        "text-xs font-semibold uppercase tracking-wider",
        "text-(--color-foreground-muted)",
        "hover:text-(--color-foreground)",
        "hover:bg-(--color-secondary) interactive",
        className,
      )}
      aria-label={ariaLabel}
      hrefLang={altLocale}
    >
      {altLocale}
    </Link>
  );
};

export default LanguageSwitcher;
