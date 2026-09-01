import { nav, site } from "@/lib/content";
import { hasUsableLink } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream pb-24 text-sm text-muted md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:px-12">
        <div>
          <p className="font-serif text-3xl text-ink">{site.name}</p>
          <p className="mt-3 max-w-xs leading-relaxed">{site.tagline}</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold-deep">Навигация</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold-deep">Контакты</p>
          <p>{site.contacts.address}</p>
          <p className="mt-2">{site.contacts.phone}</p>
          <p className="mt-2">{site.contacts.hours}</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold-deep">Связь</p>
          <ul className="space-y-2">
            <li>
              {hasUsableLink(site.contacts.whatsappHref) ? (
                <a href={site.contacts.whatsappHref}>WhatsApp</a>
              ) : (
                <span>WhatsApp: {site.contacts.whatsapp}</span>
              )}
            </li>
            <li>
              {hasUsableLink(site.contacts.telegramHref) ? (
                <a href={site.contacts.telegramHref}>Telegram</a>
              ) : (
                <span>Telegram: {site.contacts.telegram}</span>
              )}
            </li>
            <li>
              <Link href="/politika-konfidencialnosti" className="hover:text-ink">
                Политика конфиденциальности
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-line px-5 py-6 text-xs sm:px-8 lg:px-12">
        © {new Date().getFullYear()} {site.name}. {site.legal.legalName}
      </div>
    </footer>
  );
}
