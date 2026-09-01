"use client";

import { faq } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";

export function FAQ({ items = faq, title = "Вопросы, которые обычно задают до записи" }: { items?: typeof faq; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="cream">
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="max-w-3xl font-serif text-4xl text-ink md:text-6xl">{title}</h2>
      </Reveal>
      <div className="mt-10 divide-y divide-line rounded-[1.6rem] border border-line bg-ivory">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="font-medium text-ink">{item.q}</span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-gold transition", isOpen && "rotate-180")} />
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
