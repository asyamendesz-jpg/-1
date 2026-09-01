"use client";

import { Button } from "@/components/Button";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-line bg-ivory/92 backdrop-blur-md"
          : "border-transparent bg-ivory/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <Link href="/" className="min-w-0">
          <span className="font-serif text-[22px] leading-none tracking-tight text-ink sm:text-[26px]">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основное меню">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] tracking-[0.02em] text-muted transition-colors hover:text-ink",
                pathname === item.href && "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/zapis" className="hidden sm:inline-flex px-5 py-2.5" variant="primary">
            Записаться
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-graphite lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-ivory lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Мобильное меню">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-base text-graphite hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/zapis" full className="mt-3">
              Записаться
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
