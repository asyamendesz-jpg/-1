"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, copy } = useLanguage();

  return (
    <div
      className={cn("flex shrink-0 items-center text-[11px] tracking-[0.14em] text-muted", className)}
      role="group"
      aria-label={copy.ui.languageSwitchAria}
    >
      {LOCALES.map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 ? <span className="px-1 text-line" aria-hidden="true">|</span> : null}
          <button
            type="button"
            data-i18n-locale={code}
            onMouseDown={() => setLocale(code)}
            onClick={() => setLocale(code)}
            className={cn(
              "rounded-full px-1.5 py-1 transition-colors",
              locale === code ? "text-ink" : "text-muted hover:text-ink",
            )}
            aria-pressed={locale === code}
            aria-label={LOCALE_LABELS[code]}
          >
            {LOCALE_LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
