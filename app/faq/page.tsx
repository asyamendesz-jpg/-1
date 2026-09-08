import { FAQ } from "@/components/FAQ";
import { FaqPageHero } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "FAQ",
  "Спокойные ответы: про выпрямление, окрашивание, наращивание, коррекцию и уход после процедуры.",
);

export default function FaqPage() {
  return (
    <>
      <FaqPageHero />
      <FAQ />
    </>
  );
}
