import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "../globals.css";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getDictionary, isLanguage, languages } from "@/lib/i18n";
import { homeMetadataTitles, localizedAlternates, siteUrl, socialImagePath, absoluteUrl } from "@/lib/site";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0B0F",
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const dictionary = getDictionary(lang);
  return {
    metadataBase: siteUrl,
    title: {
      default: `${homeMetadataTitles[lang]} — Ludovic Paronetto`,
      template: "%s — Ludovic Paronetto",
    },
    description: dictionary.home.intro,
    alternates: localizedAlternates(lang, ""),
    openGraph: {
      title: "Ludovic Paronetto",
      description: dictionary.home.intro,
      siteName: "Ludovic Paronetto",
      type: "website",
      images: [{ url: absoluteUrl(socialImagePath), alt: "Ludovic Paronetto — Sonar Midnight" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ludovic Paronetto",
      description: dictionary.home.intro,
      images: [{ url: absoluteUrl(socialImagePath), alt: "Ludovic Paronetto — Sonar Midnight" }],
    },
  };
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const dictionary = getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <a className="skip-link" href="#main-content">{lang === "nl" ? "Ga naar de inhoud" : lang === "fr" ? "Aller au contenu" : "Skip to content"}</a>
        <Navbar lang={lang} dictionary={dictionary} />
        {children}
        <Footer lang={lang} dictionary={dictionary} />
        <CookieNotice lang={lang} />
      </body>
    </html>
  );
}
