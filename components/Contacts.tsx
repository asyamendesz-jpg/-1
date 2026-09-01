import { Button } from "@/components/Button";
import { Eyebrow, Reveal, Section } from "@/components/Reveal";
import { site } from "@/lib/content";
import { hasUsableLink } from "@/lib/utils";

export function MapPlaceholder() {
  if (hasUsableLink(site.contacts.mapEmbedUrl)) {
    return (
      <iframe
        title="Карта салона"
        src={site.contacts.mapEmbedUrl}
        className="h-full min-h-[320px] w-full rounded-[1.6rem] border-0"
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex min-h-[320px] items-end rounded-[1.6rem] bg-[linear-gradient(160deg,#e8d9c8,#f3ebe0_45%,#d4c4b0)] p-6">
      <div className="rounded-2xl bg-ivory/90 p-4 text-sm text-muted backdrop-blur-sm">
        <p className="font-medium text-ink">Карта появится здесь</p>
        <p className="mt-1">{site.contacts.address}</p>
        <p className="mt-2 text-xs">Вставьте embed-ссылку в `site.contacts.mapEmbedUrl`.</p>
      </div>
    </div>
  );
}

export function Contacts() {
  const routeHref = hasUsableLink(site.contacts.routeUrl)
    ? site.contacts.routeUrl
    : `https://maps.google.com/?q=${encodeURIComponent(site.contacts.address)}`;

  return (
    <Section id="kontakty" tone="ivory">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Контакты</Eyebrow>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">Как нас найти</h2>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-mist">Адрес</dt>
              <dd className="mt-1 text-graphite">{site.contacts.address}</dd>
            </div>
            <div>
              <dt className="text-mist">Телефон</dt>
              <dd className="mt-1">{site.contacts.phone}</dd>
            </div>
            <div>
              <dt className="text-mist">Мессенджеры</dt>
              <dd className="mt-1">
                WhatsApp: {site.contacts.whatsapp}
                <br />
                Telegram: {site.contacts.telegram}
              </dd>
            </div>
            <div>
              <dt className="text-mist">Социальные сети</dt>
              <dd className="mt-1">
                Instagram: {site.contacts.instagram}
                <br />
                VK: {site.contacts.vk}
              </dd>
            </div>
            <div>
              <dt className="text-mist">Часы работы</dt>
              <dd className="mt-1">{site.contacts.hours}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/zapis">Записаться</Button>
            <Button href={routeHref} variant="secondary">
              Построить маршрут
            </Button>
          </div>
        </Reveal>
        <Reveal>
          <MapPlaceholder />
        </Reveal>
      </div>
    </Section>
  );
}
