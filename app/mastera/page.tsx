import { MastersPreview } from "@/components/MastersPreview";
import { MastersPageHero } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Мастера",
  "Мастера салона «Бережный уход». Карточки пока заполнены placeholders — без выдуманных имён, опыта и цитат.",
);

export default function MastersPage() {
  return (
    <>
      <MastersPageHero />
      <MastersPreview hideIntro />
    </>
  );
}
