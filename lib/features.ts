// Interruptores de funcionalidad resueltos en tiempo de build.
// El sitio es export estatico: NEXT_PUBLIC_* se incrusta al compilar, asi que
// cambiar uno de estos valores obliga a volver a construir y a desplegar.

/**
 * Derma Finder.
 *
 * `off`  (por defecto) la ruta sigue viva para no romper enlaces viejos, pero
 *        solo muestra un "Próximamente". Es lo que debe estar en produccion
 *        mientras el directorio de especialistas sea de demostracion: son
 *        medicos inventados y publicarlos como reales en un sitio de salud es
 *        un riesgo de confianza y regulatorio (COFEPRIS).
 * `demo` muestra el directorio ficticio con aviso visible y sin forma de
 *        contactar. Solo para revisiones internas.
 *
 * En los dos casos la pagina lleva noindex.
 */
export type DermaFinderMode = "off" | "demo";

export const DERMA_FINDER_MODE: DermaFinderMode =
  process.env.NEXT_PUBLIC_DERMA_FINDER_MODE === "demo" ? "demo" : "off";
