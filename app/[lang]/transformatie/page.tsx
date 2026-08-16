import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { getDictionary, isLanguage } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLanguage(params.lang)) return {};
  const copy = getDictionary(params.lang).transformation;
  return { title: copy.eyebrow, description: copy.intro, openGraph: { title: copy.title, description: copy.intro, images: [] }, twitter: { title: copy.title, description: copy.intro, images: [] } };
}

export default function TransformationPage({ params }: { params: { lang: string } }) {
  if (!isLanguage(params.lang)) return null;
  const copy = getDictionary(params.lang).transformation;

  return (
    <PageReveal>
      <main>
        <section className="transformation-hero inner-hero">
          <SonarBackground />
          <div className="page-shell inner-hero-content">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <div className="transformation-title"><h1>{copy.title}</h1><div className="bat-badge" tabIndex={0} aria-label={`${copy.badge}. ${copy.badgeHelp}`}><span>{copy.badge}</span><i>?</i><b role="tooltip">{copy.badgeHelp}</b></div></div>
            <p className="inner-intro">{copy.intro}</p>
          </div>
        </section>

        <section className="method-section section-space page-shell">
          <Reveal className="section-heading split-heading">
            <div><p className="eyebrow"><span />{copy.methodEyebrow}</p><h2>{copy.methodTitle}</h2></div>
            <p>{copy.methodIntro}</p>
          </Reveal>
          <div className="method-list">
            {copy.steps.map((step, index) => (
              <Reveal className="method-row" key={step.number} delay={index * 0.06}>
                <span>{step.number}</span><h3>{step.name}</h3><p>{step.text}</p><div className="method-pulse" aria-hidden="true"><i /><i /><i /></div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="fit-section section-space">
          <div className="page-shell fit-grid">
            <Reveal><p className="section-index">02 / FIT</p><h2>{copy.fitTitle}</h2></Reveal>
            <div className="fit-list">
              {copy.fit.map((item, index) => <Reveal key={item} className="fit-item" delay={index * 0.05}><span>0{index + 1}</span><p>{item}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="cta-section section-space page-shell">
          <Reveal><h2>{copy.ctaTitle}</h2><ButtonLink href={`/${params.lang}/contact`}>{copy.cta}</ButtonLink></Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
