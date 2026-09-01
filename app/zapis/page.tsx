import { BookingWizard } from "@/components/BookingWizard";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Записаться",
  "Запись в салон «Бережный уход»: услуга, мастер, дата и время. Готовый путь для подключения YCLIENTS или DIKIDI.",
);

export default async function ZapisPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; master?: string }>;
}) {
  const { service, master } = await searchParams;

  return (
    <section className="bg-cream px-5 py-12 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-ivory p-5 shadow-[var(--shadow-card)] sm:p-10">
        <BookingWizard initialService={service} initialMaster={master} />
      </div>
    </section>
  );
}
