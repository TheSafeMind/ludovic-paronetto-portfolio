import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { EnergyField } from "@/components/EnergyField";
import { PageReveal, Reveal } from "@/components/Reveal";
import { getDictionary, isLanguage } from "@/lib/i18n";
import { localizedPath, resolveHref } from "@/lib/paths";
import { buildPageMetadata, homeMetadataTitles, socialImagePath, type LanguagePageProps } from "@/lib/site";

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const dictionary = getDictionary(lang);
  return buildPageMetadata({ lang, title: homeMetadataTitles[lang], description: dictionary.home.intro, image: socialImagePath, imageAlt: "Ludovic Paronetto — Sonar Midnight" });
}

export default async function HomePage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) return null;
  const dictionary = getDictionary(lang);
  const home = dictionary.home;

  return (
    <PageReveal>
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero">
          <div className="hero-art" aria-hidden="true" />
          <EnergyField />
          <div className="hero-content page-shell">
            <p className="eyebrow"><span />{home.eyebrow}</p>
            <h1>
              <span>{home.titleA}</span>
              <span>{home.titleB}</span>
              <em>{home.titleC}</em>
            </h1>
            <div className="hero-bottom">
              <p>{home.intro}</p>
              <div className="hero-actions">
                <ButtonLink href={localizedPath(lang, "diensten")}>{home.primaryCta}</ButtonLink>
                <ButtonLink href={localizedPath(lang, "contact")} variant="ghost">{home.secondaryCta}</ButtonLink>
              </div>
            </div>
            <div className="scroll-cue"><span /><small>{home.scroll}</small></div>
          </div>
        </section>

        <section className="paths-section section-space page-shell" id="work">
          <Reveal className="section-heading split-heading">
            <div><p className="eyebrow"><span />{home.pathsEyebrow}</p><h2>{home.pathsTitle}</h2></div>
            <p>{home.pathsIntro}</p>
          </Reveal>
          <div className="path-grid">
            {home.cards.map((card, index) => {
              const isExternal = "external" in card && card.external;
              const href = isExternal ? card.href : resolveHref(lang, card.href);
              const content = (
                <>
                  <div className="path-card-top"><span>{card.number}</span><i aria-hidden="true">↗</i></div>
                  <div><h3>{card.title}</h3><p>{card.text}</p></div>
                  <b>{card.action}<span aria-hidden="true">→</span></b>
                </>
              );
              return (
                <Reveal key={card.number} delay={index * 0.07}>
                  {isExternal ? <a className="path-card" href={href} target="_blank" rel="noreferrer">{content}</a> : <Link className="path-card" href={href}>{content}</Link>}
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="signal-section section-space page-shell">
          <Reveal className="signal-panel">
            <div className="signal-visual flow-visual" aria-hidden="true" />
            <div className="signal-copy">
              <p className="eyebrow"><span />{home.signal}</p>
              <h2>{home.signalTitle}</h2>
              <p>{home.signalText}</p>
              <Link href={localizedPath(lang, "over-mij")}>{home.signalLink}<span>→</span></Link>
            </div>
          </Reveal>
        </section>

        <section className="closing-section section-space page-shell">
          <Reveal>
            <p className="mission-line">{dictionary.common.mission}</p>
            <h2>{home.closing}</h2>
            <ButtonLink href={localizedPath(lang, "contact")}>{home.closingCta}</ButtonLink>
          </Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
