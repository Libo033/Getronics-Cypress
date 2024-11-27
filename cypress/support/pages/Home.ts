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
      cy.intercept(locators.graphqlProduct).as("queryProducts");

      cy.get(locators.memoryFilterTitle).click({ timeout: 100000 });
      cy.get(locators.memoryAnchor).contains(memory).click();

      cy.wait("@queryProducts");
    });
  }

  filterByPrice(min: number, max: number): void {
    cy.fixture("index.json").then((locators) => {
      cy.intercept(locators.graphqlProduct).as("queryProducts");

      cy.get(`[data-value="${min}_${max}"] > a`).click({ timeout: 100000 });

      cy.wait("@queryProducts");
    });
  }

  selectProduct(product: number): void {
    cy.fixture("index.json").then((locators) => {
      cy.get(locators.productLink).eq(product).click({ timeout: 100000 });
    });
  }
}

export default HomePage;
