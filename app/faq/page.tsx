import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "FAQ",
  "Спокойные ответы: про выпрямление, окрашивание, наращивание, коррекцию и уход после процедуры.",
);

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Вопросы"
        title="Сначала понятно, потом запись"
        text="Если для точного ответа нужны составы или протокол салона, в тексте оставлен редактируемый placeholder."
      />
      <FAQ />
    </>
  );
}
