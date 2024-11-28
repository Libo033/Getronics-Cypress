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
    cy.fixture("product.json").then((locators) => {
      const homePage = new HomePage();
      const catalogPage = new CatalogPage();

      homePage.search("A14");

      catalogPage.firstProduct();

      cy.get(locators.productModel).should("contain", "A14");
    });
  });

  it("Cantidad correcta de cuotas disponible(3)", () => {
    cy.fixture("product.json").then((locators) => {
      const homePage = new HomePage();
      const catalogPage = new CatalogPage();
      const productPage = new ProductPage();

      homePage.search("A14");

      catalogPage.firstProduct();

      productPage.calculateInstallments("American Express", "American Express");

      cy.get(locators.bodyTable).should("contain", "3 cuotas sin interés");
    });
  });
});
