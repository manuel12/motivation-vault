/// <reference types="cypress" />

import { getResourceTypePlural } from "../../support/utils";
const resourceAPIData = require("../../fixtures/resource-api-data.json");
const newResourceData = require("../../fixtures/resource-updated-api-data.json");
const testuserData = require("../../fixtures/testuser.json");
const adminuserData = require("../../fixtures/adminuser.json");

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`${resourceType} API 'PUT' request`, () => {
    const ctx = {};

    before(() => {
      cy.deleteTestData();
      cy.createResourceWithAPI(resourceType, resourceAPIData);

      cy.request({
        method: "GET",
        url: `http://localhost:8000/api/${getResourceTypePlural(
          resourceType
        )}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${adminuserData.token}`,
        },
      }).then((response) => {
        const newestResource = response.body[0];
        ctx.id = newestResource.id;
      });
    });

    it("should have status code 200", () => {
      cy.request({
        method: "PUT",
        url: `http://localhost:8000/api/${getResourceTypePlural(
          resourceType
        )}/${ctx.id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${adminuserData.token}`,
        },
        body: JSON.stringify(newResourceData),
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("should have updated fields with updated data", () => {
      cy.request({
        method: "PUT",
        url: `http://localhost:8000/api/${getResourceTypePlural(
          resourceType
        )}/${ctx.id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${adminuserData.token}`,
        },
        body: JSON.stringify(newResourceData),
      }).then((response) => {
        const newestResource = response.body;
        expect(newestResource).to.have.property("id");
        expect(newestResource).to.have.property("title", newResourceData.title);
        expect(newestResource).to.have.property(
          "author",
          newResourceData.author
        );
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
  });
}
