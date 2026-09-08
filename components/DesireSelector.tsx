"use client";

import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";
import { useTranslatedCategories } from "@/lib/i18n/resolve";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";

export function DesireSelector() {
  const { copy } = useLanguage();
  const categories = useTranslatedCategories();

  const extra = {
    id: "complex",
    desire: copy.desire.complexDesire,
    desireLead: copy.desire.complexLead,
    image: "/images/salon/hair-waves-blonde.jpg",
    imageAlt: copy.desire.complexAlt,
    quizHref: "/podbor?mode=complex",
  };

  const items = [
    ...categories.map((item) => ({
      id: item.id,
      desire: item.desire,
      desireLead: item.desireLead,
      image: item.image,
      imageAlt: item.imageAlt,
      quizHref: item.quizHref,
    })),
    extra,
  ];

  return (
    <Section id="zhelaniya" tone="ivory">
      <Reveal>
        <Eyebrow>{copy.desire.eyebrow}</Eyebrow>
        <h2 className="max-w-3xl font-serif text-4xl leading-tight text-ink md:text-6xl">{copy.desire.title}</h2>
        <p className="mt-5 max-w-xl text-muted">{copy.desire.text}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.06} className={`group ${index >= 3 ? "lg:col-span-3" : "lg:col-span-2"}`}>
            <Link href={item.quizHref} className="relative block overflow-hidden rounded-[1.6rem] bg-powder shadow-[var(--shadow-card)]">
              <WorkPhoto src={item.image} alt={item.imageAlt} className="aspect-[4/5] w-full" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                <h3 className="font-serif text-3xl leading-tight">{item.desire}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ivory/80">{item.desireLead}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/podbor" variant="secondary">
          {copy.ui.pickProcedure}
        </Button>
      </div>
    </Section>
  );
}
