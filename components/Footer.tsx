import Link from "next/link";
import { UNIVERSES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">Panalab México</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Historias que tu piel quiere contar. Ciencia traducida a lenguaje
            cotidiano para cuidar tu piel y tu cabello.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Universos
          </p>
          <ul className="mt-3 space-y-2">
            {UNIVERSES.map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/universos/${u.slug}`}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {u.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Legal
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/aviso-de-privacidad" className="text-sm text-white/80 hover:text-white">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link href="/donde-comprar" className="text-sm text-white/80 hover:text-white">
                Dónde comprar
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-white/50">
            La información de este sitio es orientativa y no sustituye una
            valoración médica. Consulte a su médico.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © 2026 Panalab México. Todos los derechos reservados.
      </div>
    </footer>
  );
}
