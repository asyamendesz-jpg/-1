"use client";

import { BeforeAfterPair, BeforeAfterPhoto, BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { CrossSell } from "@/components/CrossSell";
import { getMasterForDirection, getService } from "@/lib/content";
import type { QuizResult as QuizResultType } from "@/lib/quiz";
import { isPlaceholder } from "@/lib/utils";
import { translatedMaster, translatedPortfolio, translateCategory } from "@/lib/i18n/resolve";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function QuizResult({ result, name }: { result: QuizResultType; name: string }) {
  const { copy } = useLanguage();
  const found = getService(result.serviceId);
  const masterSource = getMasterForDirection(result.direction);
  const master = translatedMaster(copy, masterSource.id) ?? masterSource;
  const works = translatedPortfolio(copy).filter((item) => result.portfolioIds.includes(item.id));
  const translatedFound = found
    ? {
        ...found,
        service: translateCategory(copy, found.category).services.find((item) => item.id === found.service.id) ?? found.service,
      }
    : null;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">{copy.quiz.recommendationEyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">{result.headline}</h2>
        <p className="mt-4 max-w-2xl text-muted">
          {name ? copy.quiz.thanks.replace("{name}", name) : null}
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
          <p className="text-sm font-medium text-ink">{copy.quiz.moreToDiscuss}</p>
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
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{copy.quiz.cost}</p>
          <p className="mt-2 text-graphite">{translatedFound?.service.priceFrom ?? copy.ui.priceFromPlaceholder}</p>
        </div>
        <div className="rounded-[1.2rem] bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{copy.quiz.duration}</p>
          <p className="mt-2 text-graphite">{translatedFound?.service.duration ?? copy.ui.durationPlaceholder}</p>
        </div>
        <div className="rounded-[1.2rem] bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{copy.quiz.master}</p>
          <p className="mt-2 text-graphite">{master.name}</p>
        </div>
      </div>

      {works.length ? (
        <div>
          <p className="mb-4 font-serif text-2xl text-ink">{copy.ui.similarWork}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {works.map((item) =>
              item.pair ? (
                <BeforeAfterPair
                  key={item.id}
                  before={item.before}
                  after={item.after}
                  beforeAlt={`${item.caption} — ${copy.ui.before}`}
                  afterAlt={`${item.caption} — ${copy.ui.after}`}
                  className="rounded-[1.3rem]"
                />
              ) : item.compare === false ? (
                <BeforeAfterPhoto key={item.id} src={item.after} alt={item.caption} className="rounded-[1.3rem]" />
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
        <Button href={`/zapis?service=${result.serviceId}&master=${result.masterId}`}>{copy.ui.bookConsultation}</Button>
        {result.direction === "extensions" ? (
          <Button href="/zapis" variant="secondary">
            {copy.ui.discussWithMaster}
          </Button>
        ) : null}
      </div>

      {translatedFound ? <CrossSell item={translatedFound.service.crossSell} /> : null}

      {isPlaceholder(master.name) ? <p className="text-xs text-mist">{copy.quiz.placeholderNote}</p> : null}
    </div>
  );
}
