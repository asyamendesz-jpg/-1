import { site } from "@/lib/content";
import { isPlaceholder } from "@/lib/utils";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.name,
    description: site.description,
    image: "/images/hero-hair.jpg",
    address: isPlaceholder(site.contacts.address)
      ? undefined
      : {
          "@type": "PostalAddress",
          streetAddress: site.contacts.address,
        },
    telephone: isPlaceholder(site.contacts.phone) ? undefined : site.contacts.phone,
    openingHours: isPlaceholder(site.contacts.hours) ? undefined : site.contacts.hours,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
