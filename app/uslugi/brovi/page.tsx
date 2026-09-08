import { ServiceDirectionPage } from "@/components/ServiceDirectionPage";
import { buildMetadata, getCategory } from "@/lib/content";
import { notFound } from "next/navigation";

const category = getCategory("brovi");

export const metadata = category ? buildMetadata(category.title, category.description) : {};

export default function BrowsPage() {
  if (!category) notFound();
  return <ServiceDirectionPage categoryId="brows" quizMode="brows" />;
}
