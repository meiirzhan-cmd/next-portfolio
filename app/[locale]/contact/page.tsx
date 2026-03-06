import type { Metadata } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getContactDictionary } from "@/i18n/get-dictionary";
import ScrollReveal from "@/components/animations/scroll-reveal";

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
  const data = await getContactDictionary(locale);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/contact`,
      languages: { en: `${SITE_CONFIG.url}/en/contact`, ru: `${SITE_CONFIG.url}/ru/contact` },
    },
  };
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: Readonly<ContactPageProps>) {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const data = await getContactDictionary(locale);

  return (
    <>
      {/* Header */}
      <section data-gsap="section" className="section-padding-lg border-b border-(--color-border)">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {data.heading}
            </h1>
            <p className="text-lg text-(--color-foreground-muted) max-w-xl mx-auto">
              {data.subtitle}
            </p>
          </ScrollReveal>

          {data.availability && (
            <ScrollReveal delay={0.2}>
              <div className="contact-availability mt-8">
                <span className={`contact-status-dot contact-status-dot--${data.availability.status}`} />
                <span className="text-sm font-medium">{data.availability.message}</span>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Contact form + info */}
      <section data-gsap="section" className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <ScrollReveal variant="fade-right">
            <form className="contact-form space-y-6">
              <div>
                <label htmlFor="contact-name" className="contact-label">{data.formLabels.name}</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  className="contact-input"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="contact-label">{data.formLabels.email}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  className="contact-input"
                />
              </div>
              {data.formLabels.subject && (
                <div>
                  <label htmlFor="contact-subject" className="contact-label">{data.formLabels.subject}</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    className="contact-input"
                  />
                </div>
              )}
              <div>
                <label htmlFor="contact-message" className="contact-label">{data.formLabels.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  className="contact-input contact-textarea"
                />
              </div>
              <button type="submit" className="contact-submit">
                {data.formLabels.submit}
              </button>
            </form>
          </ScrollReveal>

          {/* Info sidebar */}
          <ScrollReveal variant="fade-left" delay={0.15}>
            <div className="space-y-8">
              {/* Email */}
              <div className="contact-info-block">
                <h3 className="font-display text-lg font-semibold mb-2">
                  {locale === "ru" ? "Эл. почта" : "Email"}
                </h3>
                <a
                  href={`mailto:${data.email}`}
                  className="text-(--color-primary) hover:underline text-lg"
                >
                  {data.email}
                </a>
              </div>

              {/* Socials */}
              <div className="contact-info-block">
                <h3 className="font-display text-lg font-semibold mb-4">
                  {locale === "ru" ? "Соцсети" : "Socials"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative element */}
              <div className="contact-decoration">
                <div className="contact-decoration-line" />
                <p className="text-sm text-(--color-foreground-subtle) italic mt-4">
                  {locale === "ru"
                    ? "Обычно отвечаю в течение 24 часов"
                    : "I typically respond within 24 hours"}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
