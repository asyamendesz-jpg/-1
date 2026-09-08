"use client";

import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LeadMagnet() {
  const { copy } = useLanguage();
  const block = copy.beautyPick;

  return (
    <Section id="beauty-podbor" tone="milk">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="font-serif text-4xl text-ink md:text-6xl">{block.title}</h2>
          <p className="mt-5 max-w-xl text-muted">{block.text}</p>
          <p className="mt-4 max-w-xl text-sm text-mist">{block.note}</p>
          <Button href="/podbor?mode=complex" className="mt-8">
            {block.cta}
          </Button>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="group overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
            <WorkPhoto
              src="/images/salon/makeup-glitter-eyes.jpg"
              alt={block.photoAlt}
              className="aspect-[4/5] w-full md:aspect-[4/3]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
