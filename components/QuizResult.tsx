import { BeforeAfterPair, BeforeAfterPhoto, BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { CrossSell } from "@/components/CrossSell";
import { getMasterForDirection, getService, portfolio } from "@/lib/content";
import type { QuizResult as QuizResultType } from "@/lib/quiz";
import { isPlaceholder } from "@/lib/utils";

export function QuizResult({ result, name }: { result: QuizResultType; name: string }) {
  const found = getService(result.serviceId);
  const master = getMasterForDirection(result.direction);
  const works = portfolio.filter((item) => result.portfolioIds.includes(item.id));

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Персональная рекомендация</p>
        <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">{result.headline}</h2>
        <p className="mt-4 max-w-2xl text-muted">
          {name ? `${name}, спасибо за ответы. ` : null}
          {result.summary}
        </p>
      </div>

      <ul className="space-y-3">
        {result.details.map((item) => (
          <li key={item} className="rounded-[1.2rem] bg-cream px-5 py-4 text-sm leading-relaxed text-graphite">
            {item}
          </li>
        ))}
      </ul>

      {result.alternatives?.length ? (
        <div>
          <p className="text-sm font-medium text-ink">Ещё можно обсудить</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {result.alternatives.map((item) => (
              <div key={item.name} className="rounded-[1.2rem] border border-line p-4">
                <p className="font-serif text-xl text-ink">{item.name}</p>
                <p className="mt-2 text-sm text-muted">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.2rem] bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Стоимость</p>
          <p className="mt-2 text-graphite">{result.priceFrom}</p>
        </div>
        <div className="rounded-[1.2rem] bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Длительность</p>
          <p className="mt-2 text-graphite">{result.duration}</p>
        </div>
        <div className="rounded-[1.2rem] bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Мастер</p>
          <p className="mt-2 text-graphite">{master.name}</p>
        </div>
      </div>

      {works.length ? (
        <div>
          <p className="mb-4 font-serif text-2xl text-ink">Похожие работы</p>
          <div className="grid gap-4 md:grid-cols-2">
            {works.map((item) =>
              item.pair ? (
                <BeforeAfterPair
                  key={item.id}
                  before={item.before}
                  after={item.after}
                  beforeAlt={`${item.caption} — до`}
                  afterAlt={`${item.caption} — после`}
                  className="rounded-[1.3rem]"
                />
              ) : item.compare === false ? (
                <BeforeAfterPhoto
                  key={item.id}
                  src={item.after}
                  alt={item.caption}
                  className="rounded-[1.3rem]"
                />
              ) : (
                <BeforeAfterSlider
                  key={item.id}
                  before={item.before}
                  after={item.after}
                  beforeAlt={item.caption}
                  afterAlt={item.caption}
                  objectPosition={item.objectPosition}
                  afterObjectPosition={item.afterObjectPosition}
                  afterScale={item.afterScale}
                  className="rounded-[1.3rem]"
                />
              ),
            )}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={`/zapis?service=${result.serviceId}&master=${result.masterId}`}>
          Записаться на консультацию
        </Button>
        {result.direction === "extensions" ? (
          <Button href="/zapis" variant="secondary">
            Обсудить результат с мастером
          </Button>
        ) : null}
      </div>

      {found ? <CrossSell item={found.service.crossSell} /> : null}

      {isPlaceholder(master.name) ? (
        <p className="text-xs text-mist">
          Имя мастера, цена и длительность появятся после заполнения данных в `lib/content.ts`. Рекомендация — ориентир, а не диагноз.
        </p>
      ) : null}
    </div>
  );
}
