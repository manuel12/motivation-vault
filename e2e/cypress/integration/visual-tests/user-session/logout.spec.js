/// <reference types="cypress" />

describe("Visual Tests - Logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginWithAPI("testuser1", "testpass1");
  });

  it("should match the previous screenshot of the homepage", () => {
    cy.logoutWithUI();
    cy.get("form").should("be.visible");
    cy.matchImageSnapshot();
  });
});