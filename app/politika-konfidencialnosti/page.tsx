import { LegalDocument } from "@/components/LegalDocument";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Политика конфиденциальности",
  "Политика конфиденциальности салона «Бережное преображение».",
);

export default function PrivacyPage() {
  return <LegalDocument kind="privacy" />;
}
