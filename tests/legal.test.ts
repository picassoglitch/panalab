import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PRIVACY, PRIVACY_REQUIRED_FIELDS, isPrivacyProvisional } from "@/lib/legal";

// Valores de mentira, solo para las pruebas. No son datos del cliente.
const FIXTURE_COMPLETO = {
  responsable: "Panalab México",
  domicilio: "Calle Ejemplo 1, CDMX (fixture)",
  correoArco: "fixture@example.invalid",
  status: "final" as const,
  updatedAt: "2026-01-31",
};

// spawnSync y no execFileSync: en modo --warn el guardia sale con 0 y escribe
// por stderr, y execFileSync solo devuelve stderr cuando el proceso falla.
function runCheck(args: string[] = []) {
  const res = spawnSync(
    "node",
    [
      "--experimental-strip-types",
      "--disable-warning=ExperimentalWarning",
      "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
      "scripts/check-legal.mjs",
      ...args,
    ],
    { encoding: "utf8" },
  );
  return { code: res.status, output: `${res.stdout ?? ""}${res.stderr ?? ""}` };
}

describe("isPrivacyProvisional()", () => {
  it("con un fixture completo deja de ser provisional", () => {
    expect(isPrivacyProvisional(FIXTURE_COMPLETO)).toBe(false);
  });

  it("status final pero un campo vacio sigue siendo provisional", () => {
    for (const field of PRIVACY_REQUIRED_FIELDS) {
      const roto = { ...FIXTURE_COMPLETO, [field]: "" };
      expect(isPrivacyProvisional(roto), field).toBe(true);
    }
  });

  it("todos los campos llenos pero status provisional no basta", () => {
    expect(
      isPrivacyProvisional({ ...FIXTURE_COMPLETO, status: "provisional" }),
    ).toBe(true);
  });

  it("un campo con solo espacios cuenta como vacio", () => {
    expect(isPrivacyProvisional({ ...FIXTURE_COMPLETO, domicilio: "   " })).toBe(true);
  });

  it("los valores de hoy son provisionales", () => {
    expect(isPrivacyProvisional(PRIVACY)).toBe(true);
  });
});

describe("scripts/check-legal.mjs", () => {
  it("falla con los valores actuales y dice que falta", () => {
    const { code, output } = runCheck();
    expect(code).toBe(1);
    expect(output).toContain("no esta listo");
    expect(output).toContain("PRIVACY.domicilio");
    expect(output).toContain("PRIVACY.correoArco");
    expect(output).toContain('tiene que ser "final"');
  });

  it("con --warn avisa pero no rompe, para no estorbar en desarrollo", () => {
    const { code, output } = runCheck(["--warn"]);
    expect(code).toBe(0);
    expect(output).toContain("AVISO");
  });

  it("no se confunde con los identificadores del codigo", () => {
    // El archivo usa `isPrivacyProvisional` y una variable `provisional`.
    // El guardia solo mira los nodos de texto del JSX; si mirara el archivo
    // entero, fallaria para siempre aunque legal ya hubiera entregado.
    const page = readFileSync("app/aviso-de-privacidad/page.tsx", "utf8");
    expect(page).toContain("isPrivacyProvisional");
    const { output } = runCheck();
    expect(output).not.toContain("muestra \"provisional\" en el texto");
  });
});

describe("la pagina publica", () => {
  const page = readFileSync("app/aviso-de-privacidad/page.tsx", "utf8");
  const textNodes = [...page.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/>([^<>{}]+)</g)]
    .map((m) => m[1].replace(/\s+/g, " ").trim())
    .filter(Boolean);

  it("ya no muestra corchetes de marcador", () => {
    for (const t of textNodes) expect(t, t).not.toMatch(/\[[^\]]+\]/);
  });

  it("ya no muestra la nota interna para el equipo", () => {
    const all = textNodes.join(" ");
    expect(all).not.toContain("por confirmar");
    expect(all).not.toContain("área legal del cliente antes de salir");
  });
});
