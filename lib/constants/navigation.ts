export const NAV_ROUTES = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export type NavRouteKey = (typeof NAV_ROUTES)[number]["key"];
