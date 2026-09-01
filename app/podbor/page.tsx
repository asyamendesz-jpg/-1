import { BeautyQuiz } from "@/components/BeautyQuiz";
import { buildMetadata } from "@/lib/content";
import { Suspense } from "react";

export const metadata = buildMetadata(
  "Подобрать процедуру",
  "Короткая мини-консультация: от желаемого результата к подходящей процедуре. Телефон — только перед рекомендацией.",
);

export default function PodborPage() {
  return (
    <section className="bg-ivory px-5 py-12 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-line bg-ivory p-5 shadow-[var(--shadow-card)] sm:p-10">
        <Suspense fallback={<p className="text-muted">Открываем подбор…</p>}>
          <BeautyQuiz />
        </Suspense>
      </div>
    </section>
  );
}
