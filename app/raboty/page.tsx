import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Работы",
  "До и после: волосы, наращивание, ресницы и брови. Сейчас на сайте стоят placeholders под реальные работы салона.",
);

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Смотрите результат, а не обещания"
        text="Интерактивное сравнение до/после. Когда появятся реальные фотографии салона, замените файлы и подписи в lib/content.ts."
        image="/images/ba-hair-after.jpg"
      />
      <PortfolioGallery heading="Галерея до и после" />
    </>
  );
}
