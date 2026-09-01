import { PageHero } from "@/components/PageHero";
import { Pricing } from "@/components/Pricing";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Цены",
  "Стоимость услуг «от»: почему так указано, от чего зависит итог и когда нужна консультация.",
);

export default function PricesPage() {
  return (
    <>
      <PageHero
        eyebrow="Стоимость"
        title="Прозрачные условия без одной цифры «для всех»"
        text="Цена зависит от исходных данных. Мы показываем старт и объясняем нюансы, а точную сумму мастер называет после диагностики."
      />
      <Pricing />
    </>
  );
}
