"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";

export function Navbar({ lang, dictionary }: { lang: Language; dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  const languageHref = (nextLang: Language) => {
    const parts = pathname.split("/");
    parts[1] = nextLang;
    return parts.join("/") || `/${nextLang}`;
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand-mark" href={`/${lang}`} aria-label="Ludovic Paronetto home">
          LP<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {dictionary.common.nav.map((item) => (
            <Link key={item.href} className={pathname.includes(`/${item.href}`) ? "active" : ""} href={`/${lang}/${item.href}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label="Language selector">
            {languages.map((code) => (
              <Link key={code} href={languageHref(code)} aria-current={code === lang ? "page" : undefined}>
                {code.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link className="nav-contact" href={`/${lang}/contact`}>{dictionary.common.contact}<span>↗</span></Link>
          <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu">
            <span>{open ? dictionary.common.close : dictionary.common.menu}</span>
            <i className={open ? "open" : ""}><b /><b /></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Mobile navigation">
              {dictionary.common.nav.map((item, index) => (
                <Link key={item.href} href={`/${lang}/${item.href}`}><span>0{index + 1}</span>{item.label}</Link>
              ))}
              <Link href={`/${lang}/contact`}><span>05</span>{dictionary.common.contact}</Link>
            </nav>
            <p>{dictionary.common.mission}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
