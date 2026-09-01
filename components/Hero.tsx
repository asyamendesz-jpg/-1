import { Button } from "@/components/Button";
import { WorkPhoto } from "@/components/WorkPhoto";
import { site } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-16">
        <div className="max-w-xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-gold-deep">Салон бережного ухода</p>
          <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-7xl">{site.name}</h1>
          <p className="mt-6 font-serif text-2xl text-chocolate sm:text-3xl">{site.tagline}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{site.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/podbor">Подобрать процедуру</Button>
            <Button href="/zapis" variant="secondary">
              Записаться
            </Button>
          </div>
          <div className="mt-10 max-w-md border-t border-line pt-6">
            <p className="font-medium text-graphite">Не знаете, какая процедура вам подойдёт?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Ответьте на несколько вопросов — подберём вариант с учётом вашего желаемого результата и исходных данных.
            </p>
            <Button href="/podbor" variant="ghost" className="mt-4 px-0 hover:bg-transparent">
              Подобрать процедуру →
            </Button>
          </div>
        </div>
        <div className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] lg:max-w-none">
          <WorkPhoto
            src="/images/hero-hair.jpg"
            alt="[ФОТО РАБОТЫ] Крупный эмоциональный кадр реальной работы салона — заменить"
            className="h-full w-full"
            sizes="(max-width: 1024px) 90vw, 42vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
