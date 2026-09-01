import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { processSteps } from "@/lib/content";
import { Search, FlaskConical, HandHeart, Sprout } from "lucide-react";

const icons = [Search, FlaskConical, HandHeart, Sprout];

export function ProcessSteps() {
  return (
    <Section id="kak-my-rabotaem" tone="ivory">
      <Reveal>
        <Eyebrow>Как мы работаем</Eyebrow>
        <h2 className="max-w-3xl font-serif text-4xl text-ink md:text-6xl">
          Сначала понимаем, что вам подходит
        </h2>
        <p className="mt-5 max-w-xl text-muted">
          Процедура начинается не с состава, а с диагностики. Так меньше риска выбрать метод «потому что красиво называется».
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={step.num} delay={index * 0.05}>
              <article className="h-full rounded-[1.6rem] border border-line bg-cream p-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-gold">{step.num}</span>
                  <Icon className="h-5 w-5 text-chocolate" strokeWidth={1.4} aria-hidden />
                </div>
                <h3 className="mt-8 font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
