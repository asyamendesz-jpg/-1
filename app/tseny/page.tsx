import { Pricing } from "@/components/Pricing";
import { PricesPageHero } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Цены",
  "Стоимость услуг «от»: почему так указано, от чего зависит итог и когда нужна консультация.",
);

export default function PricesPage() {
  return (
    <>
      <PricesPageHero />
      <Pricing />
    </>
  );
}
