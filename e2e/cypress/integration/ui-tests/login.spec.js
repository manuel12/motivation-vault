/// <reference types="cypress" />

const testuserData = require("../../fixtures/testuser.json");

describe("Login", () => {
  beforeEach(() => {
    cy.deleteTestData();
    cy.visit("/");
  });

  it("should login with valid username and password", () => {
    cy.get("[data-test=username]").type(testuserData.username);
    cy.get("[data-test=password]").type(testuserData.password);
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=heading]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible");
  });

  it("should NOT login with valid username and invalid password", () => {
    cy.get("[data-test=username]").type(testuserData.username);
    cy.get("[data-test=password]").type("fakepassword");
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=submit-button]").should("contain.text", "Login");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });

  it("should NOT login with empty username and password fields", () => {
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=submit-button]").should("contain.text", "Login");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });

  it("should have focus on username input", () => {
    cy.focused().should("have.id", "username");
  });

  it("should login when pressing ENTER from input field", () => {
    cy.get("[data-test=username]").type(testuserData.username);
    cy.get("[data-test=password]").type(`${testuserData.password}{enter}`);

    cy.get("[data-test=heading]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible");
  });

  it("should show error message when leaving username empty", () => {
    cy.get("[data-test=password]").type(testuserData.password);
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=username-error]")
      .should("be.visible")
      .and("contain.text", "You need to provide a username.");
  });

  it("should show error message when leaving password empty", () => {
    cy.get("[data-test=username]").type(testuserData.password);
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=password-error]")
      .should("be.visible")
      .and("contain.text", "You need to provide a password.");
  });

  it("should show error message when using valid username and invalid password", () => {
    cy.get("[data-test=username]").type(testuserData.password);
    cy.get("[data-test=password]").type("fakepassword");
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=username-error]")
      .should("be.visible")
      .and("contain.text", "Unable to log in with provided credentials.");

    cy.get("[data-test=password-error]")
      .should("be.visible")
      .and("contain.text", "Unable to log in with provided credentials.");
  });
});
