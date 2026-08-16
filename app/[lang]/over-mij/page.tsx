import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { getDictionary, isLanguage, links } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLanguage(params.lang)) return {};
  const copy = getDictionary(params.lang).about;
  return { title: copy.eyebrow, description: copy.intro, openGraph: { title: copy.title, description: copy.intro, images: [] }, twitter: { title: copy.title, description: copy.intro, images: [] } };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  if (!isLanguage(params.lang)) return null;
  const dictionary = getDictionary(params.lang);
  const copy = dictionary.about;

  return (
    <PageReveal>
      <main>
        <section className="inner-hero">
          <SonarBackground compact />
          <div className="page-shell inner-hero-content">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="inner-intro">{copy.intro}</p>
          </div>
        </section>

        <section className="about-story section-space page-shell">
          <Reveal className="pull-quote"><span>“</span><p>{copy.quote}</p></Reveal>
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
            <div><p>{copy.privateText}</p><ButtonLink href={`/${params.lang}/boek`} variant="ghost">{copy.privateCta}</ButtonLink></div>
          </Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
