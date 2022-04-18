/// <reference types="cypress" />

describe("Logout", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });
  it("should logout by navigation bar", () => {
    cy.get("[data-test=logout-link]").click();

    cy.get("[data-test=heading]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });
});
