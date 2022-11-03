/// <reference types="cypress" />

import { getResourceTypePlural } from "../../support/utils";
const resourceAPIData = require("../../fixtures/resource-api-data.json");
const newResourceData = require("../../fixtures/resource-updated-api-data.json");

const resourceTypes = [
  // "book",
  // "podcast",
  "podcast-episode",
  // "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`${resourceType} API 'PUT' request`, () => {
    const ctx = {};

    before(() => {
      cy.deleteTestData();
      cy.createPodcastForPodcastEpisodeTests(
        resourceType,
        resourceAPIData
      ).then(() => {
        console.log(resourceAPIData)

        // Make sure newResourceData uses the same podcast id from
        // resourceAPIData, instead of a hardcoded id from the json
        // that could be non-existing.
        newResourceData["from_podcast"] = resourceAPIData["from_podcast"]
        cy.createResourceWithAPI(resourceType, resourceAPIData);
      });

      cy.request({
        method: "GET",
        url: `${Cypress.config("baseUrl")}api/${getResourceTypePlural(
          resourceType
        )}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.config("adminToken")}`,
        },
      }).then((response) => {
        const newestResource = response.body[0];

        cy.request({
          method: "PUT",
          url: `${Cypress.config("baseUrl")}api/${getResourceTypePlural(
            resourceType
          )}/${newestResource.id}/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token  ${Cypress.config("adminToken")}`,
          },
          body: JSON.stringify(newResourceData),
        }).then((response) => {
          ctx.response = response;
        });
      });
    });

    it("should have status code 200 and have correct fields with updated data", () => {
      // Check status code 200
      expect(ctx.response.status).to.eq(200);

      // Check ResourceType fields are correct
      const newestResource = ctx.response.body;
      expect(newestResource).to.have.property("id");
      expect(newestResource).to.have.property("title", newResourceData.title);
      expect(newestResource).to.have.property("author", newResourceData.author);
      expect(newestResource).to.have.property("description");
      expect(newestResource).to.have.property("imageURL");

      if (resourceType === "book") {
        expect(newestResource).to.have.property(
          "subtitle",
          newResourceData.subtitle
        );
        expect(newestResource).to.have.property(
          "isbn",
          Number(newResourceData.isbn).toString()
        );
      } else if (resourceType === "podcast") {
        expect(newestResource).to.have.property(
          "website_url",
          newResourceData.website_url
        );
        expect(newestResource).to.have.property(
          "spotify_page_url",
          newResourceData.spotify_page_url
        );
        expect(newestResource).to.have.property(
          "youtube_page_url",
          newResourceData.youtube_page_url
        );
      } else if (resourceType === "podcast-episode") {
        expect(newestResource).to.have.property(
          "from_podcast",
          newResourceData.from_podcast
        );
        expect(newestResource).to.have.property(
          "youtube_episode_url",
          newResourceData.youtube_episode_url
        );
        expect(newestResource).to.have.property(
          "spotify_episode_url",
          newResourceData.spotify_episode_url
        );
      } else {
        expect(newestResource).to.have.property(
          "youtube_url",
          newResourceData.youtube_url
        );
      }

      expect(newestResource).to.have.property("avg_rating", 0);
      expect(newestResource).to.have.property("num_ratings", 0);
    });
  });
}
