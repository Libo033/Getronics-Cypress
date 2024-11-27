import HomePage from "../support/pages/Home";
import ProductPage from "../support/pages/Product";

describe("El objetivo del caso de prueba es visitar la tienda de Movistar (https://tiendaonline.movistar.com.ar), luego ingresar al tercer equipo de la lista inicial que se obtenga y verificar que NO exista el método de pago de 60 cuotas para el banco Credicoop con Tarjeta VISA. ", () => {
  const url = "https://tiendaonline.movistar.com.ar";

  beforeEach(() => {
    cy.visit(url);
  });

  it("Ingreso a la página indicada", () => {
    cy.verifyPage(url);
  });

  it("Seleccionar el tercer producto de la lista", () => {
    cy.fixture("index.json").then((locators) => {
      const homePage = new HomePage();

      homePage.selectProduct(2); // Ingreso al tercer producto

      cy.get(locators.productBrand).should("be.visible");
      cy.get(locators.productInfo).should("be.visible");
    });
  });

  it("Verificar la NO existencia de un medio de pago con 60 cuotas para el banco Credicoop con tarjeta VISA ", () => {
    cy.fixture("index.json").then((locators) => {
      const homePage = new HomePage();
      const productPage = new ProductPage();

      homePage.selectProduct(2);

      productPage.calculateInstallments("Credicoop", "Visa");

      cy.get("#bodyTable").should("not.contain", "60 cuotas");
    });
  });
});
