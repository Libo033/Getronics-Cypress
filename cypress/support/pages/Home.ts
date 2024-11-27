class HomePage {
  search(search: string): void {
    cy.fixture("index.json").then((locators) => {
      cy.intercept(locators.suggestLocation).as("getSuggest"); // Intercepcion de la API de sugerencias.

      cy.get(locators.searchButton).click();
      cy.get(locators.searchBar).type(search);

      cy.wait("@getSuggest"); // Esperar las sugerencias de la barra de busqueda

      cy.get(locators.firstSuggestion).click();
    });
  }

  filterByInternalMemory(memory: string): void {
    cy.fixture("index.json").then((locators) => {
      Cypress.config("defaultCommandTimeout", 6000);
      cy.intercept(locators.graphqlProduct).as("queryProducts");

      cy.get(locators.memoryFilterTitle).click();
      cy.get(locators.memoryAnchor).contains(memory).click();

      cy.wait("@queryProducts");
    });
  }

  filterByPrice(min: number, max: number): void {
    cy.fixture("index.json").then((locators) => {
      Cypress.config("defaultCommandTimeout", 6000);
      cy.intercept(locators.graphqlProduct).as("queryProducts");

      cy.get(`[data-value="${min}_${max}"] > a`).click({ timeout: 6000 });

      cy.wait("@queryProducts");
    });
  }
}

export default HomePage;
