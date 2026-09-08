"use client";

import { Button } from "@/components/Button";
import { WorkPhoto } from "@/components/WorkPhoto";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Hero() {
  const { copy } = useLanguage();
  const hero = copy.hero;

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-16">
        <div className="max-w-xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-gold-deep">{hero.eyebrow}</p>
          <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-7xl">{hero.title}</h1>
          <p className="mt-6 font-serif text-2xl text-chocolate sm:text-3xl">{hero.tagline}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{hero.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/podbor">{hero.pickProcedure}</Button>
            <Button href="/zapis" variant="secondary">
              {hero.book}
            </Button>
          </div>
          <div className="mt-10 max-w-md border-t border-line pt-6">
            <p className="font-medium text-graphite">{hero.unsureTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{hero.unsureText}</p>
            <Button href="/podbor" variant="ghost" className="mt-4 px-0 hover:bg-transparent">
              {hero.pickProcedureArrow}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-9 lg:max-w-none lg:pb-11">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
            <WorkPhoto
              src="/images/ba-ext-after.jpg"
              alt={`${hero.photoAlt} — ${copy.ui.after}`}
              className="h-full w-full"
              sizes="(max-width: 1024px) 90vw, 42vw"
              priority
              showBadge={false}
            />
            <span className="pointer-events-none absolute right-5 top-5 text-[10px] uppercase tracking-[0.28em] text-gold-deep/80">
              {copy.ui.after}
            </span>
          </div>

          <div className="absolute bottom-0 left-3 w-[40%] sm:left-4 sm:w-[36%] lg:left-5 lg:w-[38%]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] shadow-[var(--shadow-card)] ring-[6px] ring-cream sm:aspect-[4/5] sm:rounded-[1.5rem]">
              <WorkPhoto
                src="/images/ba-ext-before.jpg"
                alt={`${hero.photoAlt} — ${copy.ui.before}`}
                className="h-full w-full"
                sizes="(max-width: 1024px) 40vw, 18vw"
                priority
                showBadge={false}
              />
              <span className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-[0.28em] text-gold-deep/80">
                {copy.ui.before}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
