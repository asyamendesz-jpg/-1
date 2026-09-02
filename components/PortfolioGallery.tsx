"use client";

import { BeforeAfterPair, BeforeAfterPhoto, BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { portfolio } from "@/lib/content";
import type { DirectionId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const filters: { id: "all" | DirectionId; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "hair", label: "Волосы" },
  { id: "extensions", label: "Наращивание" },
  { id: "lashes", label: "Ресницы" },
  { id: "brows", label: "Брови" },
];

export function PortfolioGallery({
  heading = "До и после",
  limit,
  filter,
}: {
  heading?: string;
  limit?: number;
  filter?: DirectionId;
}) {
  const [active, setActive] = useState<"all" | DirectionId>(filter ?? "all");

  const items = useMemo(() => {
    const list = portfolio.filter((item) => (active === "all" ? true : item.category === active));
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <Section id="raboty" tone="cream">
      <Reveal>
        <Eyebrow>Реальные работы</Eyebrow>
        <h2 className="font-serif text-4xl text-ink md:text-6xl">{heading}</h2>
        <p className="mt-4 max-w-xl text-muted">
          Работы салона. Для сравнения «до/после» двигайте ползунок.
        </p>
      </Reveal>
      {!filter ? (
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Фильтр работ">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition",
                active === item.id ? "bg-graphite text-ivory" : "bg-ivory text-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <Reveal key={item.id}>
            <figure className="overflow-hidden rounded-[1.6rem] bg-ivory shadow-[var(--shadow-card)]">
              {item.pair ? (
                <BeforeAfterPair
                  before={item.before}
                  after={item.after}
                  beforeAlt={`${item.caption} — до`}
                  afterAlt={`${item.caption} — после`}
                />
              ) : item.compare === false ? (
                <BeforeAfterPhoto src={item.after} alt={item.caption} />
              ) : (
                <BeforeAfterSlider
                  before={item.before}
                  after={item.after}
                  beforeAlt={`${item.caption} — до`}
                  afterAlt={`${item.caption} — после`}
                />
              )}
              <figcaption className="p-5">
                <p className="font-serif text-2xl text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
