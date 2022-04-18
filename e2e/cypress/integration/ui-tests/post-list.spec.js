/// <reference types="cypress" />

describe("Header", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });

  it("should display posts on post-list", () => {
    cy.get("[data-test=post-list-container]")
      .children()
      .each(($child) => {
        cy.get($child)
          .invoke("attr", "class")
          .should("contain", "post-container")
      })
  })
  
})