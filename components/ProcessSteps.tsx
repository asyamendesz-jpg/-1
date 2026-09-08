"use client";

import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Search, FlaskConical, HandHeart, Sprout } from "lucide-react";

const icons = [Search, FlaskConical, HandHeart, Sprout];

export function ProcessSteps() {
  const { copy } = useLanguage();

  return (
    <Section id="kak-my-rabotaem" tone="ivory">
      <Reveal>
        <Eyebrow>{copy.process.eyebrow}</Eyebrow>
        <h2 className="max-w-3xl font-serif text-4xl text-ink md:text-6xl">{copy.process.title}</h2>
        <p className="mt-5 max-w-xl text-muted">{copy.process.text}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.process.steps.map((step, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={step.title} delay={index * 0.05}>
              <article className="h-full rounded-[1.6rem] border border-line bg-cream p-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-gold">0{index + 1}</span>
                  <Icon className="h-5 w-5 text-chocolate" strokeWidth={1.4} aria-hidden />
                </div>
                <h3 className="mt-8 font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
