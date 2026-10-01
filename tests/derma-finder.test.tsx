import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// DERMA_FINDER_MODE se resuelve al importar el modulo, asi que cada modo
// necesita volver a importar la pagina con la variable ya puesta.
async function loadPage(mode?: string) {
  vi.resetModules();
  if (mode === undefined) vi.stubEnv("NEXT_PUBLIC_DERMA_FINDER_MODE", "");
  else vi.stubEnv("NEXT_PUBLIC_DERMA_FINDER_MODE", mode);
  const mod = await import("@/app/derma-finder/page");
  return mod.default;
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Derma Finder, modo off (por defecto)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("no publica ningun especialista ficticio", async () => {
    const Page = await loadPage();
    const { container } = render(<Page />);
    expect(container.textContent).not.toContain("Valeria Ontiveros");
    expect(container.textContent).not.toContain("Dermatología pediátrica");
  });

  it("muestra Próximamente y manda al Asesor Virtual", async () => {
    const Page = await loadPage();
    render(<Page />);
    expect(screen.getByText(/Próximamente/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Asesor Virtual/i }),
    ).toHaveAttribute("href", "/asesor-virtual");
  });

  it("lleva noindex en los metadatos", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_DERMA_FINDER_MODE", "");
    const mod = await import("@/app/derma-finder/page");
    expect(mod.metadata.robots).toMatchObject({ index: false });
  });

  it("un valor desconocido cae en off, no en demo", async () => {
    const Page = await loadPage("cualquier-cosa");
    const { container } = render(<Page />);
    expect(container.textContent).not.toContain("Valeria Ontiveros");
  });
});

describe("Derma Finder, modo demo", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("avisa de forma visible que los perfiles son ficticios", async () => {
    const Page = await loadPage("demo");
    render(<Page />);
    expect(
      screen.getByText(/los especialistas que ves son ficticios/i),
    ).toBeInTheDocument();
  });

  it("no deja ningun mailto para escribirle a un medico inventado", async () => {
    const Page = await loadPage("demo");
    const { container } = render(<Page />);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.innerHTML).not.toContain("mailto:");
  });

  it("marca cada tarjeta como Ejemplo", async () => {
    const Page = await loadPage("demo");
    render(<Page />);
    expect(screen.getAllByText("Ejemplo").length).toBeGreaterThan(0);
  });

  it("sigue con noindex", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_DERMA_FINDER_MODE", "demo");
    const mod = await import("@/app/derma-finder/page");
    expect(mod.metadata.robots).toMatchObject({ index: false });
  });
});
