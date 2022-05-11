/// <reference types="cypress" />

const testuserData = require("../../fixtures/register-user.json");
const testuser2Data = require("../../fixtures/testuser.json");

describe("Register", () => {
  beforeEach(() => {
    cy.deleteTestData();
    cy.visit("/");
    cy.get("[data-test=register-link]").click();
  });

  it("should register with valid username and password", () => {
    cy.get("[data-test=username]").type(testuserData.username);
    cy.get("[data-test=password]").type(testuserData.password);
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible");
  });

  it("should NOT register with existing username and password", () => {
    cy.get("[data-test=username]").type(testuser2Data.username);
    cy.get("[data-test=password]").type(testuser2Data.password);
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });

  it("should NOT register with empty username and password fields", () => {
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});
