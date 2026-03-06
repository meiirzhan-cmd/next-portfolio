import type { Metadata } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getProjectsDictionary } from "@/i18n/get-dictionary";
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
  const data = await getProjectsDictionary(locale);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/projects`,
      languages: { en: `${SITE_CONFIG.url}/en/projects`, ru: `${SITE_CONFIG.url}/ru/projects` },
    },
  };
}

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: Readonly<ProjectsPageProps>) {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const data = await getProjectsDictionary(locale);

  return (
    <>
      {/* Header */}
      <section data-gsap="section" className="section-padding-lg border-b border-(--color-border)">
        <div className="container-wide text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {data.heading}
            </h1>
            <p className="text-lg text-(--color-foreground-muted) max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects grid */}
      <section data-gsap="section" className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, i) => (
              <ScrollReveal key={project.slug} variant="fade-up" delay={i * 0.1}>
                <div className="project-card group">
                  <div className="project-card-image">
                    <div className="project-card-placeholder">
                      <span className="text-4xl opacity-30">{project.title.charAt(0)}</span>
                    </div>
                    {project.featured && (
                      <span className="project-badge">
                        {locale === "ru" ? "Избранное" : "Featured"}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-(--color-secondary) text-(--color-foreground-muted)">
                        {project.category}
                      </span>
                      <span className="text-xs text-(--color-foreground-subtle)">{project.year}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-(--color-primary) transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-(--color-foreground-muted) mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
