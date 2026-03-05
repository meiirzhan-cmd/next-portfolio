import type { Metadata } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getHomeDictionary } from "@/i18n/get-dictionary";
import HeroImage from "@/components/hero/hero-image";

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
      {/* Hero */}
      <section className="hero-height section-padding-lg relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="hero-bg-blob hero-bg-blob--1" />
        <div className="hero-bg-blob hero-bg-blob--2" />

        {/* Floating bubbles */}
        <div className="hero-bubbles">
          <div className="hero-bubble" />
          <div className="hero-bubble" />
          <div className="hero-bubble" />
          <div className="hero-bubble" />
          <div className="hero-bubble" />
          <div className="hero-bubble" />
          <div className="hero-bubble" />
          <div className="hero-bubble" />
        </div>

        <div className="container-wide relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 order-2 lg:order-1">
            <p
              data-gsap="hero-greeting"
              className="text-sm font-medium tracking-wider uppercase text-(--color-primary) mb-4"
            >
              {data.hero.greeting}
            </p>
            <h1
              data-gsap="hero-name"
              className="font-display text-hero font-bold leading-none tracking-tighter mb-6"
            >
              {data.hero.name}
            </h1>
            <p
              data-gsap="hero-tagline"
              className="text-2xl sm:text-3xl font-display font-semibold text-(--color-foreground-muted) mb-6"
            >
              {data.hero.tagline}
            </p>
            <p
              data-gsap="hero-description"
              className="text-lg text-(--color-foreground-muted) max-w-2xl mb-10"
            >
              {data.hero.description}
            </p>
            <div data-gsap="hero-cta" className="flex flex-wrap gap-4">
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

          {/* Profile image */}
          <div className="flex-shrink-0 order-1 lg:order-2" data-gsap="hero-image">
            <HeroImage
              src="/images/rectangle.jpeg"
              alt={data.hero.name}
              size={280}
              hireLabel={data.hero.hireLabel}
            />
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section data-gsap="section" className="section-padding border-t border-(--color-border)">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-bold mb-3">
            {data.featuredSection.heading}
          </h2>
          <p className="text-(--color-foreground-muted) mb-12">
            {data.featuredSection.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* About preview */}
      <section data-gsap="section" className="section-padding">
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

      {/* Contact CTA */}
      <section data-gsap="section" className="section-padding bg-(--color-background-alt)">
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
