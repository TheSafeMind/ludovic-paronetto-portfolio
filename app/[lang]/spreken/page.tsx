import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { getDictionary, isLanguage, links } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLanguage(params.lang)) return {};
  const copy = getDictionary(params.lang).speaking;
  return { title: copy.eyebrow, description: copy.intro, openGraph: { title: copy.title, description: copy.intro, images: [] }, twitter: { title: copy.title, description: copy.intro, images: [] } };
}

export default function SpeakingPage({ params }: { params: { lang: string } }) {
  if (!isLanguage(params.lang)) return null;
  const copy = getDictionary(params.lang).speaking;

  return (
    <PageReveal>
      <main>
        <section className="inner-hero speaking-hero">
          <SonarBackground compact />
          <div className="page-shell inner-hero-content">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="inner-intro">{copy.intro}</p>
          </div>
        </section>

        <section className="topics-section section-space page-shell">
          <Reveal className="section-heading"><p className="section-index">01 / TOPICS</p><h2>{copy.topicsTitle}</h2></Reveal>
          <div className="topic-list">
            {copy.topics.map((topic, index) => (
              <Reveal className="topic-row" key={topic.number} delay={index * 0.07}>
                <span>{topic.number}</span><h3>{topic.title}</h3><p>{topic.text}</p><div>{topic.tags.map((tag) => <b key={tag}>{tag}</b>)}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="approach-section section-space">
          <div className="page-shell approach-grid">
            <Reveal><div className="voice-wave" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ height: `${22 + ((index * 19) % 58)}%` }} />)}</div></Reveal>
            <Reveal className="approach-copy"><p className="section-index">02 / APPROACH</p><h2>{copy.approachTitle}</h2><p>{copy.approachText}</p><small>{copy.format}</small></Reveal>
          </div>
        </section>

        <section className="cta-section section-space page-shell">
          <Reveal><h2>{copy.ctaTitle}</h2><ButtonLink href={links.calendar} external>{copy.cta}</ButtonLink></Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
