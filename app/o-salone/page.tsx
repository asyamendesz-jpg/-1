import { AboutPageContent } from "@/components/LocalizedPages";
import { buildMetadata } from "@/lib/content";

export const metadata = buildMetadata(
  "О салоне",
  "Философия салона «Бережное преображение»: красота, которая остаётся вашей. Бережный подход, индивидуальный подбор, без давления.",
);

export default function AboutPage() {
  return <AboutPageContent />;
}
