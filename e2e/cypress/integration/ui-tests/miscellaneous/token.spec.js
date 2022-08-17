/// <reference types="cypress" />

const testuserData = require("../../../fixtures/testuser.json");

describe("Token", () => {
  beforeEach(() => {
    cy.deleteTestData();
    cy.visit("/");
  });

  it("should redirect the logged in user to authentication after altering the token", () => {
    cy.loginWithUI();
    cy.get("[data-test=homepage]").should(() => {
      cy.log("Altering the token...")

      localStorage.setItem("token", 12345)
      let token = JSON.parse(localStorage.getItem("token"))
      expect(token).to.eq(12345);
    });

    cy.reload()
    cy.get("[data-test=login-container]").should("be.visible")
  });

  it("should redirect the logged in user to authentication after deleting the token", () => {
    cy.loginWithUI();
    cy.get("[data-test=homepage]").should(() => {
      cy.log("Deleting the token...")

      delete localStorage.token
      let token = JSON.parse(localStorage.getItem("token"))
      expect(token).to.eq(null);
    })

    cy.reload()
    cy.get("[data-test=login-container]").should("be.visible")
  });

  it("should redirect the user with an invalid token to authentication", () => {
    cy.get("[data-test=login-container]").then(() => {
      cy.log("Adding invalid token...")

      localStorage.setItem("token", "invalid-token12345");
      let token = localStorage.getItem("token")
      expect(token).to.eq("invalid-token12345");
    })

    cy.reload()
    cy.get("[data-test=login-container]").should("be.visible")
  });
});
