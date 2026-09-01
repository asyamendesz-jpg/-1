import { ServiceDirectionPage, directionMetadata } from "@/components/ServiceDirectionPage";
import { getCategory } from "@/lib/content";
import { notFound } from "next/navigation";

const category = getCategory("volosy");

export const metadata = category ? directionMetadata(category) : {};

export default function HairPage() {
  if (!category) notFound();
  return <ServiceDirectionPage category={category} quizMode="hair" />;
}
