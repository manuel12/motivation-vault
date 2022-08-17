/// <reference types="cypress" />

const testuserData = require("../../../fixtures/testuser.json");

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
  });

  it("should NOT login with valid username and invalid password", () => {
    cy.loginWithUI(testuserData.username, "fakepassword")

    cy.get("[data-test=login-container]").should("be.visible");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });

  it("should NOT login with empty username and password fields", () => {
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=login-container]").should("be.visible")
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });

  it("should login when pressing ENTER when all form fields are filled", () => {
    cy.get("[data-test=username]").type(testuserData.username);
    cy.get("[data-test=password]").type(`${testuserData.password}{enter}`);

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible");
  });

  it("should have focus on username input", () => {
    cy.focused().should("have.id", "username");
  });
});
