import { ServiceDirectionPage } from "@/components/ServiceDirectionPage";
import { buildMetadata, getCategory } from "@/lib/content";
import { notFound } from "next/navigation";

const category = getCategory("volosy");

export const metadata = category ? buildMetadata(category.title, category.description) : {};

export default function HairPage() {
  if (!category) notFound();
  return <ServiceDirectionPage categoryId="hair" quizMode="hair" />;
}
