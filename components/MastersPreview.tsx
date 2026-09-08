"use client";

import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { MasterCard } from "@/components/MasterCard";
import { masters } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MastersPreview({ hideIntro = false }: { hideIntro?: boolean }) {
  const { copy } = useLanguage();
  return (
    <Section id="mastera" tone={hideIntro ? "cream" : "ivory"}>
      {hideIntro ? null : (
        <Reveal>
          <Eyebrow>{copy.masters.eyebrow}</Eyebrow>
          <h2 className="font-serif text-4xl text-ink md:text-6xl">{copy.masters.title}</h2>
          <p className="mt-4 max-w-xl text-muted">{copy.masters.text}</p>
        </Reveal>
      )}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {masters.map((master, index) => (
          <Reveal key={master.id} delay={index * 0.05}>
            <MasterCard id={master.id} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
