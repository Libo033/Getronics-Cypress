class ProductPage {
  calculateInstallments(bank: number, card: number): void {
    cy.fixture("product.json").then((locators) => {
      cy.get(locators.calculatorInstallments).click();

      cy.get(locators.bankSelector).click();
      cy.get(locators.bankSelect).eq(bank).click();

      cy.get(locators.cardSelector).click();
      cy.get(locators.cardSelectByBank).eq(card).click();

      cy.get(locators.calculateButton).click();
    });
  }
}

export default ProductPage;
