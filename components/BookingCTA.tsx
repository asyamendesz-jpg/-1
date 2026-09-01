import { Button } from "@/components/Button";
import { Section } from "@/components/Reveal";

export function BookingCTA({
  title = "Готовы подобрать процедуру спокойно, без давления?",
  text = "Можно начать с короткого подбора или сразу записаться на консультацию. Мастер сверит желаемый результат с исходными данными.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section tone="milk">
      <div className="rounded-[2rem] bg-chocolate px-6 py-12 text-ivory sm:px-12">
        <h2 className="max-w-2xl font-serif text-4xl md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-xl text-ivory/75">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/podbor" variant="ghost">
            Подобрать процедуру
          </Button>
          <Button href="/zapis" variant="secondary" className="border-ivory/20 text-ivory hover:border-ivory">
            Записаться
          </Button>
        </div>
      </div>
    </Section>
  );
}
