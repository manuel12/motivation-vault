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

  it(`should display 'No resources to show' text on each resource section when the backend responds with an empty array`, () => {
    for (let page of pages) {
      page !== "home" ? (page = page + "/") : (page = "");
      cy.intercept(`/api/${page}`, []);
      cy.visit(`/${page}`);

      cy.get("[data-test=no-resources-text]")
        .should("be.visible")
        .matchImageSnapshot();
    }
  });
});
