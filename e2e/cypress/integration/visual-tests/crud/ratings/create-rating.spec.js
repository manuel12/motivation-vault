/// <reference types="cypress" />

import { getResourceIdFromUrl }  from "../../../../support/utils";

const resourceAPIData = require("../../../../fixtures/resource-api-data.json");
const tokenData = require("../../../../fixtures/tokens.json");

const testuser1Token = tokenData["testuser1"];

describe("Visual Tests - Create Rating", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginAndCleanUp("testuser1", "testpass1");
    cy.createResourceWithAPI("book", resourceAPIData);

    cy.visit("/");
    cy.contains(resourceAPIData.title).click({force: true});
  });

  const stars = [1, 2, 3, 4, 5];
  stars.forEach((star) => {
    const starStr = star > 1 ? "stars" : "star";
    
    it(`should match the previous screenshot with ${star} ${starStr}`, () => {
      cy.location().then((loc) => {
        const resourceId = getResourceIdFromUrl(loc);
        cy.createRatingWithAPI(resourceId, star, testuser1Token);
        cy.visit(`/${resourceId}/`)
    
        cy.get("[data-test=ratings-container]").matchImageSnapshot();
      });
    });
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});
