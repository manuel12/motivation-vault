/// <reference types="cypress" />

describe("Navbar", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.visit("/");
  });

  it("should have the home link active by default on navbar", () => {
    cy.url().should("eq", Cypress.env('baseUrl'));

    cy.get("[data-test=home-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });

  it("should go to 'Add' section when clicking on 'Add+ on navbar", () => {
    cy.get("[data-test=add-link]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=add-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });

  it("should go to the 'Books' section when clicking on 'Books' on navbar", () => {
    cy.get("[data-test=books-link]")
      .invoke("attr", "class")
      .should("not.contain", "active");

    cy.get("[data-test=books-link]").click();

    cy.url().should("contain", "books/");

    cy.get("[data-test=books-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });

  it("should go to the 'Podcasts' section when clicking on 'Podcasts' on navbar", () => {
    cy.get("[data-test=podcasts-link]")
      .invoke("attr", "class")
      .should("not.contain", "active");

    cy.get("[data-test=podcasts-link]").click();

    cy.url().should("contain", "podcasts/");

    cy.get("[data-test=podcasts-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });

  it("should go to the 'Podcasts Episodes' section when clicking on 'Podcasts Episodes' on navbar", () => {
    cy.get("[data-test=podcast-episodes-link]")
      .invoke("attr", "class")
      .should("not.contain", "active");

    cy.get("[data-test=podcast-episodes-link]").click();

    cy.url().should("contain", "podcast-episodes/");

    cy.get("[data-test=podcast-episodes-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });

  it("should go to the 'Motivational Speeches' section when clicking on 'Motivational Speeches' on navbar", () => {
    cy.get("[data-test=motivational-speeches-link]").click();

    cy.url().should("contain", "motivational-speeches/");

    cy.get("[data-test=motivational-speeches-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });

  it("should go to the 'About' section when clicking on 'About' on the navbar", () => {
    cy.get("[data-test=about-link]")
      .invoke("attr", "class")
      .should("not.contain", "active");

    cy.get("[data-test=about-link]").click();

    cy.url().should("contain", "about/");

    cy.get("[data-test=about-link]")
      .invoke("attr", "class")
      .should("contain", "active");
  });
});
