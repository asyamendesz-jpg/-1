import { BeautyQuiz } from "@/components/BeautyQuiz";
import { buildMetadata } from "@/lib/content";
import type { QuizMode } from "@/lib/content";

export const metadata = buildMetadata(
  "Подобрать процедуру",
  "Короткая мини-консультация: от желаемого результата к подходящей процедуре. Телефон — только перед рекомендацией.",
);

const modes: QuizMode[] = ["choice", "hair", "extensions", "lashes", "brows", "complex"];

export default async function PodborPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const initial = modes.includes(mode as QuizMode) ? (mode as QuizMode) : "choice";

  return (
    <section className="bg-ivory px-5 py-12 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-line bg-ivory p-5 shadow-[var(--shadow-card)] sm:p-10">
        <BeautyQuiz initialMode={initial} />
      </div>
    </section>
  );
}
