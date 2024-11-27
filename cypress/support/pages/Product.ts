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
}

export default ProductPage;
