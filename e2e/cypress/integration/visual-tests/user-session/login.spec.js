/// <reference types="cypress" />

describe("Visual Tests - Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginWithAPI("testuser1", "testpass1");
  });

  it("should match the previous screenshot of the homepage", () => {
    cy.get("[data-test=header]").should("be.visible").matchImageSnapshot();
  });
});
