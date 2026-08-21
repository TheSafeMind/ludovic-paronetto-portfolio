/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== "production";

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

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isDevelopment
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]),
];

const nextConfig = {
  agentRules: false,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return buildRewrites();
  },
};

export default nextConfig;
