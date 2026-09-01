import { categories } from "@/lib/content";
import type { MetadataRoute } from "next";

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
    url: path || "/",
    lastModified: new Date(),
  }));
}
