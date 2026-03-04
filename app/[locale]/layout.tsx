import type { ReactNode } from "react";
import type { Metadata } from "next";
import { LOCALES, SITE_CONFIG, type Locale } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getCommonDictionary } from "@/i18n/get-dictionary";
import SkipLink from "@/components/layout/skip-link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LayoutTransition from "@/components/layout/layout-transition";

/** Generate static params for both locales at build time */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** Dynamic metadata per locale */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);

  return {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description[locale],
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        en: `${SITE_CONFIG.url}/en`,
        ru: `${SITE_CONFIG.url}/ru`,
      },
    },
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const translations = await getCommonDictionary(locale);

  return (
    <>
      {/* Set lang attribute on the closest parent.
          Since <html> is in root layout, we use a script to patch it. */}
      <LangSetter locale={locale} />

      {/* Skip to content — first focusable element */}
      <SkipLink label={translations.accessibility.skipToContent} />

      {/* Layout entry animation (fade + slide) */}
      <LayoutTransition
        header={<Header locale={locale} translations={translations} />}
        main={
          <main
            id="main-content"
            className="min-h-[calc(100dvh-var(--header-height))] pt-(--header-height)"
            tabIndex={-1}
          >
            {children}
          </main>
        }
        footer={<Footer translations={translations} />}
      />
    </>
  );
}

/**
 * Client component to set <html lang="..."> and dir attribute.
 * This is necessary because root layout renders <html> without locale knowledge.
 */
function LangSetter({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang="${locale}";document.documentElement.dir="ltr";`,
      }}
    />
  );
}
