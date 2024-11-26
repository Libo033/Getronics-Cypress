import CatalogPage from "../support/pages/Catalog";
import HomePage from "../support/pages/Home";
import ProductPage from "../support/pages/Product";

describe("El objetivo del caso de prueba es visitar la tienda de Movistar (https://tiendaonline.movistar.com.ar), luego realizar la búsqueda del equipo A14 e ingresar al mismo y verificar que se pueda pagar en 3 cuotas sin interes", () => {
  const url = "https://tiendaonline.movistar.com.ar";

  beforeEach(() => {
    cy.visit(url);
  });

  it("Ingreso a la página indicada", () => {
    cy.verifyPage(url);
  });

  it("Correcta selección de equipo(A14)", () => {
    const homePage = new HomePage();
    const catalogPage = new CatalogPage();

    homePage.search("A14");

    catalogPage.firstProduct();

    cy.get('[itemprop="name"]').should("contain", "A14");
  });

  it("Cantidad correcta de cuotas disponible(3)", () => {
    const homePage = new HomePage();
    const catalogPage = new CatalogPage();
    const productPage = new ProductPage();

    homePage.search("A14");

    catalogPage.firstProduct();

    // cy.get(".price-content").should("contain", "3 cuotas sin interés");

    productPage.calculateInstallments(0, 0);

    cy.get("#bodyTable").should("contain", "3 cuotas sin interés");
  });
});