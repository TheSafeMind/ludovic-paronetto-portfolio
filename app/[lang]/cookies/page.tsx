import type { Metadata } from "next";
import Link from "next/link";
import { PageReveal, Reveal } from "@/components/Reveal";
import { isLanguage, links } from "@/lib/i18n";
import { getLegalCopy } from "@/lib/legal";
import { localizedPath } from "@/lib/paths";
import { buildPageMetadata, type LanguagePageProps } from "@/lib/site";

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = getLegalCopy(lang).cookies;
  return buildPageMetadata({ lang, slug: "cookies", title: copy.metadataTitle, description: copy.metadataDescription });
}

export default async function CookiePolicyPage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) return null;
  const legal = getLegalCopy(lang);
  const copy = legal.cookies;

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
              <Link href={localizedPath(lang, "privacy")}>{legal.common.privacyLabel}</Link>
            </div>
          </div>
        </section>

        <section className="legal-content section-space page-shell">
          <Reveal className="storage-section">
            <p className="section-index">01 / STORAGE</p>
            <h2>{copy.storageTitle}</h2>
            <div className="storage-table-wrap">
              <table className="storage-table">
                <thead>
                  <tr>{copy.storageHeaders.map((header) => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>
                  <tr>{copy.storageRow.map((cell) => <td key={cell}>{cell}</td>)}</tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          {copy.sections.map((section, index) => (
            <Reveal className="legal-section" key={section.title}>
              <span className="section-index">{String(index + 2).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
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
