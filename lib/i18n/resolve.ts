import type { DirectionId, ServiceCategory } from "@/lib/content";
import { categories, masters, testimonials, portfolio } from "@/lib/content";
import type { SiteCopy } from "@/lib/i18n/types";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function translateCategory(copy: SiteCopy, category: ServiceCategory): ServiceCategory {
  const cat = copy.categories[category.id];
  return {
    ...category,
    navLabel: cat.navLabel,
    title: cat.title,
    desire: cat.desire,
    desireLead: cat.desireLead,
    description: cat.description,
    cta: cat.cta,
    imageAlt: cat.imageAlt,
    services: category.services.map((service) => {
      const item = copy.services[service.id];
      return {
        ...service,
        name: item.name,
        short: item.short,
        difference: item.difference,
        priceFrom: copy.ui.priceFromPlaceholder,
        duration: copy.ui.durationPlaceholder,
        priceDependsOn: item.priceDependsOn,
        extra: item.extra,
        crossSell: {
          ...service.crossSell,
          title: item.crossSell.title,
          text: item.crossSell.text,
          cta: item.crossSell.cta,
        },
      };
    }),
  };
}

export function useTranslatedCategories() {
  const { copy } = useLanguage();
  return categories.map((category) => translateCategory(copy, category));
}

export function useTranslatedCategory(id: DirectionId) {
  const { copy } = useLanguage();
  const category = categories.find((item) => item.id === id);
  if (!category) return null;
  return translateCategory(copy, category);
}

export function translatedServiceName(copy: SiteCopy, id: string) {
  return copy.services[id]?.name ?? id;
}

export function translatedMaster(copy: SiteCopy, id: string) {
  const master = masters.find((item) => item.id === id);
  const extra = copy.masters.items[id];
  if (!master || !extra) return master;
  return {
    ...master,
    name: extra.name,
    experience: extra.experience,
    specialization: extra.specialization,
    quote: extra.quote,
    photoAlt: extra.photoAlt,
    works: master.works.map((work, index) => ({ ...work, alt: extra.works[index] ?? work.alt })),
  };
}

export function translatedPortfolio(copy: SiteCopy) {
  return portfolio.map((item) => ({
    ...item,
    title: copy.portfolio.items[item.id]?.title ?? item.title,
    caption: copy.portfolio.items[item.id]?.caption ?? item.caption,
  }));
}

export function translatedTestimonials(copy: SiteCopy) {
  return testimonials.map((item) => ({
    ...item,
    ...copy.testimonials.items[item.id],
  }));
}
