import { Contacts } from "@/components/Contacts";
import { ContactsPageHero } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Контакты",
  "Адрес, телефон, мессенджеры, часы работы и карта салона «Бережный уход». Фактические данные заполняются в конфигурации.",
);

export default function ContactsPage() {
  return (
    <>
      <ContactsPageHero />
      <Contacts />
    </>
  );
}
