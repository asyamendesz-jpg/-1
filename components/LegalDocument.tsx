"use client";

import { Section } from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LegalDocument({ kind }: { kind: "privacy" | "offer" }) {
  const { copy } = useLanguage();
  const page = copy.legalPages[kind];

  return (
    <Section tone="ivory" className="pt-16">
      <h1 className="max-w-3xl font-serif text-5xl leading-tight text-ink md:text-6xl">{page.title}</h1>
      <div className="mt-10 max-w-3xl space-y-8 text-base leading-relaxed text-muted">
        <p>{page.placeholder}</p>
      </div>
    </Section>
  );
}
