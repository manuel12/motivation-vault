/// <reference types="cypress" />

const pages = [
  "home",
  "books",
  "podcasts",
  "podcast-episodes",
  "motivational-speeches",
];

describe("No Resource Text", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });

  for (const page of pages) {
    it(`should display 'No resources to show' text on ${page} section when the backend responds with an empty array`, () => {

      if (page == "home") {
        cy.intercept(`/api/`, []);
        cy.visit(`/`);
      } else {
        cy.intercept(`/api/${page}/`, []);
        cy.visit(`/${page}/`);
      }

      cy.get("[data-test=no-resources-text]").should("be.visible");
    });
  }
});
