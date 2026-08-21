import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PhaseAccordion } from "@/components/PhaseAccordion";
import { ProjectBrief } from "@/components/ProjectBrief";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { StickyScanCta } from "@/components/StickyScanCta";
import { getDictionary, isLanguage, links } from "@/lib/i18n";
import { buildPageMetadata, type LanguagePageProps } from "@/lib/site";

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = getDictionary(lang).transformation;
  return buildPageMetadata({ lang, slug: "transformatie", title: copy.title, description: copy.intro });
}

export default async function TransformationPage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) return null;
  const copy = getDictionary(lang).transformation;

  return (
    <PageReveal>
      <main id="main-content" tabIndex={-1}>
        <section className="transformation-hero inner-hero">
          <SonarBackground forceMotion />
          <div className="page-shell inner-hero-content">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <div className="transformation-title"><h1>{copy.title}</h1></div>
            <p className="transformation-tagline">{copy.tagline}</p>
            <p className="inner-intro">{copy.intro}</p>
          </div>
        </section>

        <section className="method-definition section-space page-shell">
          <Reveal className="method-definition-copy">
            <p className="section-index">01 / VISION</p>
            <h2>{copy.definitionTitle}</h2>
            <p>{copy.definition}</p>
          </Reveal>
          <Reveal className="framework-panel" delay={0.08}>
            <p>{copy.frameworksTitle}</p>
            <div>{copy.frameworks.map((framework) => <span key={framework}>{framework}</span>)}</div>
            <small>{copy.frameworksNote}</small>
          </Reveal>
        </section>

        <section className="method-section section-space page-shell">
          <Reveal className="section-heading split-heading">
            <div><p className="eyebrow"><span />{copy.methodEyebrow}</p><h2>{copy.methodTitle}</h2></div>
            <p>{copy.methodIntro}</p>
          </Reveal>
          <Reveal><PhaseAccordion labels={copy.phaseLabels} phases={copy.steps} /></Reveal>

          <Reveal className="method-overview">
            <h3>{copy.overview.title}</h3>
            <div className="method-table-wrap">
              <table>
                <thead><tr><th>{copy.overview.phase}</th><th>{copy.overview.question}</th><th>{copy.overview.activity}</th><th>{copy.overview.tool}</th><th>{copy.overview.result}</th></tr></thead>
                <tbody>
                  {copy.steps.map((step) => (
                    <tr key={step.number}>
                      <th scope="row"><span>{step.number}</span>{step.name}</th>
                      <td>{step.question}</td><td>{step.activities[0]}</td><td>{step.tools[0]}</td><td>{step.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="method-mobile-overview">
              {copy.steps.map((step) => (
                <article key={step.number}>
                  <div><span>{step.number}</span><h4>{step.name}</h4></div>
                  <dl>
                    <div><dt>{copy.overview.question}</dt><dd>{step.question}</dd></div>
                    <div><dt>{copy.overview.tool}</dt><dd>{step.tools[0]}</dd></div>
                    <div><dt>{copy.overview.result}</dt><dd>{step.output}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="principles-section section-space">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><p className="eyebrow"><span />{copy.principlesEyebrow}</p><h2>{copy.principlesTitle}</h2></div>
              <p>{copy.principlesIntro}</p>
            </Reveal>
            <Reveal><blockquote className="principles-quote">{copy.principlesQuote}</blockquote></Reveal>
            <div className="principles-grid">
              {copy.principles.map((principle, index) => (
                <Reveal className="principle-card" key={principle.title} delay={index * 0.05}>
                  <span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="comparison-section section-space page-shell">
          <Reveal className="section-heading split-heading">
            <div><p className="eyebrow"><span />{copy.comparison.eyebrow}</p><h2>{copy.comparison.title}</h2></div>
            <p>{copy.comparison.intro}</p>
          </Reveal>
          <Reveal className="comparison-table">
            <div className="comparison-head"><span>{copy.comparison.classicLabel}</span><span>{copy.comparison.sonarLabel}</span></div>
            {copy.comparison.rows.map((row, index) => (
              <div className="comparison-row" key={row.classic}>
                <div><small>0{index + 1}</small><p>{row.classic}</p></div>
                <div><i aria-hidden="true">→</i><p>{row.sonar}</p></div>
              </div>
            ))}
          </Reveal>
        </section>

        <section className="fit-section section-space">
          <div className="page-shell fit-grid">
            <Reveal><p className="section-index">05 / FIT</p><h2>{copy.fitTitle}</h2></Reveal>
            <div className="fit-list">
              {copy.fit.map((item, index) => <Reveal key={item} className="fit-item" delay={index * 0.05}><span>0{index + 1}</span><p>{item}</p></Reveal>)}
            </div>
          </div>
          <div className="page-shell suitability-block">
            <Reveal className="suitability-heading"><h3>{copy.suitability.title}</h3><p>{copy.suitability.intro}</p></Reveal>
            <div className="suitability-grid">
              <Reveal className="suitability-card suitable"><span>✓</span><h4>{copy.suitability.suitableTitle}</h4><ul>{copy.suitability.suitable.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
              <Reveal className="suitability-card not-suitable" delay={0.08}><span>—</span><h4>{copy.suitability.notTitle}</h4><ul>{copy.suitability.not.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
            </div>
          </div>
        </section>

        <ProjectBrief copy={copy.brief} email={links.email.replace("mailto:", "")} />

        <div className="page-shell proprietary-note"><span>™</span><p>{copy.proprietary}</p></div>

        <section className="cta-section section-space page-shell">
          <Reveal><h2>{copy.ctaTitle}</h2><ButtonLink href={`/${lang}/contact`}>{copy.cta}</ButtonLink></Reveal>
        </section>
      </main>
      <StickyScanCta label={copy.stickyCta} />
    </PageReveal>
  );
}
