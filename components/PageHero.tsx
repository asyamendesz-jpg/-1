import { WorkPhoto } from "@/components/WorkPhoto";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl items-end gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold-deep">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-ink md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-muted">{text}</p>
        </div>
        {image ? (
          <div className="group overflow-hidden rounded-[1.8rem]">
            <WorkPhoto src={image} alt={imageAlt ?? "[ФОТО РАБОТЫ]"} className="aspect-[4/3] w-full" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
