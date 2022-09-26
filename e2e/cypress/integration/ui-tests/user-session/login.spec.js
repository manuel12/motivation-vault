/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.deleteTestData();
    cy.visit("/");
  });

  it("should login with a valid username and password", () => {
    cy.loginWithUI()

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible");
    cy.matchImageSnapshot();
  });

  it("should NOT login with valid username and invalid password", () => {
    cy.loginWithUI(Cypress.env('adminUser'), "fakepassword")

    cy.get("[data-test=login-container]").should("be.visible");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
    cy.get("[data-test=login-container]").matchImageSnapshot();
  });

  it("should NOT login with empty username and password fields", () => {
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=login-container]").should("be.visible")
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
    cy.get("[data-test=login-container]").matchImageSnapshot();
  });

  it("should login when pressing ENTER when all form fields are filled", () => {
    cy.get("[data-test=username]").type(Cypress.env('adminUser'));
    cy.get("[data-test=password]").type(`${Cypress.env('adminPass')}{enter}`);

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible");
    cy.matchImageSnapshot();
  });

  it("should have focus on username input", () => {
    cy.focused().should("have.id", "username");
    cy.get("[data-test=login-container]").matchImageSnapshot();
  });
});
