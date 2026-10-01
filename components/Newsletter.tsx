"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";
import { isLeadCaptureEnabled, submitLead } from "@/lib/leads";

/** Texto exacto que acepta el usuario. Viaja con el lead como respaldo. */
const CONSENT_TEXT =
  "Acepto recibir comunicaciones de Panalab México y he leído el aviso de privacidad.";

type Status = "idle" | "sending" | "sent" | "error";

export default function Newsletter({ source = "newsletter" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const emailId = useId();
  const gotchaId = useId();

  // Sin endpoint no se pinta formulario: antes el correo se perdia y aun asi
  // se respondia "¡Listo!". Mas vale no pedir un dato que no se puede honrar.
  if (!isLeadCaptureEnabled()) {
    return (
      <p className="rounded-xl bg-brand-light px-5 py-4 text-sm text-brand-dark">
        Muy pronto podrás suscribirte aquí.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent || status === "sending") return;

    setStatus("sending");
    const result = await submitLead({ email, source, consentText: CONSENT_TEXT });

    if (result.ok) {
      // El evento se dispara solo si de verdad quedo registrado, y nunca
      // lleva el correo ni ningun otro dato personal al dataLayer.
      track("lead_submit", { source });
      setStatus("sent");
    } else {
      track("lead_error", { source, reason: result.reason });
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-xl bg-brand-light px-5 py-4 text-brand-dark" role="status">
        ¡Listo! Revisa tu correo para confirmar tu suscripción.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="w-full">
          <label htmlFor={emailId} className="sr-only">
            Correo electrónico
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="w-full rounded-full border border-sand bg-white px-5 py-3 text-sm outline-none focus:border-brand"
          />
        </div>
        <button
          type="submit"
          disabled={!consent || status === "sending"}
          className="wave-btn wave-btn-deep shrink-0 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Enviando…" : "Suscribirme"}
        </button>
      </div>

      {/* Trampa para bots: fuera de pantalla y oculta a lectores de pantalla. */}
      <input
        id={gotchaId}
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-brand"
        />
        <span>
          Acepto recibir comunicaciones de Panalab México y he leído el{" "}
          <Link href="/aviso-de-privacidad/" className="underline underline-offset-2">
            aviso de privacidad
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="text-xs leading-relaxed text-accent-dark" role="alert">
          No pudimos registrar tu correo. Intenta de nuevo en unos minutos.
        </p>
      )}
    </form>
  );
}
