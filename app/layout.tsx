import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { mediaSrc } from "@/lib/asset";
import { site } from "@/lib/content";
import { isPlaceholder } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  ...(isPlaceholder(site.url) ? {} : { metadataBase: new URL(site.url) }),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    locale: "ru_RU",
    type: "website",
    siteName: site.name,
    images: [{ url: "/images/salon/hair-waves-blonde.jpg", width: 1200, height: 675, alt: site.name }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: mediaSrc("/icon.png"), type: "image/png", sizes: "32x32" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-ivory text-graphite antialiased">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-ivory focus:px-4 focus:py-2"
        >
          Перейти к содержанию
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
