import { BeautyQuiz } from "@/components/BeautyQuiz";
import { Button } from "@/components/Button";
import { CrossSell } from "@/components/CrossSell";
import { PageHero } from "@/components/PageHero";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { Section } from "@/components/Reveal";
import { buildMetadata, type ServiceCategory } from "@/lib/content";
import { Suspense } from "react";

export function ServiceDirectionPage({
  category,
  quizMode,
}: {
  category: ServiceCategory;
  quizMode: "hair" | "extensions" | "lashes" | "brows";
}) {
  return (
    <>
      <PageHero
        eyebrow={category.navLabel}
        title={category.title}
        text={category.description}
        image={category.image}
        imageAlt={category.imageAlt}
      />
      <Section tone="ivory">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-4xl text-ink">Как отличаются методы</h2>
          <Button href={category.quizHref}>{category.cta}</Button>
        </div>
        <div className="space-y-8">
          {category.services.map((service) => (
            <article key={service.id} id={service.id} className="scroll-mt-28 rounded-[1.6rem] border border-line p-6 md:p-8">
              <h3 className="font-serif text-3xl text-ink">{service.name}</h3>
              <p className="mt-2 text-graphite">{service.short}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{service.difference}</p>
              <div className="mt-5 flex flex-wrap gap-6 text-xs uppercase tracking-[0.16em] text-gold-deep">
                <span>{service.priceFrom}</span>
                <span>{service.duration}</span>
                {service.consultationRequired ? <span>Нужна консультация</span> : null}
              </div>
              <p className="mt-3 text-sm text-mist">От чего зависит цена: {service.priceDependsOn.join(", ")}.</p>
              {service.extra ? <p className="mt-2 text-sm text-mist">{service.extra}</p> : null}
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
                <Button href={`/zapis?service=${service.id}`} variant="secondary" className="w-fit">
                  Записаться на консультацию
                </Button>
                <CrossSell item={service.crossSell} />
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="cream">
        <h2 className="mb-8 font-serif text-4xl text-ink">{category.id === "extensions" ? "Калькулятор наращивания" : category.id === "lashes" ? "Какой эффект ресниц — ваш?" : category.id === "brows" ? "Подбор формы бровей" : "Что подойдёт именно моим волосам?"}</h2>
        <div className="rounded-[2rem] bg-ivory p-5 sm:p-8">
          <Suspense fallback={<p className="text-muted">Открываем подбор…</p>}>
            <BeautyQuiz initialMode={quizMode} />
          </Suspense>
        </div>
      </Section>
      <PortfolioGallery heading="Работы этого направления" filter={category.id} />
    </>
  );
}

export function directionMetadata(category: ServiceCategory) {
  return buildMetadata(category.title, category.description);
}
