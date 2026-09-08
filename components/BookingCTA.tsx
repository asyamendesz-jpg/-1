"use client";

import { Button } from "@/components/Button";
import { Section } from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function BookingCTA({ title, text }: { title?: string; text?: string }) {
  const { copy } = useLanguage();
  return (
    <Section tone="milk">
      <div className="rounded-[2rem] bg-chocolate px-6 py-12 text-ivory sm:px-12">
        <h2 className="max-w-2xl font-serif text-4xl md:text-5xl">{title ?? copy.bookingCta.title}</h2>
        <p className="mt-4 max-w-xl text-ivory/75">{text ?? copy.bookingCta.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/podbor" variant="ghost">
            {copy.ui.pickProcedure}
          </Button>
          <Button href="/zapis" variant="secondary" className="border-ivory/20 text-ivory hover:border-ivory">
            {copy.ui.book}
          </Button>
        </div>
      </div>
    </Section>
  );
}
