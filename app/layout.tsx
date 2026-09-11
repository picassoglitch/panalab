import type { Metadata } from "next";
import Script from "next/script";
import { Raleway, Mulish } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveFX from "@/components/WaveFX";
import WaterSurface from "@/components/WaterSurface";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const TITLE = "Panalab México — Historias que tu piel quiere contar";
const DESCRIPTION =
  "El hub digital de Panalab México: cuidado capilar, piel sensible, acné, fotoprotección y antioxidantes, con información clara y herramientas útiles.";

export const metadata: Metadata = {
  // Base para resolver rutas relativas en canonical, Open Graph y Twitter.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Panalab México",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero/la-ciencia-que-vive-en-tu-piel.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero/la-ciencia-que-vive-en-tu-piel.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={`${raleway.variable} ${mulish.variable} antialiased`}>
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <WaveFX />
        <WaterSurface />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
