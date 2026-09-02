import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { WorkPhoto } from "@/components/WorkPhoto";

export function BeautyTransformation() {
  return (
    <Section id="preobrazhenie" tone="graphite">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Бережное преображение</Eyebrow>
          <h2 className="font-serif text-4xl md:text-6xl">Персональный подбор процедур для волос + ресниц + бровей.</h2>
          <p className="mt-5 max-w-lg text-ivory/75">
            Это не пакет со скидкой и не «всё сразу». Это спокойный комплекс, если хочется гармоничный образ, а не набор несвязанных процедур.
          </p>
          <Button href="/podbor?mode=complex" variant="ghost" className="mt-8">
            Собрать мой образ
          </Button>
        </Reveal>
        <Reveal>
          <div className="group overflow-hidden rounded-[2rem]">
            <WorkPhoto
              src="/images/salon/makeup-glitter-eyes.jpg"
              alt="Работа салона: гармоничный образ"
              className="aspect-[4/3] w-full"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
