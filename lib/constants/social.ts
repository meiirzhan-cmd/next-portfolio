export const SOCIAL_PLATFORMS = [
  "github",
  "linkedin",
  "telegram",
  "email",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
