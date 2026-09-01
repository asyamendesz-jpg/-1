import { BookingCTA } from "@/components/BookingCTA";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";
import { buildMetadata, site } from "@/lib/content";

export const metadata = buildMetadata(
  "О салоне",
  "Философия салона «Бережный уход»: красота, которая остаётся вашей. Бережный подход, индивидуальный подбор, без давления.",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О салоне"
        title={site.tagline}
        text={site.philosophy}
        image="/images/salon-atmosphere.jpg"
        imageAlt="[ФОТО АТМОСФЕРЫ САЛОНА]"
      />
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl text-ink">Два спокойных сценария</h2>
            <div className="mt-8 grid gap-4">
              <article className="rounded-[1.4rem] bg-cream p-6">
                <h3 className="font-serif text-2xl">Хочу натурально</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Подчеркнуть то, что уже есть: более ухоженные волосы, ясный взгляд, аккуратные брови. Без чужого образа.
                </p>
              </article>
              <article className="rounded-[1.4rem] bg-cream p-6">
                <h3 className="font-serif text-2xl">Хочу новый образ</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Если хочется смелее — помогаем собрать более яркий, но всё равно ваш характер. Не «переделать», а вырастить образ из исходных данных.
                </p>
              </article>
            </div>
          </div>
          <div className="group overflow-hidden rounded-[1.8rem]">
            <WorkPhoto
              src="/images/cat-complex.jpg"
              alt="[ФОТО РАБОТЫ] Натуральный или более яркий образ — заменить"
              className="aspect-[4/5] w-full"
            />
          </div>
        </div>
      </Section>
      <ProcessSteps />
      <BookingCTA title="Приходите без готового названия процедуры" />
    </>
  );
}
