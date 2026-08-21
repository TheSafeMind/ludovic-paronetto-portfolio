import type { Metadata } from "next";
import { PageReveal, Reveal } from "@/components/Reveal";
import { isLanguage, links } from "@/lib/i18n";
import { getLegalCopy } from "@/lib/legal";
import { buildPageMetadata, type LanguagePageProps } from "@/lib/site";

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = getLegalCopy(lang).privacy;
  return buildPageMetadata({ lang, slug: "privacy", title: copy.metadataTitle, description: copy.metadataDescription });
}

export default async function PrivacyPage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) return null;
  const legal = getLegalCopy(lang);
  const copy = legal.privacy;

  return (
    <PageReveal>
      <main id="main-content" tabIndex={-1}>
        <section className="legal-hero">
          <div className="page-shell">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <div className="legal-meta">
              <span>{legal.common.updated}</span>
              <a href={links.email}>{legal.common.emailLabel}: {links.email.replace("mailto:", "")}</a>
            </div>
          </div>
        </section>

        <section className="legal-content section-space page-shell">
          {copy.sections.map((section, index) => (
            <Reveal className="legal-section" key={section.title}>
              <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}

          <Reveal className="legal-contact-panel">
            <p>{legal.common.controller}</p>
            <a href={links.email}>{links.email.replace("mailto:", "")}</a>
            <a href={legal.common.complaintHref} target="_blank" rel="noreferrer">{legal.common.complaintLabel}<span aria-hidden="true">↗</span></a>
          </Reveal>
        </section>
      </main>
    </PageReveal>
  );
}
