import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { pageSlugs as pageSlugMap, type PageKey } from "@/lib/paths";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ludovicparonetto.com";

export const siteUrl = new URL(configuredSiteUrl);
export const siteOrigin = siteUrl.origin;
export const socialImagePath = "/og-sonar-midnight-v2.png";

// Canonical Dutch-slug keys. These match the folder names under app/[lang]/.
// Public URLs per language are looked up in pageSlugMap.
export const pageSlugs = [
  "",
  "over-mij",
  "boek",
  "transformatie",
  "spreken",
  "diensten",
  "contact",
  "privacy",
  "cookies",
] as const;

export type PageSlug = (typeof pageSlugs)[number];
export type LanguagePageProps = { params: Promise<{ lang: string }> };

function publicSlugFor(lang: Language, slug: PageSlug): string {
  if (slug === "") return "";
  return pageSlugMap[lang]?.[slug as PageKey] ?? slug;
}

const openGraphLocales: Record<Language, string> = {
  nl: "nl_BE",
  en: "en_US",
  fr: "fr_BE",
};

export const homeMetadataTitles: Record<Language, string> = {
  nl: "Structuur waar chaos is",
  en: "Structure where there is chaos",
  fr: "De la structure dans le chaos",
};

export function localizedPath(lang: Language, slug: PageSlug = "") {
  const publicSlug = publicSlugFor(lang, slug);
  return `/${lang}${publicSlug ? `/${publicSlug}` : ""}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function localizedAlternates(lang: Language, slug: PageSlug = "") {
  return {
    canonical: absoluteUrl(localizedPath(lang, slug)),
    languages: {
      nl: absoluteUrl(localizedPath("nl", slug)),
      en: absoluteUrl(localizedPath("en", slug)),
      fr: absoluteUrl(localizedPath("fr", slug)),
      "x-default": absoluteUrl(localizedPath("nl", slug)),
    },
  } satisfies NonNullable<Metadata["alternates"]>;
}

type PageMetadataOptions = {
  lang: Language;
  slug?: PageSlug;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function buildPageMetadata({
  lang,
  slug = "",
  title,
  description,
  image,
  imageAlt,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(localizedPath(lang, slug));
  const images = image
    ? [{ url: absoluteUrl(image), alt: imageAlt ?? title }]
    : [];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: localizedAlternates(lang, slug).languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Ludovic Paronetto",
      locale: openGraphLocales[lang],
      alternateLocale: Object.values(openGraphLocales).filter((locale) => locale !== openGraphLocales[lang]),
      type: "website",
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}
