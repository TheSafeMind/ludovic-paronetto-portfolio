import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { getDictionary, isLanguage } from "@/lib/i18n";
import { localizedPath, resolveHref } from "@/lib/paths";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLanguage(params.lang)) return {};
  const copy = getDictionary(params.lang).services;
  return { title: copy.eyebrow, description: copy.intro, openGraph: { title: copy.title, description: copy.intro, images: [] }, twitter: { title: copy.title, description: copy.intro, images: [] } };
}

export default function ServicesPage({ params }: { params: { lang: string } }) {
  if (!isLanguage(params.lang)) return null;
  const copy = getDictionary(params.lang).services;

  return (
    <PageReveal>
      <main>
        <section className="inner-hero services-hero">
          <SonarBackground compact />
          <div className="page-shell inner-hero-content"><p className="eyebrow"><span />{copy.eyebrow}</p><h1>{copy.title}</h1><p className="inner-intro">{copy.intro}</p></div>
        </section>
        <section className="service-list-section section-space page-shell">
          <div className="service-list">
            {copy.items.map((item, index) => {
              const isExternal = "external" in item && item.external;
              const href = isExternal ? item.href : resolveHref(params.lang, item.href);
              const content = <><span className="service-number">{item.number}</span><div className="service-main"><small>{item.meta}</small><h2>{item.title}</h2><p>{item.text}</p></div><b>{item.action}<i>↗</i></b></>;
              return <Reveal key={item.number} delay={index * 0.06}>{isExternal ? <a className="service-row" href={href} target="_blank" rel="noreferrer">{content}</a> : <Link className="service-row" href={href}>{content}</Link>}</Reveal>;
            })}
          </div>
        </section>
        <section className="service-question section-space page-shell">
          <Reveal><p className="section-index">04 / OPEN SIGNAL</p><h2>{copy.question}</h2><p>{copy.questionText}</p><ButtonLink href={localizedPath(params.lang, "contact")}>{copy.questionCta}</ButtonLink></Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
