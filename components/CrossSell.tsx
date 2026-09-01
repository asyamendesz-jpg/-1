import { Button } from "@/components/Button";
import type { ServiceItem } from "@/lib/content";

export function CrossSell({ item }: { item?: ServiceItem["crossSell"] }) {
  if (!item) return null;

  return (
    <aside className="rounded-[1.4rem] border border-line bg-cream p-5">
      <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">Логичное дополнение</p>
      <h3 className="mt-2 font-serif text-2xl text-ink">{item.title}</h3>
      <p className="mt-2 text-sm text-muted">{item.text}</p>
      <Button href={item.href} variant="ghost" className="mt-4 px-0 hover:bg-transparent">
        {item.cta} →
      </Button>
    </aside>
  );
}
