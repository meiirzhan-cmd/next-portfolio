import type { Metadata } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { parseLocale } from "@/i18n/config";
import { getBlogDictionary } from "@/i18n/get-dictionary";
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
  const data = await getBlogDictionary(locale);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/blog`,
      languages: { en: `${SITE_CONFIG.url}/en/blog`, ru: `${SITE_CONFIG.url}/ru/blog` },
    },
  };
}

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: Readonly<BlogPageProps>) {
  const { locale: rawLocale } = await params;
  const locale = parseLocale(rawLocale);
  const data = await getBlogDictionary(locale);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

      {/* Featured posts */}
      {data.posts.some((p) => p.featured) && (
        <section data-gsap="section" className="section-padding border-b border-(--color-border)">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.posts
                .filter((p) => p.featured)
                .map((post, i) => (
                  <ScrollReveal key={post.slug} variant={i % 2 === 0 ? "fade-right" : "fade-left"} delay={i * 0.1}>
                    <article className="blog-card blog-card--featured group">
                      <div className="blog-card-image blog-card-image--lg">
                        <div className="project-card-placeholder">
                          <span className="text-5xl opacity-30">{post.title.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <time className="text-sm text-(--color-foreground-subtle)">{formatDate(post.publishedAt)}</time>
                          <span className="text-sm text-(--color-foreground-subtle)">·</span>
                          <span className="text-sm text-(--color-foreground-subtle)">
                            {post.readingTime} {locale === "ru" ? "мин" : "min read"}
                          </span>
                        </div>
                        <h2 className="font-display text-2xl font-semibold mb-2 group-hover:text-(--color-primary) transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-(--color-foreground-muted) mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span key={tag} className="tag text-xs">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section data-gsap="section" className="section-padding">
        <div className="container-wide">
          <ScrollReveal variant="stagger-children" stagger={0.1} className="space-y-6">
            {data.posts
              .filter((p) => !p.featured)
              .map((post) => (
                <article key={post.slug} className="blog-card blog-card--row group">
                  <div className="flex flex-col sm:flex-row gap-6 p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <time className="text-sm text-(--color-foreground-subtle)">{formatDate(post.publishedAt)}</time>
                        <span className="text-sm text-(--color-foreground-subtle)">·</span>
                        <span className="text-sm text-(--color-foreground-subtle)">
                          {post.readingTime} {locale === "ru" ? "мин" : "min read"}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-(--color-primary) transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-(--color-foreground-muted) line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-wrap sm:flex-col gap-1.5 sm:items-end">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
