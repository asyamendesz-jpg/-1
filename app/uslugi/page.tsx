import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCategories";
import { Section } from "@/components/Reveal";
import { buildMetadata, categories } from "@/lib/content";

export const metadata = buildMetadata(
  "Услуги",
  "Выпрямление и наращивание волос, ресницы и брови — с понятным объяснением различий и подбором от желания клиента.",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Не каталог процедур, а путь от желания"
        text="Можно листать направления. Можно сразу ответить на несколько вопросов. Вам не нужно заранее знать, чем кератин отличается от нанопластики."
        image="/images/salon/hair-straight-brunette.jpg"
        imageAlt="Работа салона: гладкие волосы"
      />
      {categories.map((category) => (
        <Section key={category.id} tone={category.id === "extensions" || category.id === "brows" ? "cream" : "ivory"}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-4xl text-ink">{category.title}</h2>
              <p className="mt-3 max-w-xl text-muted">{category.description}</p>
            </div>
            <Button href={category.quizHref}>{category.cta}</Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {category.services.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                short={service.short}
                difference={service.difference}
                priceFrom={service.priceFrom}
                duration={service.duration}
                href={`${category.href}#${service.id}`}
                cta="Подробнее"
              />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
