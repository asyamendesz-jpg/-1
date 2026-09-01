import { Contacts } from "@/components/Contacts";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "Контакты",
  "Адрес, телефон, мессенджеры, часы работы и карта салона «Бережный уход». Фактические данные заполняются в конфигурации.",
);

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Напишите, позвоните или приезжайте"
        text="Все поля ниже — редактируемые placeholders, пока салон не укажет реальные данные."
      />
      <Contacts />
    </>
  );
}
