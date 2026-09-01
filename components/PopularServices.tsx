import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { categories } from "@/lib/content";

export function PopularServices() {
  const popular = categories.flatMap((category) =>
    category.services.slice(0, 2).map((service) => ({ ...service, category })),
  );

  return (
    <Section id="metody" tone="ivory">
      <Reveal>
        <Eyebrow>Методы</Eyebrow>
        <h2 className="font-serif text-4xl text-ink md:text-6xl">Популярные запросы — простым языком</h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {popular.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <article className="rounded-[1.5rem] border border-line bg-cream p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold-deep">{item.category.navLabel}</p>
              <h3 className="mt-2 font-serif text-2xl text-ink">{item.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.difference}</p>
              <Button href={item.category.quizHref} variant="ghost" className="mt-5 px-0 hover:bg-transparent">
                {item.category.cta} →
              </Button>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
