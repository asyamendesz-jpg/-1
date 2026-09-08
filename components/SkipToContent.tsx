"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function SkipToContent() {
  const { copy } = useLanguage();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-ivory focus:px-4 focus:py-2"
    >
      {copy.skipToContent}
    </a>
  );
}
