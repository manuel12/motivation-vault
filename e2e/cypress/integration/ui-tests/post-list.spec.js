/// <reference types="cypress" />

describe("Post List", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });

  it("should display posts on post-list", () => {
    cy.get("[data-test=post-list-container]")
      .children()
      .each(($child) => {
        cy.get($child)
          .invoke("attr", "class")
          .should("contain", "post-container");
      });
  });

  it("should display 'no resource data' heading", () => {
    cy.intercept("http://127.0.0.1:8000/api/", []);
    cy.visit("/");
    cy.get("h2").should("have.text", "No resoure data...");
  });
});
