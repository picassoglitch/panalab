import type { Metadata } from "next";
import FinderClient from "./FinderClient";

export const metadata: Metadata = {
  title: "Derma Finder",
  description:
    "Encuentra dermatólogos, pediatras y clínicas aliadas cerca de ti. Busca por código postal o ciudad y filtra por necesidad.",
};

export default function DermaFinderPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Derma Finder
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Encuentra dermatólogos, pediatras y clínicas aliadas cerca de ti.
            Busca por código postal o ciudad, filtra según tu necesidad y da el
            siguiente paso con un especialista.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <FinderClient />
      </section>
    </>
  );
}
