/// <reference types="cypress" />

describe("404 Page not found", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should display a 404 page not found on a non-existent url the books, podcasts, podcast episodes and motivational speech sections", () => {
    cy.visit("/non-existant/url/");
    cy.get("[data-test=not-found]").should("be.visible").matchImageSnapshot();

    // Book section
    cy.visit("/books/non-existant/url/");
    cy.get("[data-test=not-found]").should("be.visible").matchImageSnapshot();

    // Podcast section
    cy.visit("/podcasts/non-existant/url/");
    cy.get("[data-test=not-found]").should("be.visible").matchImageSnapshot();

    // Podcast Episode section
    cy.visit("/podcasts-episodes/non-existant/url/");
    cy.get("[data-test=not-found]").should("be.visible").matchImageSnapshot();

    // Motivational Speech section
    cy.visit("/motivational-speeches/non-existant/url/");
    cy.get("[data-test=not-found]").should("be.visible").matchImageSnapshot();
  });
});
