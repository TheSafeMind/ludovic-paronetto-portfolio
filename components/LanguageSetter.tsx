"use client";

import { useEffect } from "react";
import type { Language } from "@/lib/i18n";

export function LanguageSetter({ lang }: { lang: Language }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
