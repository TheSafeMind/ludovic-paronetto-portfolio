/** @type {import('next').NextConfig} */

// Keep in sync with lib/paths.ts. next.config runs before TS is compiled so we
// duplicate the map here as plain JS (small, low-churn).
const pageSlugs = {
  nl: {
    "over-mij": "over-mij",
    boek: "boek",
    diensten: "diensten",
    spreken: "spreken",
    transformatie: "transformatie",
    contact: "contact",
  },
  en: {
    "over-mij": "about",
    boek: "book",
    diensten: "services",
    spreken: "speaking",
    transformatie: "transformation",
    contact: "contact",
  },
  fr: {
    "over-mij": "a-propos",
    boek: "livre",
    diensten: "services",
    spreken: "conferences",
    transformatie: "transformation",
    contact: "contact",
  },
};

/**
 * Rewrite localized public slugs to the canonical Dutch folder under the hood.
 * e.g. /en/about  ->  /en/over-mij
 *      /fr/livre  ->  /fr/boek
 * Only non-NL languages need rewrites (NL public == canonical).
 */
function buildRewrites() {
  const rewrites = [];
  for (const [lang, map] of Object.entries(pageSlugs)) {
    if (lang === "nl") continue;
    for (const [canonical, localized] of Object.entries(map)) {
      if (canonical === localized) continue;
      rewrites.push({
        source: `/${lang}/${localized}`,
        destination: `/${lang}/${canonical}`,
      });
      rewrites.push({
        source: `/${lang}/${localized}/:path*`,
        destination: `/${lang}/${canonical}/:path*`,
      });
    }
  }
  return rewrites;
}

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return buildRewrites();
  },
};

export default nextConfig;
