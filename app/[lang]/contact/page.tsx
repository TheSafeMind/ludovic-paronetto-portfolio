import type { Metadata } from "next";
import { PageReveal, Reveal } from "@/components/Reveal";
import { SonarBackground } from "@/components/SonarBackground";
import { getDictionary, isLanguage, links } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLanguage(params.lang)) return {};
  const copy = getDictionary(params.lang).contact;
  return { title: copy.eyebrow, description: copy.intro, openGraph: { title: copy.title, description: copy.intro, images: [] }, twitter: { title: copy.title, description: copy.intro, images: [] } };
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  if (!isLanguage(params.lang)) return null;
  const copy = getDictionary(params.lang).contact;
  const cards = [
    { number: "01", label: copy.bookingLabel, title: copy.bookingTitle, text: copy.bookingText, action: copy.bookingCta, href: links.calendar },
    { number: "02", label: copy.emailLabel, title: copy.emailTitle, text: copy.emailText, action: copy.emailCta, href: links.email },
    { number: "03", label: copy.socialLabel, title: copy.socialTitle, text: copy.socialText, action: copy.socialCta, href: links.linkedin },
  ];

  return (
    <PageReveal>
      <main>
        <section className="contact-hero inner-hero">
          <SonarBackground />
          <div className="page-shell inner-hero-content"><p className="eyebrow"><span />{copy.eyebrow}</p><h1>{copy.title}</h1><p className="inner-intro">{copy.intro}</p></div>
        </section>
        <section className="contact-options section-space page-shell">
          <div className="contact-grid">
            {cards.map((card, index) => (
              <Reveal key={card.number} delay={index * 0.06}>
                <a className="contact-card" href={card.href} target={card.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                  <div><span>{card.number}</span><small>{card.label}</small></div><h2>{card.title}</h2><p>{card.text}</p><b>{card.action}<i>↗</i></b>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="contact-note"><span />{copy.note}</p></Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
