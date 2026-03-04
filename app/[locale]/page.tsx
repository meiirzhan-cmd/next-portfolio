import type { Metadata } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getHomeDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const data = await getHomeDictionary(locale);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: { en: `${SITE_CONFIG.url}/en`, ru: `${SITE_CONFIG.url}/ru` },
    },
  };
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Readonly<HomePageProps>) {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const data = await getHomeDictionary(locale);

  return (
    <>
      {/* Hero — placeholder, will be replaced with GSAP hero section */}
      <section className="hero-height section-padding-lg">
        <div className="container-wide">
          <p className="text-sm font-medium tracking-wider uppercase text-(--color-primary) mb-4">
            {data.hero.greeting}
          </p>
          <h1 className="font-display text-hero font-bold leading-none tracking-tighter mb-6">
            {data.hero.name}
          </h1>
          <p className="text-2xl sm:text-3xl font-display font-semibold text-(--color-foreground-muted) mb-6">
            {data.hero.tagline}
          </p>
          <p className="text-lg text-(--color-foreground-muted) max-w-2xl mb-10">
            {data.hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/${locale}${data.hero.ctaPrimary.href}`}
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary-hover) interactive"
            >
              {data.hero.ctaPrimary.label}
            </a>
            <a
              href={`/${locale}${data.hero.ctaSecondary.href}`}
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium border border-(--color-border) text-(--color-foreground) hover:bg-(--color-secondary) interactive"
            >
              {data.hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </section>

      {/* Featured work — placeholder */}
      <section className="section-padding border-t border-(--color-border)">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-bold mb-3">
            {data.featuredSection.heading}
          </h2>
          <p className="text-(--color-foreground-muted) mb-12">
            {data.featuredSection.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will go here */}
            <div className="card-base p-6 h-48 flex items-center justify-center text-(--color-foreground-subtle)">
              Project Card Placeholder
            </div>
            <div className="card-base p-6 h-48 flex items-center justify-center text-(--color-foreground-subtle)">
              Project Card Placeholder
            </div>
            <div className="card-base p-6 h-48 flex items-center justify-center text-(--color-foreground-subtle)">
              Project Card Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* About preview — placeholder */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {data.aboutPreview.heading}
          </h2>
          <p className="text-lg text-(--color-foreground-muted) mb-8">
            {data.aboutPreview.text}
          </p>
          <a
            href={`/${locale}/about`}
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium border border-(--color-border) text-(--color-foreground) hover:bg-(--color-secondary) interactive"
          >
            {data.aboutPreview.ctaLabel}
          </a>
        </div>
      </section>

      {/* Contact CTA — placeholder */}
      <section className="section-padding bg-(--color-background-alt)">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {data.contactCta.heading}
          </h2>
          <p className="text-lg text-(--color-foreground-muted) mb-8">
            {data.contactCta.text}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary-hover) interactive"
          >
            {data.contactCta.ctaLabel}
          </a>
        </div>
      </section>
    </>
  );
}
