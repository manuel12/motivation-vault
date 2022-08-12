/// <reference types="cypress" />

const testuserData = require("../../../fixtures/testuser.json");
const testuser2Data = require("../../../fixtures/register-user.json");

describe("Register", () => {
  beforeEach(() => {
    cy.deleteTestData();
    cy.visit("/");
    cy.get("[data-test=register-link]").click();
  });

  it("should match the previous screenshot of the successful register", () => {
    cy.get("[data-test=username]").type(testuser2Data.username);
    cy.get("[data-test=password]").type(testuser2Data.password);
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("be.visible");
    cy.get("[data-test=homepage]").should("be.visible")
    
    cy.get("[data-test=spinner]")
      .should("not.exist").then(() => {
        cy.get("[data-test=nav-list]").matchImageSnapshot();
      })
    
  });


  it("should match the previous screenshot of empty username and password fields", () => {
    cy.get("[data-test=submit-button]").click();

    cy.get("[data-test=header]").should("contain.text", "Motivation Vault");
    cy.get("[data-test=nav-list]").should("not.exist");
    cy.get("[data-test=homepage]").should("not.exist");

    cy.get("#root").matchImageSnapshot();
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});
