import type { Metadata } from "next";
import Image from "next/image";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getAboutDictionary } from "@/i18n/get-dictionary";
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
  const data = await getAboutDictionary(locale);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/about`,
      languages: { en: `${SITE_CONFIG.url}/en/about`, ru: `${SITE_CONFIG.url}/ru/about` },
    },
  };
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Readonly<AboutPageProps>) {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const data = await getAboutDictionary(locale);

  return (
    <>
      {/* Header section */}
      <section data-gsap="section" className="section-padding-lg border-b border-(--color-border)">
        <div className="container-wide flex flex-col lg:flex-row items-center gap-12">
          <ScrollReveal variant="scale" className="flex-shrink-0">
            <div className="about-avatar-wrapper">
              <Image
                src={data.avatar}
                alt={data.name}
                width={240}
                height={240}
                className="about-avatar"
                priority
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={0.15} className="flex-1">
            <p className="text-sm font-medium tracking-wider uppercase text-(--color-primary) mb-2">
              {data.title}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {data.name}
            </h1>
            <p className="text-lg text-(--color-foreground-muted) mb-4">
              {data.location}
            </p>
            <div className="flex flex-wrap gap-3">
              {data.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-(--color-border) text-(--color-foreground) hover:bg-(--color-secondary) interactive"
                >
                  {social.label}
                </a>
              ))}
              {data.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary-hover) interactive"
                >
                  Resume
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bio */}
      <section data-gsap="section" className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            {data.bio.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-lg text-(--color-foreground-muted) mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Skills */}
      <section data-gsap="section" className="section-padding bg-(--color-background-alt)">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold mb-8 text-center">
              {locale === "ru" ? "Навыки" : "Skills"}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="stagger-children" stagger={0.06} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.name} className="skill-card">
                <span className="font-medium">{skill.name}</span>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{ width: `${skill.level * 20}%` }} />
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Experience */}
      <section data-gsap="section" className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold mb-10 text-center">
              {locale === "ru" ? "Опыт работы" : "Experience"}
            </h2>
          </ScrollReveal>
          <div className="experience-timeline">
            {data.experience.map((exp, i) => (
              <ScrollReveal key={i} variant={i % 2 === 0 ? "fade-right" : "fade-left"} delay={i * 0.1}>
                <div className="experience-card">
                  <div className="experience-dot" />
                  <div className="card-base p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
                      <span className="text-sm text-(--color-foreground-subtle)">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-(--color-primary) font-medium mb-3">{exp.company}</p>
                    <p className="text-(--color-foreground-muted) mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section data-gsap="section" className="section-padding bg-(--color-background-alt)">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold mb-10 text-center">
              {locale === "ru" ? "Образование" : "Education"}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="stagger-children" className="max-w-2xl mx-auto space-y-6">
            {data.education.map((edu, i) => (
              <div key={i} className="card-base p-6">
                <h3 className="font-display text-lg font-semibold">{edu.degree} — {edu.field}</h3>
                <p className="text-(--color-primary) font-medium">{edu.institution}</p>
                <p className="text-sm text-(--color-foreground-subtle) mt-1">
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
