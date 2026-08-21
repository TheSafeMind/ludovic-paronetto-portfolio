import type { MetadataRoute } from "next";
import { languages } from "@/lib/i18n";
import { absoluteUrl, localizedPath, pageSlugs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pageSlugs.flatMap((slug) =>
    languages.map((lang) => ({
      url: absoluteUrl(localizedPath(lang, slug)),
      changeFrequency: slug === "" ? "weekly" as const : "monthly" as const,
      priority: slug === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          languages.map((alternateLang) => [alternateLang, absoluteUrl(localizedPath(alternateLang, slug))]),
        ),
      },
    })),
  );
}
