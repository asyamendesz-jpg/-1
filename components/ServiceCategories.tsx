import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";
import { categories } from "@/lib/content";
import Link from "next/link";

export function ServiceCategories() {
  return (
    <Section id="napravleniya" tone="cream">
      <Reveal>
        <Eyebrow>Направления</Eyebrow>
        <h2 className="font-serif text-4xl text-ink md:text-6xl">Четыре бережных фокуса</h2>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {categories.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <article className="group grid overflow-hidden rounded-[1.8rem] bg-ivory shadow-[var(--shadow-card)] md:grid-cols-[0.9fr_1.1fr]">
              <WorkPhoto
                src={item.image}
                alt={item.imageAlt}
                className="aspect-[4/5] min-h-full w-full md:aspect-auto"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">0{index + 1}</p>
                  <h3 className="mt-3 font-serif text-3xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  <ul className="mt-5 space-y-1.5 text-sm text-graphite">
                    {item.services.slice(0, 4).map((service) => (
                      <li key={service.id}>— {service.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={item.quizHref}>{item.cta}</Button>
                  <Link href={item.href} className="self-center text-sm text-muted hover:text-ink">
                    Смотреть направление
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ServiceCard({
  name,
  short,
  difference,
  priceFrom,
  duration,
  href,
  cta,
}: {
  name: string;
  short: string;
  difference: string;
  priceFrom: string;
  duration: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-line bg-ivory p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
      <h3 className="font-serif text-2xl text-ink">{name}</h3>
      <p className="mt-2 text-sm text-graphite">{short}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{difference}</p>
      <div className="mt-5 flex gap-6 text-xs uppercase tracking-[0.16em] text-gold-deep">
        <span>{priceFrom}</span>
        <span>{duration}</span>
      </div>
      <Button href={href} variant="secondary" className="mt-6">
        {cta}
      </Button>
    </article>
  );
}
