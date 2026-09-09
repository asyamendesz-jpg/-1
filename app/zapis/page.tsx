import { BookingWizard } from "@/components/BookingWizard";
import { LoadingHint } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";
import { Suspense } from "react";

export const metadata = buildMetadata(
  "Записаться",
  "Запись в салон «Бережное преображение»: услуга, мастер, дата и время. Готовый путь для подключения YCLIENTS или DIKIDI.",
);

export default function ZapisPage() {
  return (
    <section className="bg-cream px-5 py-12 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-ivory p-5 shadow-[var(--shadow-card)] sm:p-10">
        <Suspense fallback={<LoadingHint kind="booking" />}>
          <BookingWizard />
        </Suspense>
      </div>
    </section>
  );
}
