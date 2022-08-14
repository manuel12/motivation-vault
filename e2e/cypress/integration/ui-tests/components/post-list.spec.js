/// <reference types="cypress" />

describe("Post List", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });

  it("should display posts on post-list when post data is available", () => {
    // Wait for loading spinner to dissapear.
    cy.get("[data-test=spinner]")
      .should("not.exist").then(() => {

      cy.get("[data-test=post-list-container]")
        .children()
        .each(($child) => {
          cy.get($child).within(($elem) => {
            cy.get("[data-test=post-image]").should("be.visible")
            cy.get("[data-test=post-title]").should("be.visible")
            cy.get("[data-test=post-author]").should("be.visible")
          })
        });
    });
  });

  it("should display a loading spinner when there is no data", () => {
    cy.intercept("http://127.0.0.1:8000/api/", []);
    cy.visit("/");
    cy.get("[data-test=spinner]").should("be.visible");
  });
});
