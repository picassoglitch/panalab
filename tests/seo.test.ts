import { describe, expect, it } from "vitest";
import { DESCRIPTION_MAX, clampDescription } from "@/lib/site";
import { PRODUCTS, UNIVERSES } from "@/lib/data";

describe("clampDescription()", () => {
  it("deja intacto lo que ya cabe", () => {
    expect(clampDescription("Shampoo de reparación capilar.")).toBe(
      "Shampoo de reparación capilar.",
    );
  });

  it("nunca pasa del maximo", () => {
    const largo = "palabra ".repeat(60);
    expect(clampDescription(largo).length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });

  it("corta en un espacio, sin partir la palabra", () => {
    const texto = `${"a".repeat(140)} palabraquequedafuera`;
    const out = clampDescription(texto);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toContain("palabraquequeda");
  });

  it("colapsa saltos de linea y espacios repetidos", () => {
    expect(clampDescription("uno\n  dos   tres")).toBe("uno dos tres");
  });

  it("no deja un signo de puntuacion colgando antes de los puntos suspensivos", () => {
    const texto = `${"a".repeat(100)} final, ${"b".repeat(100)}`;
    expect(clampDescription(texto)).not.toContain(",…");
  });
});

describe("descripciones del catalogo", () => {
  it("cada producto aporta un texto propio y no vacio", () => {
    for (const p of PRODUCTS) {
      expect(p.benefit.trim().length, p.slug).toBeGreaterThan(0);
    }
  });

  it("las descripciones de producto son unicas entre si", () => {
    const vistas = new Map<string, string>();
    for (const p of PRODUCTS) {
      const d = clampDescription(p.benefit);
      expect(vistas.has(d), `${p.slug} repite la de ${vistas.get(d)}`).toBe(false);
      vistas.set(d, p.slug);
    }
  });

  it("las de universo tambien, y caben en el limite", () => {
    const vistas = new Set<string>();
    for (const u of UNIVERSES) {
      const d = clampDescription(u.intro);
      expect(d.length, u.slug).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(vistas.has(d), `${u.slug} repetida`).toBe(false);
      vistas.add(d);
    }
  });
});
