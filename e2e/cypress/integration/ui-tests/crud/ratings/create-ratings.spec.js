/// <reference types="cypress" />

import { getResourceIdFromUrl } from "../../../../support/utils";

const resourceAPIData = require("../../../../fixtures/resource-api-data.json");
const tokenData = require("../../../../fixtures/tokens.json");

if (Cypress.config("baseUrl") === "http://react-django-api16.herokuapp.com/")
  tokenData["testuser2"] = "6c18e495c5e86b7594a75bbfa0647c0bf86b67a6";

const checkStars = (stars) => {
  let i = 1;
  while (i <= stars) {
    cy.get(`[data-test=star-icon-${i}]`)
      .should("be.visible")
      .invoke("attr", "class")
      .should("contain", "orange");
    i++;
  }
};

describe("Create Ratings", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.createResourceWithAPI("book", resourceAPIData);

    cy.visit("/");
    cy.contains(resourceAPIData.title).click({ force: true });
  });

  it(`should create ratings with 1, 2, 3, 4, 5 star(s)`, () => {
    const stars = [1, 2, 3, 4, 5];
    stars.forEach((star) => {
      cy.createRatingWithUI(star);
      checkStars(star);

      cy.get("[data-test=num-ratings]")
        .should("contain.text", "1")
        .and("contain.text", "rating");
    });

    cy.get("[data-test=ratings-container]").matchImageSnapshot();
  });

  it("should display the text 'rating' or 'ratings' depending on how many ratings the resource has", () => {
    // 0 ratings.
    cy.get("[data-test=num-ratings]")
      .should("contain.text", "(0 ratings)")
      .matchImageSnapshot("(0 ratings)");

    // 1 rating.
    cy.createRatingWithUI(5);
    cy.get("[data-test=num-ratings]")
      .should("contain.text", "(1 rating)")
      .matchImageSnapshot("(1 rating)");

    // Create 2nd ratings via API using a different testuser's token.
    cy.location().then((loc) => {
      const resourceId = getResourceIdFromUrl(loc);
      cy.createRatingWithAPI(resourceId, 5, tokenData["testuser2"]);
    });

    // 2 ratings.
    cy.reload();
    cy.get("[data-test=num-ratings]")
      .should("contain.text", "(2 ratings)")
      .matchImageSnapshot("(2 ratings)");
  });

  after(() => {
    cy.deleteTestData();
  });
});
