/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    verifyPage(url: string): Chainable<any>;
    verifyWarranty(): void;
  }
}
