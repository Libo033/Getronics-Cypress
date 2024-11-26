class CatalogPage {
  firstProduct(): void {
    cy.fixture("catalog.json").then((locators) => {
      cy.get(locators.productLink).first().click();
    });
  }
}

export default CatalogPage;
