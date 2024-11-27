class ProductPage {
  calculateInstallments(bank: string, card: string): void {
    cy.fixture("product.json").then((locators) => {
      cy.intercept(locators.getinstallments).as("getInstallments");

      cy.get(locators.calculatorInstallments).click();

      cy.get(locators.bankSelector).click();
      cy.get(locators.bankSelect).contains(bank).click({ force: true });

      cy.get(locators.cardSelector).click();
      cy.get(`[data-card="${card}"]`).click();

      cy.get(locators.calculateButton).click();

      cy.wait("@getInstallments");
    });
  }

  verifyProduct(brand: string, model: string): void {
    cy.fixture("product.json").then((locators) => {
      cy.get(locators.productBrand).should("contain", brand);
      cy.get(locators.productModel).should("contain", model);
    });
  }

  setColor(color: string): void {
    cy.fixture("product.json").then((locators) => {
      cy.get(`${locators.colorAttr} [data-option-label="${color}"]`).click();
    });
  }

  addToCart(): void {
    cy.fixture("product.json").then((locators) => {
      cy.get(locators.addToCartButton).click();
    });
  }
}

export default ProductPage;
