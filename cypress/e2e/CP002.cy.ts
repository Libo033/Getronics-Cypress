import HomePage from "../support/pages/Home";

describe("El objetivo del caso de prueba es visitar la tienda de Movistar (https://tiendaonline.movistar.com.ar), luego utilizando los filtros de la página, filtrar por Memoria Interna 128GB y precio entre “0 - $300.000” e indicar cuantos equipos devuelve la búsqueda", () => {
  const url = "https://tiendaonline.movistar.com.ar";

  beforeEach(() => {
    cy.visit(url);
    cy.viewport(1280, 768); // viewport configurado a desktop
  });

  it("Ingreso a la página indicada", () => {
    cy.verifyPage(url);
  });

  it("Aplicacion de filtros deseados (Memoria Interna 128GB - Precio: $ 0 - $ 300.000)", () => {
    // --- Filtro de precio reemplazado ---
    const homePage = new HomePage();

    homePage.filterByInternalMemory("128GB");
    homePage.filterByPrice(0, 300000);

    cy.get("li.clearfilter").eq(0).should("contain", "128GB");
    cy.get("li.clearfilter")
      .eq(1)
      .invoke("text")
      .invoke("replace", /\u00a0/g, " ")
      .should("eq", "$ 0 - $ 300.000");
  });

  it("Equipos filtrados correctamente", () => {
    cy.fixture("index.json").then((locators) => {
      const homePage = new HomePage();

      homePage.filterByInternalMemory("128GB");
      homePage.filterByPrice(0, 300000);

      cy.get(locators.productList).each((product) => {
        cy.get(`[data-id="${product.data("id")}"] ${locators.productStorage}`, {
          timeout: 6000,
        }).should("contain", "128 GB");

        cy.get(`[data-id="${product.data("id")}"] ${locators.productPrice}`, {
          timeout: 6000,
        })
          .invoke("text")
          .then((price: string) => {
            expect(
              parseInt(price.replace("$", "").replace(".", ""))
            ).to.be.lessThan(300000);
          });
      });
    });
  });
});
