const USPS = [
  {
    title: "RESPALDO CIENTÍFICO",
    desc: "Fórmulas con evidencia, explicadas en lenguaje claro",
  },
  {
    title: "CONFIANZA DE CONSULTORIO",
    desc: "Portafolio recomendado por especialistas",
  },
  {
    title: "COMPRA DONDE PREFIERAS",
    desc: "Amazon, Mercado Libre y farmacias autorizadas",
  },
  {
    title: "ORIENTACIÓN RESPONSABLE",
    desc: "Te orientamos, nunca sustituimos a tu médico",
  },
];

export default function USPBar() {
  return (
    <section className="border-y border-sand bg-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {USPS.map((u) => (
          <div key={u.title} className="text-center">
            <p className="text-xs font-bold tracking-widest text-brand">{u.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
