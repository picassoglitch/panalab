import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BuyButtons from "@/components/BuyButtons";
import { BUY_LINK_HOSTS, MARKETPLACES, PRODUCTS } from "@/lib/data";

describe("ficha de producto sin URL directa", () => {
  it("no cae en la busqueda generica de Amazon ni de Mercado Libre", () => {
    const { container } = render(<BuyButtons product="aminoter-mask" scope="product" />);
    expect(container.innerHTML).not.toContain("amazon.com.mx/s?");
    expect(container.innerHTML).not.toContain("listado.mercadolibre");
    expect(container.querySelectorAll("a[target=_blank]").length).toBe(0);
  });

  it("dice la verdad y manda a donde comprar", () => {
    render(<BuyButtons product="aminoter-mask" scope="product" buyLinks={{}} />);
    expect(screen.getByText(/Próximamente en tiendas en línea/i)).toBeInTheDocument();
    // next/link normaliza la barra final segun la config del build; en jsdom
    // no se aplica trailingSlash. Que el HTML publicado la lleve lo revisa
    // scripts/verify-static-out.mjs sobre out/.
    expect(
      screen.getByRole("link", { name: /dónde comprar/i }).getAttribute("href"),
    ).toMatch(/^\/donde-comprar\/?$/);
  });
});

describe("ficha de producto con URL directa", () => {
  const url = "https://www.amazon.com.mx/dp/B000000000";

  it("pinta solo el canal que tiene URL", () => {
    render(
      <BuyButtons product="aminoter-mask" scope="product" buyLinks={{ amazon: url }} />,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent("Amazon México");
  });

  it("usa la URL del producto y le agrega los UTM", () => {
    render(
      <BuyButtons product="aminoter-mask" scope="product" buyLinks={{ amazon: url }} />,
    );
    const href = screen.getByRole("link").getAttribute("href") ?? "";
    const parsed = new URL(href);
    expect(parsed.origin + parsed.pathname).toBe(url);
    expect(parsed.searchParams.get("utm_source")).toBe("panalab_web");
    expect(parsed.searchParams.get("utm_content")).toBe("amazon");
    expect(parsed.searchParams.get("utm_term")).toBe("aminoter-mask");
  });
});

describe("paginas generales", () => {
  it("siguen mostrando los canales genericos de Panalab", () => {
    render(<BuyButtons />);
    expect(screen.getAllByRole("link")).toHaveLength(MARKETPLACES.length);
  });
});

describe("datos de buyLinks", () => {
  it("toda URL cargada es https y de un dominio permitido", () => {
    for (const p of PRODUCTS) {
      for (const [channel, url] of Object.entries(p.buyLinks ?? {})) {
        const parsed = new URL(url as string);
        expect(parsed.protocol, `${p.slug} · ${channel}`).toBe("https:");
        expect(BUY_LINK_HOSTS, `${p.slug} · ${channel}`).toContain(parsed.hostname);
      }
    }
  });

  it("hoy ningun producto tiene URL: las entrega el cliente", () => {
    const withLinks = PRODUCTS.filter(
      (p) => Object.values(p.buyLinks ?? {}).filter(Boolean).length > 0,
    );
    // Este test documenta el estado actual. Cuando lleguen las URLs reales,
    // se cambia por una asercion de que no falta ninguna.
    expect(withLinks).toHaveLength(0);
  });
});
