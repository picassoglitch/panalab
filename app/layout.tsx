import type { Metadata } from "next";
import Script from "next/script";
import { Raleway, Mulish } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveFX from "@/components/WaveFX";
import WaterSurface from "@/components/WaterSurface";
import "./globals.css";

// El id entra tal cual en un <script> inline, asi que se valida el formato:
// un valor raro en la variable de entorno podria cerrar la cadena e inyectar
// codigo en todas las paginas. Si no cuadra, GTM simplemente no se carga.
const GTM_ID_PATTERN = /^GTM-[A-Z0-9]{4,10}$/;
const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID;
const GTM_ID = rawGtmId && GTM_ID_PATTERN.test(rawGtmId) ? rawGtmId : undefined;

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base para resolver los canonical y las URLs de Open Graph.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Panalab México — Historias que tu piel quiere contar",
    template: "%s | Panalab México",
  },
  description:
    "El hub digital de Panalab México: cuidado capilar, piel sensible, acné, fotoprotección y antioxidantes, con información clara y herramientas útiles.",
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
