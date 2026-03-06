import type { Locale } from "@/lib/constants";
import {
  BlogPageData,
  CommonTranslations,
  ContactPageData,
  HomePageData,
  ProfileData,
  ProjectsPageData,
} from "@/types";

/**
 * Загрузка общих переводов (nav, footer, theme labels, a11y strings).
 * Используется в layout для header/footer.
 */
export async function getCommonDictionary(
  locale: Locale,
): Promise<CommonTranslations> {
  const dict = await import(`@/data/${locale}/common.json`);
  return dict.default;
}

/** Загрузка данных главной страницы */
export async function getHomeDictionary(locale: Locale): Promise<HomePageData> {
  const dict = await import(`@/data/${locale}/home.json`);
  return dict.default;
}

/** Загрузка данных страницы "Обо мне" */
export async function getAboutDictionary(locale: Locale): Promise<ProfileData> {
  const dict = await import(`@/data/${locale}/about.json`);
  return dict.default;
}

/** Загрузка данных страницы проектов */
export async function getProjectsDictionary(
  locale: Locale,
): Promise<ProjectsPageData> {
  const dict = await import(`@/data/${locale}/projects.json`);
  return dict.default;
}

/** Загрузка данных страницы блога */
export async function getBlogDictionary(locale: Locale): Promise<BlogPageData> {
  const dict = await import(`@/data/${locale}/blog.json`);
  return dict.default;
}

/** Загрузка данных страницы контактов */
export async function getContactDictionary(
  locale: Locale,
): Promise<ContactPageData> {
  const dict = await import(`@/data/${locale}/contact.json`);
  return dict.default;
}
