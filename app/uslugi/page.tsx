import { ServicesPageContent } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Услуги",
  "Выпрямление и наращивание волос, ресницы и брови — с понятным объяснением различий и подбором от желания клиента.",
);

export default function ServicesPage() {
  return <ServicesPageContent />;
}
