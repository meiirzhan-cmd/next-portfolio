import { Locale, NavRouteKey, SocialPlatform } from "@/lib/constants";

export interface CommonTranslations {
  nav: Record<NavRouteKey, string> & Record<string, string>;
  footer: {
    copyright: string;
    builtWith: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  animation: {
    enable: string;
    disable: string;
    label: string;
  };
  language: Record<Locale, string> & {
    label: string;
  };
  accessibility: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    toggleLanguage: string;
    toggleAnimation: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface ContactFormLabels {
  name: string;
  email: string;
  subject?: string;
  message: string;
  submit: string;
  sending?: string;
  success: string;
  error: string;
}

export interface ContactPageData {
  seo: PageSeo;
  heading: string;
  subtitle: string;
  email: string;
  socials: SocialLink[];
  formLabels: ContactFormLabels;
  /** Optional availability status */
  availability?: {
    status: "available" | "busy" | "unavailable";
    message: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  featured: boolean;
  year: number;
  thumbnail: ImageData;
  images: ImageData[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  techStack: string[];
}

export interface ProjectsPageData {
  seo: PageSeo;
  heading: string;
  subtitle: string;
  categories: string[];
  projects: Project[];
}

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  ctaPrimary: CtaButton;
  ctaSecondary: CtaButton;
}

export interface HomePageData {
  seo: PageSeo;
  hero: HeroData;
  featuredSection: {
    heading: string;
    subtitle: string;
  };
  aboutPreview: {
    heading: string;
    text: string;
    ctaLabel: string;
  };
  contactCta: {
    heading: string;
    text: string;
    ctaLabel: string;
  };
}

export interface CommonTranslations {
  nav: Record<NavRouteKey, string> & Record<string, string>;
  footer: {
    copyright: string;
    builtWith: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  animation: {
    enable: string;
    disable: string;
    label: string;
  };
  language: Record<Locale, string> & {
    label: string;
  };
  accessibility: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    toggleLanguage: string;
    toggleAnimation: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "tools"
  | "other";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Proficiency level 1–5 */
  level: number;
  /** Optional icon identifier (mapped to component in UI) */
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  /** Format: YYYY-MM */
  startDate: string;
  /** Format: YYYY-MM or "present" */
  endDate: string;
  description: string;
  /** List of key technologies / highlights */
  technologies: string[];
  /** Optional company URL */
  companyUrl?: string;
  /** Optional company logo path */
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  /** Optional institution URL */
  institutionUrl?: string;
}

export interface ProfileData {
  seo: PageSeo;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  avatar: string;
  location: string;
  resumeUrl?: string;
  socials: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Full content — markdown or HTML string */
  content: string;
  /** ISO 8601 date string */
  publishedAt: string;
  /** ISO 8601 date string (optional) */
  updatedAt?: string;
  /** Estimated reading time in minutes */
  readingTime: number;
  tags: string[];
  thumbnail: ImageData;
  featured: boolean;
  /** Optional author override (defaults to site author) */
  author?: string;
}

export interface BlogPageData {
  seo: PageSeo;
  heading: string;
  subtitle: string;
  posts: BlogPost[];
}
