/// <reference types="cypress" />

describe("Sandbox experiments", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginAndCleanUp();
  });

  it("About page - should display about page", () => {
    cy.get("[data-test=post-container]")
    .first()
    .within(() => {
      cy.get("[data-test=post-image]")
        .should("be.visible").and(($img) => {
          console.log($img[0].naturalWidth)
        })
      
    })
  });
});
