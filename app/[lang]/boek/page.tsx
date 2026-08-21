import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageReveal, Reveal } from "@/components/Reveal";
import { getDictionary, isLanguage, links } from "@/lib/i18n";
import { buildPageMetadata, type LanguagePageProps } from "@/lib/site";

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = getDictionary(lang).book;
  return buildPageMetadata({ lang, slug: "boek", title: copy.title, description: copy.intro, image: "/book-cover.jpg", imageAlt: `${copy.title} — Ludovic Paronetto` });
}

export default async function BookPage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) return null;
  const copy = getDictionary(lang).book;
  const quoteTailStart = copy.quote.lastIndexOf(" ");
  const quoteLead = quoteTailStart >= 0 ? copy.quote.slice(0, quoteTailStart + 1) : "";
  const quoteTail = quoteTailStart >= 0 ? copy.quote.slice(quoteTailStart + 1) : copy.quote;

  return (
    <PageReveal>
      <main id="main-content" tabIndex={-1}>
        <section className="book-hero page-shell">
          <Reveal className="book-hero-copy">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <ButtonLink href={links.book} external>{copy.buy}</ButtonLink>
            <small>{copy.context}</small>
          </Reveal>
          <Reveal className="book-cover-wrap" delay={0.12}>
            <div className="book-glow" aria-hidden="true" />
            <Image className="book-cover" src="/book-cover.jpg" width={718} height={1080} alt="Cover of Ik heb lang gedacht dat ik het zelf zocht by Ludovic Paronetto" priority sizes="(max-width: 900px) 75vw, 38vw" />
            <span className="book-spine" aria-hidden="true" />
          </Reveal>
        </section>

        <section className="book-position section-space">
          <div className="page-shell">
            <Reveal className="book-statement">
              <p className="book-not-hero">{copy.notHero}</p><p className="book-not-victim">{copy.notVictim}</p><h2>{copy.truth}</h2>
            </Reveal>
            <Reveal className="book-quote">
              <span aria-hidden="true" className="book-quote-open">“</span>
              <blockquote>{quoteLead}<span className="book-quote-tail">{quoteTail}<span aria-hidden="true" className="book-quote-close">”</span></span></blockquote>
              <small>— Ludovic Paronetto</small>
            </Reveal>
          </div>
        </section>

        <section className="book-themes section-space page-shell">
          <Reveal className="section-heading"><p className="section-index">02 / THEMES</p><h2>{copy.themesTitle}</h2></Reveal>
          <div className="theme-grid">
            {copy.themes.map((theme, index) => (
              <Reveal className="theme-card" key={theme.title} delay={index * 0.06}><span>0{index + 1}</span><h3>{theme.title}</h3><p>{theme.text}</p></Reveal>
            ))}
          </div>
          <Reveal className="mother-line"><span aria-hidden="true" /><p>{copy.mother}</p></Reveal>
        </section>

        <section className="book-closing section-space page-shell">
          <Reveal><p className="section-index">03 / AFTER</p><h2>{copy.closeTitle}</h2><p>{copy.closeText}</p><ButtonLink href={links.book} external>{copy.closeCta}</ButtonLink></Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
