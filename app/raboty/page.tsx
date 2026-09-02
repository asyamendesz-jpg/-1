import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Работы",
  "До и после: волосы, наращивание, ресницы и брови по работам салона.",
);

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Смотрите результат, а не обещания"
        text="Реальные работы салона. Для кадров, где есть отдельное «до» и «после», можно двигать ползунок."
        image="/images/salon/hair-straight-brunette.jpg"
        imageAlt="Работа салона: гладкие волосы"
      />
      <PortfolioGallery heading="Галерея до и после" />
    </>
  );
}
