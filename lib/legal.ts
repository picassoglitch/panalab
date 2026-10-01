/**
 * Valores del aviso de privacidad.
 *
 * No son secretos: viven en el repositorio a proposito, para que el area legal
 * del cliente los revise en un PR en vez de por correo.
 *
 * TODO(owner): faltan los valores del area legal. Mientras `status` siga en
 * "provisional" o quede algun campo vacio:
 *   - la pagina no muestra un aviso de privacidad, solo dice que esta en
 *     revision (nunca con corchetes ni notas internas a la vista);
 *   - `npm run build:static` falla a proposito, porque el sitio no debe pedir
 *     consentimiento contra un texto que no existe.
 *
 * Cuando legal entregue el texto definitivo, va en un PR aparte que reemplaza
 * el cuerpo de app/aviso-de-privacidad/page.tsx y pone status: "final".
 */
export const PRIVACY = {
  /** Razon social del responsable del tratamiento. */
  responsable: "Panalab México",
  /** Domicilio fiscal completo. */
  domicilio: "",
  /** Correo para ejercer derechos ARCO. */
  correoArco: "",
  /** "final" solo cuando legal valido el texto publicado. */
  status: "provisional" as "provisional" | "final",
  /** Fecha de la ultima actualizacion, en formato AAAA-MM-DD. */
  updatedAt: "",
};

/** Campos que tienen que venir llenos para poder publicar el aviso. */
export const PRIVACY_REQUIRED_FIELDS = [
  "responsable",
  "domicilio",
  "correoArco",
  "updatedAt",
] as const;

/** `true` cuando todavia no se puede publicar un aviso de privacidad real. */
export function isPrivacyProvisional(privacy = PRIVACY): boolean {
  if (privacy.status !== "final") return true;
  return PRIVACY_REQUIRED_FIELDS.some(
    (f) => !String(privacy[f] ?? "").trim(),
  );
}
