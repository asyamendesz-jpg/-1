import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <Section id="otzyvy" tone="cream">
      <Reveal>
        <Eyebrow>Отзывы</Eyebrow>
        <h2 className="font-serif text-4xl text-ink md:text-6xl">Истории, а не «всё понравилось»</h2>
        <p className="mt-4 max-w-xl text-muted">
          Пока нет реальных отзывов, здесь стоят карточки-шаблоны. Не публикуйте их как настоящие.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <article className="h-full overflow-hidden rounded-[1.6rem] bg-ivory">
              <WorkPhoto src={item.photo} alt="[ФОТО КЛИЕНТА / РАБОТЫ]" className="aspect-[4/3] w-full" />
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">{item.procedure}</p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{item.name}</h3>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="text-mist">Исходная задача</dt>
                    <dd className="text-graphite">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-mist">Результат</dt>
                    <dd className="text-graphite">{item.result}</dd>
                  </div>
                  <div>
                    <dt className="text-mist">Впечатление</dt>
                    <dd className="text-graphite">{item.impression}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
