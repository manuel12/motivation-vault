/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should login with valid username and password", () => {
    cy.get("#username").type("Manuel");
    cy.get("#password").type("Superuser1");
    cy.get("#submitButton").click();

    cy.get("h1").should("contain.text", "Resource API Project");
    cy.get(".nav-list").should("be.visible");
    cy.get(".homepage").should("be.visible");
  });

  it("should NOT login with valid username and invalid password", () => {
    cy.get("#username").type("Manuel");
    cy.get("#password").type("fakepassword");
    cy.get("#submitButton").click();

    cy.get("h1").should("contain.text", "Login");
    cy.get(".nav-list").should("not.exist");
    cy.get(".homepage").should("not.exist");
  });

  it("should NOT login with empty username and password fields", () => {
    cy.get("#submitButton").click();

    cy.get("h1").should("contain.text", "Login");
    cy.get(".nav-list").should("not.exist");
    cy.get(".homepage").should("not.exist");
  });

  it("should have focus on username input", () => {
    cy.focused().should("have.id", "username");
  });

  it("should login when pressing ENTER from input field", () => {
    cy.get("#username").type("Manuel");
    cy.get("#password").type("Superuser1{enter}");

    cy.get("h1").should("contain.text", "Resource API Project");
    cy.get(".nav-list").should("be.visible");
    cy.get(".homepage").should("be.visible");
  });
});
