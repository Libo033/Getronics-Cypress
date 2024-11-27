class CartPage {
  verifyProduct(brand: string, model: string): void {
    cy.fixture("cart.json").then((locators) => {
      cy.get(locators.productBrand).should("contain", brand);
      cy.get(locators.productModel).should("contain", model);
    });
  }
}

export default CartPage;
