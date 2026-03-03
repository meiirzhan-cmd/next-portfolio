"use client";

import { Locale, NAV_ROUTES } from "@/lib/constants";
import { useAnimations } from "@/providers/animation-provider";
import { CommonTranslations } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  return <div>Header</div>;
};

export default Header;
