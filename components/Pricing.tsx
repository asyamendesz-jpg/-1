"use client";

import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { useTranslatedCategories } from "@/lib/i18n/resolve";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { isPlaceholder } from "@/lib/utils";
import { site } from "@/lib/content";

export function Pricing({ compact = false }: { compact?: boolean }) {
  const { copy } = useLanguage();
  const categories = useTranslatedCategories();

  return (
    <Section id="ceny" tone="ivory">
      <Reveal>
        <Eyebrow>{copy.pricing.eyebrow}</Eyebrow>
        <h2 className="font-serif text-4xl text-ink md:text-6xl">{copy.pricing.title}</h2>
        <p className="mt-5 max-w-2xl text-muted">{copy.pricing.text}</p>
        {!isPlaceholder(site.installment) ? (
          <p className="mt-3 text-sm text-chocolate">{site.installment}</p>
        ) : (
          <p className="mt-3 text-sm text-mist">{copy.pricing.installment}</p>
        )}
      </Reveal>
      <div className="mt-12 space-y-8">
        {(compact ? categories.slice(0, 2) : categories).map((category) => (
          <Reveal key={category.id}>
            <div className="overflow-hidden rounded-[1.6rem] border border-line">
              <div className="flex items-end justify-between bg-cream px-5 py-4 sm:px-6">
                <h3 className="font-serif text-2xl text-ink">{category.title}</h3>
                <Button href={category.quizHref} variant="ghost" className="hidden sm:inline-flex">
                  {category.cta}
                </Button>
              </div>
              <div className="divide-y divide-line bg-ivory">
                {category.services.map((service) => (
                  <div key={service.id} className="grid gap-3 px-5 py-5 sm:grid-cols-[1.2fr_0.5fr_0.5fr] sm:px-6">
                    <div>
                      <p className="font-medium text-ink">{service.name}</p>
                      <p className="mt-1 text-sm text-muted">
                        {copy.ui.priceDepends}: {service.priceDependsOn.join(", ")}.
                        {service.consultationRequired ? ` ${copy.ui.consultationNeeded}.` : ""}
                      </p>
                      {service.extra ? <p className="mt-1 text-xs text-mist">{service.extra}</p> : null}
                    </div>
                    <p className="text-sm text-gold-deep">{service.priceFrom}</p>
                    <p className="text-sm text-muted">{service.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {compact ? (
        <div className="mt-6">
          <Button href="/tseny" variant="ghost" className="px-0 hover:bg-transparent">
            {copy.ui.seeAllPrices}
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
