"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Language } from "@/lib/i18n";
import { getLegalCopy } from "@/lib/legal";
import { localizedPath } from "@/lib/paths";

const STORAGE_KEY = "lp_privacy_notice_v1";
const STORAGE_VERSION = 1;
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
const OPEN_PRIVACY_SETTINGS_EVENT = "lp:open-privacy-settings";

type StoredNotice = {
  version: number;
  acknowledgedAt: number;
};

export function CookieNotice({ lang }: { lang: Language }) {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const legal = getLegalCopy(lang);

  useEffect(() => {
    const readPreference = () => {
      try {
        const rawValue = window.localStorage.getItem(STORAGE_KEY);
        if (!rawValue) return false;
        const stored = JSON.parse(rawValue) as StoredNotice;
        const isValid = stored.version === STORAGE_VERSION
          && Number.isFinite(stored.acknowledgedAt)
          && Date.now() - stored.acknowledgedAt < MAX_AGE_MS;
        if (!isValid) window.localStorage.removeItem(STORAGE_KEY);
        return isValid;
      } catch {
        return false;
      }
    };

    const openSettings = () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // The notice can still be shown when browser storage is unavailable.
      }
      setVisible(true);
    };

    const frameId = window.requestAnimationFrame(() => {
      setVisible(!readPreference());
      setReady(true);
    });
    window.addEventListener(OPEN_PRIVACY_SETTINGS_EVENT, openSettings);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener(OPEN_PRIVACY_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const acknowledge = () => {
    try {
      const stored: StoredNotice = { version: STORAGE_VERSION, acknowledgedAt: Date.now() };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // The visitor can continue without persistent storage.
    }
    setVisible(false);
  };

  if (!ready || !visible) return null;

  return (
    <aside className="cookie-notice" role="dialog" aria-modal="false" aria-labelledby="cookie-notice-title" aria-describedby="cookie-notice-description">
      <div className="cookie-notice-copy">
        <p className="eyebrow"><span />PRIVACY</p>
        <h2 id="cookie-notice-title">{legal.banner.title}</h2>
        <p id="cookie-notice-description">{legal.banner.text}</p>
        <div className="cookie-notice-links">
          <Link href={localizedPath(lang, "privacy")}>{legal.common.privacyLabel}</Link>
          <Link href={localizedPath(lang, "cookies")}>{legal.common.cookiesLabel}</Link>
        </div>
      </div>
      <button type="button" className="cookie-acknowledge" onClick={acknowledge}>{legal.banner.acknowledge}<span aria-hidden="true">→</span></button>
    </aside>
  );
}

export function PrivacySettingsButton({ label }: { label: string }) {
  const openSettings = () => window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS_EVENT));
  return <button type="button" onClick={openSettings}>{label}</button>;
}
