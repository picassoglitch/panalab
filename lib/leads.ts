/**
 * Envio de suscripciones a un endpoint de formularios alojado.
 *
 * El sitio es un export estatico sobre Apache compartido, sin Node y con una
 * cuenta FTP enjaulada: no hay donde ejecutar codigo ni donde guardar una
 * llave de API fuera del document root. Un endpoint alojado (tipo Formspree,
 * Basin, Getform o el formulario del ESP del cliente) no necesita ningun
 * secreto en el bundle, porque el id del formulario es publico, y devuelve un
 * estado HTTP real para poder decir la verdad al usuario.
 *
 * Descartados: llamar a la API del ESP desde el navegador (expone la llave),
 * un relay en PHP en el hosting (nueva superficie de ataque y sin lugar donde
 * guardar la llave fuera del docroot) y el JSONP de Mailchimp (fragil y
 * peleado con la CSP).
 *
 * El proveedor concreto todavia no esta decidido, asi que esto no asume
 * ninguno: solo hace un POST de JSON.
 */

/** Endpoint del proveedor. Vacio = el sitio no muestra formulario. */
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

/** `true` cuando hay a donde mandar los correos. */
export function isLeadCaptureEnabled(endpoint = LEAD_ENDPOINT): boolean {
  return Boolean(endpoint && endpoint.trim());
}

export type LeadResult = { ok: true } | { ok: false; reason: string };

export type SubmitLeadInput = {
  email: string;
  source: string;
  /** Texto exacto del consentimiento que acepto el usuario. */
  consentText: string;
  /** Solo para pruebas. */
  endpoint?: string;
  fetchImpl?: typeof fetch;
};

/** Corta la espera si el proveedor no responde. */
const TIMEOUT_MS = 10_000;

export async function submitLead({
  email,
  source,
  consentText,
  endpoint = LEAD_ENDPOINT,
  fetchImpl,
}: SubmitLeadInput): Promise<LeadResult> {
  if (!isLeadCaptureEnabled(endpoint)) {
    return { ok: false, reason: "sin-endpoint" };
  }

  const doFetch = fetchImpl ?? globalThis.fetch;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await doFetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Formspree y similares devuelven JSON en vez de redirigir con esto.
        Accept: "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        email,
        source,
        // Se guarda que se acepto, con que texto y cuando: es lo que respalda
        // el consentimiento frente a la LFPDPPP.
        consent: true,
        consentText,
        consentAt: new Date().toISOString(),
        page: typeof location !== "undefined" ? location.pathname : "",
        // Trampa para bots: un humano no lo ve ni lo llena.
        _gotcha: "",
      }),
    });

    // Solo un 2xx cuenta como exito. Cualquier otra cosa se le dice al usuario
    // en vez de fingir que quedo registrado.
    if (!res.ok) return { ok: false, reason: `http-${res.status}` };
    return { ok: true };
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError" ? "timeout" : "red";
    return { ok: false, reason };
  } finally {
    clearTimeout(timer);
  }
}
