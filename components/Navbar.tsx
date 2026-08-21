"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Language } from "@/lib/i18n";
import { languages } from "@/lib/i18n";
import { pageSlugs, resolveHref } from "@/lib/paths";

const navigationLabels: Record<Language, { main: string; mobile: string; languages: string; home: string }> = {
  nl: { main: "Hoofdnavigatie", mobile: "Mobiele navigatie", languages: "Taalkeuze", home: "Ludovic Paronetto home" },
  en: { main: "Main navigation", mobile: "Mobile navigation", languages: "Language selector", home: "Ludovic Paronetto home" },
  fr: { main: "Navigation principale", mobile: "Navigation mobile", languages: "Choix de la langue", home: "Accueil de Ludovic Paronetto" },
};

export function Navbar({ lang, dictionary }: { lang: Language; dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const labels = navigationLabels[lang];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const focusable = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
    );

    document.body.style.overflow = "hidden";
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const languageHref = (nextLang: Language) => {
    const parts = pathname.split("/");
    parts[1] = nextLang;
    // Translate the current localized slug (parts[2]) to the equivalent slug
    // in the target language, so /en/about becomes /nl/over-mij and vice versa.
    if (parts[2]) {
      const currentSlug = parts[2];
      const currentMap = pageSlugs[lang];
      const canonicalKey = (Object.keys(currentMap) as Array<keyof typeof currentMap>).find(
        (key) => currentMap[key] === currentSlug,
      );
      if (canonicalKey) {
        parts[2] = pageSlugs[nextLang][canonicalKey];
      }
    }
    return parts.join("/") || `/${nextLang}`;
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand-mark" href={`/${lang}`} aria-label={labels.home}>
          LP<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={labels.main}>
          {dictionary.common.nav.map((item) => {
            const href = resolveHref(lang, item.href);
            return (
              <Link key={item.href} className={pathname === href || pathname.startsWith(`${href}/`) ? "active" : ""} href={href}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label={labels.languages}>
            {languages.map((code) => (
              <Link key={code} href={languageHref(code)} aria-current={code === lang ? "page" : undefined}>
                {code.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link className="nav-contact" href={resolveHref(lang, "contact")}>{dictionary.common.contact}<span>↗</span></Link>
          <button ref={menuButtonRef} className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? dictionary.common.close : dictionary.common.menu}>
            <span>{open ? dictionary.common.close : dictionary.common.menu}</span>
            <i className={open ? "open" : ""}><b /><b /></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div ref={mobileMenuRef} id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <nav aria-label={labels.mobile}>
              {dictionary.common.nav.map((item, index) => (
                <Link key={item.href} href={resolveHref(lang, item.href)} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>
              ))}
              <Link href={resolveHref(lang, "contact")} onClick={() => setOpen(false)}><span>05</span>{dictionary.common.contact}</Link>
            </nav>
            <div className="mobile-language-switcher" aria-label={labels.languages}>
              {languages.map((code) => (
                <Link key={code} href={languageHref(code)} aria-current={code === lang ? "page" : undefined} onClick={() => setOpen(false)}>
                  {code.toUpperCase()}
                </Link>
              ))}
            </div>
            <p>{dictionary.common.mission}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
