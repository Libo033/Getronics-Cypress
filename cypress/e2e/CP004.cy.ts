import CartPage from "../support/pages/Cart";
import ProductPage from "../support/pages/Product";

describe("El objetivo del caso de prueba es ingresar desde el producto 'Samsung Galaxy A15' de la tienda de Movistar (https://tiendaonline.movistar.com.ar/samsung-galaxy-a15-4g.html), luego verificar que el producto sea el indicado y que cuente con garantia. Por ultimo seleccionar el color 'Light Blue' agregar el producto a el carrito y corroborar que el producto y color es correcto.", () => {
  const url = "https://tiendaonline.movistar.com.ar/samsung-galaxy-a15-4g.html";

  beforeEach(() => {
    cy.visit(url);
  });

  it("Ingreso a la página indicada", () => {
    cy.verifyPage(url);
  });

  it("Verificacion que el producto sea el 'Samsung Galaxy A15' y que cuente con garantia", () => {
    const productPage = new ProductPage();

    productPage.verifyProduct("Samsung", "Galaxy A15");
    cy.verifyWarranty();
  });

  it("Seleccionar color 'Light Blue', agregar al carrito y verificar que se cumplan las condiciones", () => {
    cy.fixture("cart.json").then((locators) => {
      const productPage = new ProductPage();
      const cartPage = new CartPage();

      productPage.setColor("Light Blue");
      productPage.addToCart();

      cartPage.verifyProduct("Samsung", "Galaxy A15");

      cy.get(locators.colorTag).should("contain", "Light Blue");
    });
  });
});
