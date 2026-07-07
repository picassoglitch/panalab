import type { Metadata } from "next";
import { Raleway, Mulish } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
