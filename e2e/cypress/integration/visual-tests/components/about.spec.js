/// <reference types="cypress" />

describe("Visual Tests - About", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginWithAPI("testuser1", "testpass1");
  });

  it("About - should match previous screenshot of about page", () => {
    cy.visit("/about");
    cy.get("[data-test=about-page-container]").should("be.visible");
    cy.matchImageSnapshot();
  });
});
