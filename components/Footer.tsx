import Link from "next/link";
import type { Dictionary, Language } from "@/lib/i18n";
import { links } from "@/lib/i18n";

export function Footer({ lang, dictionary }: { lang: Language; dictionary: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href={`/${lang}`}>LP<span>.</span></Link>
          <p>{dictionary.common.footerLine}</p>
        </div>
        <div className="footer-links">
          <div>
            <span>{dictionary.common.footerNav}</span>
            {dictionary.common.nav.map((item) => <Link key={item.href} href={`/${lang}/${item.href}`}>{item.label}</Link>)}
          </div>
          <div>
            <span>{dictionary.common.connect}</span>
            <Link href={`/${lang}/contact`}>{dictionary.common.contact}</Link>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.launchpad} target="_blank" rel="noreferrer">LP Cyber Launchpad</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ludovic Paronetto. {dictionary.common.rights}</span>
        <span>MECH{`//`}BE · 51.0259° N</span>
      </div>
    </footer>
  );
}
