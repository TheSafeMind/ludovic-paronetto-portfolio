import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { LanguageSetter } from "@/components/LanguageSetter";
import { Navbar } from "@/components/Navbar";
import { getDictionary, isLanguage, languages } from "@/lib/i18n";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLanguage(params.lang)) return {};
  const dictionary = getDictionary(params.lang);
  return {
    title: {
      default: "Ludovic Paronetto",
      template: "%s — Ludovic Paronetto",
    },
    description: dictionary.home.intro,
    alternates: {
      languages: {
        nl: "/nl",
        en: "/en",
        fr: "/fr",
      },
    },
  };
}

export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLanguage(params.lang)) notFound();
  const dictionary = getDictionary(params.lang);

  return (
    <>
      <LanguageSetter lang={params.lang} />
      <Navbar lang={params.lang} dictionary={dictionary} />
      {children}
      <Footer lang={params.lang} dictionary={dictionary} />
    </>
  );
}
