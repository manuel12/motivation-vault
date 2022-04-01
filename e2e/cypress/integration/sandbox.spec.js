/// <reference types="cypress" />

describe("Sandbox experiments", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginAndCleanUp();
  });

  it("About page - should display about page", () => {
    cy.get("[data-test=about-link]").click();
    cy.get(".about-page-container").should("be.visible");
    cy.matchImageSnapshot();
  });
});
