/// <reference types="cypress" />

describe("Header", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display correct app name on the header", () => {
    cy.get("[data-test=header]")
      .should("have.text", "Motivation Vault")
  })
  
  it("should display correct app name on the header after login", () => {
    cy.loginAndCleanUp();
    cy.get("[data-test=header]")
      .should("have.text", "Motivation Vault")
  })
})