import { MastersPreview } from "@/components/MastersPreview";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Мастера",
  "Мастера салона «Бережный уход». Карточки пока заполнены placeholders — без выдуманных имён, опыта и цитат.",
);

export default function MastersPage() {
  return (
    <>
      <PageHero
        eyebrow="Команда"
        title="Сначала человек, потом процедура"
        text="У каждого мастера будет своя специализация, принцип работы и живые примеры. Сейчас карточки ждут реальных данных."
        image="/images/salon/portrait-brows.jpg"
        imageAlt="Работа салона"
      />
      <MastersPreview hideIntro />
    </>
  );
}
