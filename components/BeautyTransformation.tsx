"use client";

import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function BeautyTransformation() {
  const { copy } = useLanguage();
  const block = copy.transformation;

  return (
    <Section id="preobrazhenie" tone="graphite">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="font-serif text-4xl md:text-6xl">{block.title}</h2>
          <p className="mt-5 max-w-lg text-ivory/75">{block.text}</p>
          <Button href="/podbor?mode=complex" variant="ghost" className="mt-8">
            {block.cta}
          </Button>
        </Reveal>
        <Reveal>
          <div className="group overflow-hidden rounded-[2rem]">
            <WorkPhoto src="/images/salon/makeup-glitter-eyes.jpg" alt={block.photoAlt} className="aspect-[4/3] w-full" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
