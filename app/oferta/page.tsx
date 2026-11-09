import { LegalDocument } from "@/components/LegalDocument";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata("Публичная оферта", "Публичная оферта салона «Бережное преображение».");

export default function OfferPage() {
  return <LegalDocument kind="offer" />;
}
