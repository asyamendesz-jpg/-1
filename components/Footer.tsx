"use client";

import { site } from "@/lib/content";
import { hasUsableLink } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";

export function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className="border-t border-line bg-cream pb-24 text-sm text-muted md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:px-12">
        <div>
          <p className="font-serif text-3xl text-ink">{copy.brand}</p>
          <p className="mt-3 max-w-xs leading-relaxed">{copy.hero.tagline}</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold-deep">{copy.footer.navigation}</p>
          <ul className="space-y-2">
            {copy.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold-deep">{copy.footer.contacts}</p>
          <p>{site.contacts.address}</p>
          <p className="mt-2">{site.contacts.phone}</p>
          <p className="mt-2">{site.contacts.hours}</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold-deep">{copy.footer.connect}</p>
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
                {copy.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href="/oferta" className="hover:text-ink">
                {copy.footer.offer}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-line px-5 py-6 text-xs sm:px-8 lg:px-12">
        © {new Date().getFullYear()} {copy.brand}. {site.legal.legalName}
      </div>
    </footer>
  );
}
