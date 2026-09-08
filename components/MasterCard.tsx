"use client";

import { Button } from "@/components/Button";
import { WorkPhoto } from "@/components/WorkPhoto";
import { masters } from "@/lib/content";
import { translatedMaster } from "@/lib/i18n/resolve";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { isPlaceholder } from "@/lib/utils";

export function MasterCard({ id }: { id: string }) {
  const { copy } = useLanguage();
  const source = masters.find((item) => item.id === id);
  const master = source ? translatedMaster(copy, id) : null;
  if (!master) return null;

  return (
    <article className="overflow-hidden rounded-[1.8rem] bg-ivory shadow-[var(--shadow-card)]">
      <div className="group aspect-[4/5] w-full">
        <WorkPhoto src={master.photo} alt={master.photoAlt} className="h-full w-full" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-3xl text-ink">{master.name}</h3>
        <p className="mt-2 text-sm text-gold-deep">{master.experience}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{master.specialization}</p>
        <blockquote className="mt-5 border-l border-gold pl-4 font-serif text-xl text-chocolate">{master.quote}</blockquote>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {master.works.map((work) => (
            <WorkPhoto key={work.src} src={work.src} alt={work.alt} className="aspect-square w-full rounded-2xl" sizes="160px" />
          ))}
        </div>
        <Button href={`/zapis?master=${master.id}`} className="mt-6" full>
          {isPlaceholder(master.name) ? copy.ui.bookMaster : copy.ui.bookMasterNamed.replace("{name}", master.name)}
        </Button>
      </div>
    </article>
  );
}
