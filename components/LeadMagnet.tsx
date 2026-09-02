import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";

export function LeadMagnet() {
  return (
    <Section id="beauty-podbor" tone="milk">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <Eyebrow>Персональный Beauty-подбор</Eyebrow>
          <h2 className="font-serif text-4xl text-ink md:text-6xl">Что изменить, а что оставить?</h2>
          <p className="mt-5 max-w-xl text-muted">
            Бесплатный персональный мини-разбор волос, ресниц и бровей и план из 2–3 подходящих процедур. Фото можно приложить, но это необязательно.
          </p>
          <p className="mt-4 max-w-xl text-sm text-mist">
            Телефон понадобится только перед рекомендацией — сначала вы отвечаете на вопросы и получаете пользу.
          </p>
          <Button href="/podbor?mode=complex" className="mt-8">
            Получить Beauty-подбор
          </Button>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="group overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
            <WorkPhoto
              src="/images/salon/makeup-glitter-eyes.jpg"
              alt="Работа салона: макияж и взгляд"
              className="aspect-[4/5] w-full md:aspect-[4/3]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
