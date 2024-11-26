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
      cy.get(locators.memoryFilterTitle).click();
      cy.get(locators.memoryAnchor).contains(memory).click();
    });
  }

  filterByPrice(min: number, max: number): void {
    cy.get(`[data-value="${min}_${max}"] > a`).click();
  }
}

export default HomePage;
