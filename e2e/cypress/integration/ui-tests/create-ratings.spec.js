/// <reference types="cypress" />

import { getResourceIdFromUrl } from "../../support/utils";

const resourceData = require("../../fixtures/resource-api-data.json");
const tokenData = require("../../fixtures/tokens.json");

let pages = [
  "home",
  "books",
  "podcasts",
  "podcast-episodes",
  "motivational-speeches",
];

const getResourceTypeFromPage = (page) => {
  const resourceTypes = {
    books: "book",
    podcasts: "podcast",
    "podcast-episodes": "podcast-episode",
    "motivational-speeches": "motivational-speech",
  };
  cy.log(`page: ${page} - resourceTypes[page]: ${resourceTypes[page]}`);
  return resourceTypes[page];
};

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
    cy.createResourceWithAPI("book", resourceData);

    cy.visit("/");
    cy.contains("[Test Title]").click({ force: true });
  });

  it("should display ratings section on detail page", () => {
    cy.get("[data-test=ratings-container]").should("be.visible");
  });

  const stars = [1, 2, 3, 4, 5];
  stars.forEach((star) => {
    const starStr = star > 1 ? "stars" : "star";
    it(`should create ratings with ${star} ${starStr} to a resource`, () => {
      cy.createRatingWithUI(star);
      checkStars(star);

      cy.get("[data-test=num-ratings]")
        .should("contain.text", "1")
        .and("contain.text", "rating");
    });
  });

  // Remove "home" page from array as we only need
  // the detailpages for the 4 resource types.
  pages.splice(0, 1);

  for (const page of pages) {
    it(`should update rating on ${page} once it has been updated on detailpage`, () => {
      const numStarsFirstRating = 1;
      const numStarsUpdatedRating = 4;

      let resourceType = getResourceTypeFromPage(page);
      cy.log(resourceType);

      // Change resource title, create resource and check on page section
      resourceData.title = "[Test Title] - Ratings";
      cy.createResourceWithAPI(resourceType, resourceData);
      cy.visit(page);

      // Click on new resource, wait for heading to appear and
      // create rating.
      cy.contains("[Test Title] - Ratings").click({ force: true });
      cy.get("[data-test=heading]").should("be.visible");
      cy.createRatingWithUI(numStarsFirstRating);

      // Check ratings container on page section.
      cy.visit(page);
      cy.get("[data-test=ratings-container]")
        .first()
        .within(() => {
          checkStars(numStarsFirstRating);
        })
        .click();

      // Update rating, check page section and updated number of stars.
      cy.createRatingWithUI(numStarsUpdatedRating);
      cy.visit(page);
      cy.get("[data-test=ratings-container]")
        .first()
        .within(() => {
          checkStars(numStarsUpdatedRating);
        });
    });
  }

  it("should display the text (0 ratings) in case of having more than 0 ratings", () => {
    cy.get("[data-test=num-ratings]").should("contain.text", "(0 ratings)");
  });

  it("should display the text (1 rating) in case of having only 1 rating", () => {
    cy.createRatingWithUI(5);

    cy.get("[data-test=num-ratings]").should("contain.text", "(1 rating)");
  });

  it("should display the text (2 ratings) in case of having 2 ratings", () => {
    const testuser2Token = tokenData["testuser2"];
    const testuser3Token = tokenData["testuser3"];

    // Get resourceId and add 2 ratings from different user to said resourceId.
    cy.location().then((loc) => {
      const resourceId = getResourceIdFromUrl(loc);
      cy.createRatingWithAPI(resourceId, 5, testuser2Token);
      cy.createRatingWithAPI(resourceId, 5, testuser3Token);
    });

    cy.reload();
    cy.get("[data-test=num-ratings]").should("contain.text", "(2 ratings)");
  });

  after(() => {
    cy.deleteTestData();
  });
});
