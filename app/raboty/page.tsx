import { PortfolioGallery } from "@/components/PortfolioGallery";
import { WorksPageHero } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Работы",
  "До и после: волосы, наращивание, ресницы и брови по работам салона.",
);

export default function WorksPage() {
  return (
    <>
      <WorksPageHero />
      <PortfolioGallery />
    </>
  );
}
