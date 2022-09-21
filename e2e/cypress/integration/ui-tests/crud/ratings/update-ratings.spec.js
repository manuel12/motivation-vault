/// <reference types="cypress" />

import { getResourceIdFromUrl } from "../../../../support/utils";

const resourceAPIData = require("../../../../fixtures/resource-api-data.json");
const tokenData = require("../../../../fixtures/tokens.json");

let pages = ["books", "podcasts", "podcast-episodes", "motivational-speeches"];

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

describe("Update Ratings", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });

  for (const page of pages) {
    it(`should update rating on ${page} once it has been updated on detailpage`, () => {
      const numStarsFirstRating = 1;
      const numStarsUpdatedRating = 4;

      let resourceType = getResourceTypeFromPage(page);
      cy.log(resourceType);

      // Change resource title, create resource and check on page section
      resourceAPIData.title = "[Test Title] - Ratings";
      cy.createPodcastForPodcastEpisodeTests(
        resourceType,
        resourceAPIData
      ).then(() => {
        cy.createResourceWithAPI(resourceType, resourceAPIData);
      });
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
});
