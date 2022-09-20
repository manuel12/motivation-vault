/// <reference types="cypress" />

import { getResourceTypePlural } from "../../support/utils";
const resourceAPIData = require("../../fixtures/resource-api-data.json");
const testuserData = require("../../fixtures/testuser.json");

const resourceTypes = [
  "book",
  "podcast",
  // "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`${resourceType} API 'GET' request`, () => {
    const ctx = {};

    before(() => {
      cy.deleteTestData();
      cy.createResourceWithAPI(resourceType, resourceAPIData);

      cy.request({
        method: "GET",
        url: `${Cypress.env('baseUrl')}api/${getResourceTypePlural(
          resourceType
        )}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env('adminToken')}`,
        },
      }).then((response) => {
        ctx.response = response;
      });
    });

    it(`should have status code 200, return JSON and have correct ${resourceType} fields`, () => {
      // Check status code 200
      expect(ctx.response.status).to.eq(200);

      // Return JSON
      expect(ctx.response.headers).to.have.property(
        "content-type",
        "application/json"
      );

      // Check ResourceType fields are correct
      const newestResource = ctx.response.body[0];
      expect(newestResource).to.have.property("id");
      expect(newestResource).to.have.property("title", resourceAPIData.title);
      expect(newestResource).to.have.property("author", resourceAPIData.author);
      expect(newestResource).to.have.property("description");
      expect(newestResource).to.have.property("imageURL");

      if (resourceType === "book") {
        expect(newestResource).to.have.property(
          "subtitle",
          resourceAPIData.subtitle
        );
        expect(newestResource).to.have.property(
          "isbn",
          String(resourceAPIData.isbn)
        );
      } else if (resourceType === "podcast") {
        expect(newestResource).to.have.property(
          "website_url",
          resourceAPIData.website_url
        );
        expect(newestResource).to.have.property(
          "spotify_page_url",
          resourceAPIData.spotify_page_url
        );
        expect(newestResource).to.have.property(
          "youtube_page_url",
          resourceAPIData.youtube_page_url
        );
      } else if (resourceType === "podcast-episode") {
        expect(newestResource).to.have.property(
          "from_podcast",
          resourceAPIData.from_podcast
        );
        expect(newestResource).to.have.property(
          "youtube_episode_url",
          resourceAPIData.youtube_episode_url
        );
        expect(newestResource).to.have.property(
          "spotify_episode_url",
          resourceAPIData.spotify_episode_url
        );
      } else {
        expect(newestResource).to.have.property(
          "youtube_url",
          resourceAPIData.youtube_url
        );
      }

      expect(newestResource).to.have.property("avg_rating", 0);
      expect(newestResource).to.have.property("num_ratings", 0);
    });
  });
}
