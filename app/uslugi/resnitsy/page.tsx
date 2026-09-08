import { ServiceDirectionPage } from "@/components/ServiceDirectionPage";
import { buildMetadata, getCategory } from "@/lib/content";
import { notFound } from "next/navigation";

const category = getCategory("resnitsy");

export const metadata = category ? buildMetadata(category.title, category.description) : {};

export default function LashesPage() {
  if (!category) notFound();
  return <ServiceDirectionPage categoryId="lashes" quizMode="lashes" />;
}
