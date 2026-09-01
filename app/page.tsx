import { BeautyTransformation } from "@/components/BeautyTransformation";
import { BookingCTA } from "@/components/BookingCTA";
import { Contacts } from "@/components/Contacts";
import { DesireSelector } from "@/components/DesireSelector";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { LeadMagnet } from "@/components/LeadMagnet";
import { MastersPreview } from "@/components/MastersPreview";
import { PopularServices } from "@/components/PopularServices";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { Pricing } from "@/components/Pricing";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCategories } from "@/components/ServiceCategories";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DesireSelector />
      <ServiceCategories />
      <LeadMagnet />
      <ProcessSteps />
      <PortfolioGallery />
      <PopularServices />
      <BeautyTransformation />
      <MastersPreview />
      <Testimonials />
      <Pricing compact />
      <FAQ />
      <BookingCTA />
      <Contacts />
    </>
  );
}
