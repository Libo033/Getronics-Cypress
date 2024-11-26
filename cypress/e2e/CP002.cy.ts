import HomePage from "../support/pages/Home";

describe("El objetivo del caso de prueba es visitar la tienda de Movistar (https://tiendaonline.movistar.com.ar), luego utilizando los filtros de la página, filtrar por Memoria Interna 128GB y precio entre “0 - $300.000” e indicar cuantos equipos devuelve la búsqueda", () => {
  const url = "https://tiendaonline.movistar.com.ar";

  beforeEach(() => {
    cy.visit(url);
    cy.viewport(1280, 768); // viewport configurado a desktop

    cy.intercept("/graphql?query*").as("queryFilters"); // Intercepcion de los filtros.
  });

  it("Ingreso a la página indicada", () => {
    cy.verifyPage(url);
  });

  it("Aplicacion de filtros deseados (Memoria Interna 128GB - Precio: $ 0 - $ 300.000)", () => {
    // --- Filtro de precio reemplazado ---
    const homePage = new HomePage();

    homePage.filterByInternalMemory("128GB");
    homePage.filterByPrice(0, 300000);

    cy.wait("@queryFilters"); // Espera la response de los filtros

    cy.get("li.clearfilter").eq(0).should("contain", "128GB");
    cy.get("li.clearfilter")
      .eq(1)
      .invoke("text")
      .invoke("replace", /\u00a0/g, " ")
      .should("eq", "$ 0 - $ 300.000");
  });

  // it("Equipos filtrados correctamente", () => {});
});