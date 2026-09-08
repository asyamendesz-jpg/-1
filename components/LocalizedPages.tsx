"use client";

import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCategories";
import { WorkPhoto } from "@/components/WorkPhoto";
import { useTranslatedCategories } from "@/lib/i18n/resolve";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { BookingCTA } from "@/components/BookingCTA";
import { ProcessSteps } from "@/components/ProcessSteps";

export function ServicesPageContent() {
  const { copy } = useLanguage();
  const categories = useTranslatedCategories();
  const page = copy.pages.services;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} text={page.text} image="/images/salon/hair-straight-brunette.jpg" imageAlt={page.imageAlt} />
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
                cta={copy.ui.more}
              />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

export function AboutPageContent() {
  const { copy } = useLanguage();
  const page = copy.pages.about;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        text={page.text}
        image="/images/salon/makeup-glitter-eyes.jpg"
        imageAlt={page.imageAlt}
      />
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl text-ink">{page.scenariosTitle}</h2>
            <div className="mt-8 grid gap-4">
              <article className="rounded-[1.4rem] bg-cream p-6">
                <h3 className="font-serif text-2xl">{page.naturalTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{page.naturalText}</p>
              </article>
              <article className="rounded-[1.4rem] bg-cream p-6">
                <h3 className="font-serif text-2xl">{page.newLookTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{page.newLookText}</p>
              </article>
            </div>
          </div>
          <div className="group overflow-hidden rounded-[1.8rem]">
            <WorkPhoto src="/images/salon/makeup-glitter-eyes.jpg" alt={page.photoAlt} className="aspect-[4/5] w-full" />
          </div>
        </div>
      </Section>
      <ProcessSteps />
      <BookingCTA title={copy.bookingCta.aboutTitle} />
    </>
  );
}

export function WorksPageHero() {
  const { copy } = useLanguage();
  const page = copy.pages.works;
  return (
    <PageHero
      eyebrow={page.eyebrow}
      title={page.title}
      text={page.text}
      image="/images/salon/hair-straight-brunette.jpg"
      imageAlt={page.imageAlt}
    />
  );
}

export function MastersPageHero() {
  const { copy } = useLanguage();
  const page = copy.pages.masters;
  return (
    <PageHero
      eyebrow={page.eyebrow}
      title={page.title}
      text={page.text}
      image="/images/salon/portrait-brows.jpg"
      imageAlt={page.imageAlt}
    />
  );
}

export function PricesPageHero() {
  const { copy } = useLanguage();
  const page = copy.pages.prices;
  return <PageHero eyebrow={page.eyebrow} title={page.title} text={page.text} />;
}

export function FaqPageHero() {
  const { copy } = useLanguage();
  const page = copy.pages.faq;
  return <PageHero eyebrow={page.eyebrow} title={page.title} text={page.text} />;
}

export function ContactsPageHero() {
  const { copy } = useLanguage();
  const page = copy.pages.contacts;
  return <PageHero eyebrow={page.eyebrow} title={page.title} text={page.text} />;
}

export function LoadingHint({ kind }: { kind: "quiz" | "booking" }) {
  const { copy } = useLanguage();
  return <p className="text-muted">{kind === "quiz" ? copy.ui.loadingQuiz : copy.ui.loadingBooking}</p>;
}
