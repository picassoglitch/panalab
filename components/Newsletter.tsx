"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export default function Newsletter({ source = "newsletter" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;
    track("lead_submit", { source });
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-xl bg-brand-light px-5 py-4 text-brand-dark">
        ¡Listo! Muy pronto recibirás contenido útil para tu piel y tu cabello.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="w-full rounded-full border border-sand bg-white px-5 py-3 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={!consent}
          className="wave-btn wave-btn-deep rounded-full bg-brand px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Suscribirme
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-brand"
        />
        Acepto recibir comunicaciones de Panalab México y he leído el aviso de
        privacidad.
      </label>
    </form>
  );
}
