import type { Language } from "@/lib/i18n";
import { isLanguage } from "@/lib/i18n";

/**
 * Canonical page keys are the Dutch slugs used by the file-system routes
 * under app/[lang]/<slug>/page.tsx. Each language exposes a localized public
 * slug that is rewritten to the canonical route by next.config rewrites.
 */
export type PageKey =
  | "over-mij"
  | "boek"
  | "diensten"
  | "spreken"
  | "transformatie"
  | "contact"
  | "privacy"
  | "cookies";

export const pageSlugs: Record<Language, Record<PageKey, string>> = {
  nl: {
    "over-mij": "over-mij",
    boek: "boek",
    diensten: "diensten",
    spreken: "spreken",
    transformatie: "transformatie",
    contact: "contact",
    privacy: "privacy",
    cookies: "cookies",
  },
  en: {
    "over-mij": "about",
    boek: "book",
    diensten: "services",
    spreken: "speaking",
    transformatie: "transformation",
    contact: "contact",
    privacy: "privacy",
    cookies: "cookies",
  },
  fr: {
    "over-mij": "a-propos",
    boek: "livre",
    diensten: "services",
    spreken: "conferences",
    transformatie: "transformation",
    contact: "contact",
    privacy: "confidentialite",
    cookies: "cookies",
  },
};

export const canonicalKeys = Object.keys(pageSlugs.nl) as PageKey[];

function coerceLang(lang: string): Language {
  return isLanguage(lang) ? lang : "nl";
}

/** Build a public URL for a given language + canonical page key. */
export function localizedPath(lang: string, key: PageKey): string {
  const safeLang = coerceLang(lang);
  const slug = pageSlugs[safeLang]?.[key] ?? key;
  return `/${safeLang}/${slug}`;
}

/** Return the localized public slug (without lang prefix) for a canonical key. */
export function localizedSlug(lang: string, key: PageKey): string {
  const safeLang = coerceLang(lang);
  return pageSlugs[safeLang]?.[key] ?? key;
}

/**
 * If a value is a canonical PageKey, return the localized href for the given
 * language. Otherwise (external URL, non-page path) return the value untouched.
 */
export function resolveHref(lang: string, value: string): string {
  if (!value) return value;
  if (/^(https?:|mailto:|tel:|#|\/)/.test(value)) return value;
  if ((canonicalKeys as string[]).includes(value)) {
    return localizedPath(lang, value as PageKey);
  }
  return value;
}
