import { categories, site } from "@/lib/content";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/uslugi",
    ...categories.map((item) => item.href),
    "/raboty",
    "/mastera",
    "/tseny",
    "/o-salone",
    "/faq",
    "/kontakty",
    "/podbor",
    "/zapis",
    "/politika-konfidencialnosti",
  ];

  return paths.map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date(),
  }));
}
