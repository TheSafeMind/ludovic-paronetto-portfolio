import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { getDictionary, isLanguage, links } from "@/lib/i18n";
import { localizedPath } from "@/lib/paths";
import { buildPageMetadata, type LanguagePageProps } from "@/lib/site";

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = getDictionary(lang).about;
  return buildPageMetadata({ lang, slug: "over-mij", title: copy.eyebrow, description: copy.intro });
}

export default async function AboutPage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) return null;
  const dictionary = getDictionary(lang);
  const copy = dictionary.about;
  const quoteTailStart = copy.quote.lastIndexOf(" ");
  const quoteLead = quoteTailStart >= 0 ? copy.quote.slice(0, quoteTailStart + 1) : "";
  const quoteTail = quoteTailStart >= 0 ? copy.quote.slice(quoteTailStart + 1) : copy.quote;

  return (
    <PageReveal>
      <main id="main-content" tabIndex={-1}>
        <section className="inner-hero">
          <SonarBackground compact />
          <div className="page-shell inner-hero-content">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="inner-intro">{copy.intro}</p>
          </div>
        </section>

        <section className="about-story section-space page-shell">
          <Reveal className="pull-quote">
            <span aria-hidden="true" className="pull-quote-mark">“</span>
            <p>{quoteLead}<span className="pull-quote-tail">{quoteTail}<span aria-hidden="true" className="pull-quote-mark pull-quote-close">”</span></span></p>
          </Reveal>
          <div className="story-grid">
            <Reveal><p className="section-index">01 / ORIGIN</p><h2>{copy.storyTitle}</h2></Reveal>
            <div className="story-copy">
              {copy.story.map((paragraph, index) => <Reveal key={paragraph} delay={index * 0.06}><p>{paragraph}</p></Reveal>)}
              <Reveal><a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">{copy.linkedIn}<span>↗</span></a></Reveal>
            </div>
          </div>
        </section>

        <section className="timeline-section section-space">
          <div className="page-shell">
            <Reveal className="section-heading"><p className="section-index">02 / PATTERN</p><h2>{copy.timelineTitle}</h2></Reveal>
            <div className="timeline-list">
              {copy.timeline.map((item, index) => (
                <Reveal className="timeline-row" key={item.label} delay={index * 0.05}>
                  <span>0{index + 1}</span><h3>{item.label}</h3><p>{item.text}</p><i aria-hidden="true" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="private-story section-space page-shell">
          <Reveal className="private-panel">
            <div><p className="section-index">03 / CONTEXT</p><h2>{copy.privateTitle}</h2></div>
            <div><p>{copy.privateText}</p><ButtonLink href={localizedPath(lang, "boek")} variant="ghost">{copy.privateCta}</ButtonLink></div>
          </Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
