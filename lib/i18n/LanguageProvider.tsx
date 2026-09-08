"use client";

import { dictionaries, isLocale } from "@/lib/i18n/dictionaries";
import { LOCALE_LANG, STORAGE_KEY, type Locale, type SiteCopy } from "@/lib/i18n/types";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type LanguageContextValue = {
  locale: Locale;
  copy: SiteCopy;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(value)) return value;
  } catch {
    /* private mode */
  }
  return "ru";
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode */
  }
  document.documentElement.lang = LOCALE_LANG[locale];
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");
  const chosen = useRef(false);

  useEffect(() => {
    if (chosen.current) return;
    const stored = readStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = LOCALE_LANG[stored];
  }, []);

  const setLocale = useCallback((next: Locale) => {
    chosen.current = true;
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      copy: dictionaries[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
