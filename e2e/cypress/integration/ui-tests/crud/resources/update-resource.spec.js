/// <reference types="cypress" />

import { getResourceTypePlural } from "../../../../support/utils";
const resourceAPIData = require("../../../../fixtures/resource-api-data.json");
const newResourceData = require("../../../../fixtures/resource-updated-data.json");

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`Update ${resourceType} Resources`, () => {
    // Prepare new data tom update resource with...
    const newData = {
      title: newResourceData.title,
      description: newResourceData.description,
    };

    if (resourceType === "book") {
      newData["subtitle"] = newResourceData.subtitle;
      newData["isbn"] = newResourceData.isbn;
    } else if (resourceType === "podcast") {
      newData["websiteUrl"] = newResourceData.websiteUrl;
      newData["spotifyUrl"] = newResourceData.spotifyUrl;
      newData["youtubeUrl"] = newResourceData.youtubeUrl;
    } else if (resourceType === "podcast-episode") {
      newData["podcast"] = newResourceData.podcast;
      newData["spotifyEpUrl"] = newResourceData.spotifyEpUrl;
      newData["youtubeEpUrl"] = newResourceData.youtubeEpUrl;
    } else {
      newData["youtubeEpUrl"] = newResourceData.youtubeUrl;
    }

    beforeEach(() => {
      // TODO: login with admin user.
      cy.loginAndCleanUp();
      cy.createResourceWithAPI(resourceType, resourceAPIData);
      cy.visit("/");
      cy.get("[data-test=app]").should("be.visible");
    });

    it(`Should update a ${resourceType} resource`, () => {
      // Wait for loading spinner to disappear.
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]")
            .children()
            .first()
            .should("contain.text", resourceAPIData.title)
            .click();
        });

      cy.url().then((detailpageUrl) => {
        cy.get("[data-test=edit-button]").should("be.visible").click();

        cy.url().should("contain", "/update/");

        cy.get("h3").should("contain.text", "Update Resource Form");

        cy.get("[data-test=title-input]").should(
          "have.value",
          resourceAPIData.title
        );
        cy.get("[data-test=author-input]").should(
          "have.value",
          resourceAPIData.author
        );
        cy.get("[data-test=description-input]").should(
          "have.value",
          resourceAPIData.description
        );

        cy.get("[data-test=image-url-input]").should(
          "have.value",
          resourceAPIData.imageUrl
        );

        if (resourceType === "book") {
          cy.get("[data-test=subtitle-input]").should(
            "have.value",
            resourceAPIData.subtitle
          );
          cy.get("[data-test=isbn-input]").should(
            "have.value",
            resourceAPIData.isbn
          );
        } else if (resourceType === "podcast") {
          cy.get("[data-test=website-url-input]").should(
            "have.value",
            resourceAPIData.website_url
          );
          cy.get("[data-test=spotify-page-url-input]").should(
            "have.value",
            resourceAPIData.spotify_page_url
          );
          cy.get("[data-test=youtube-page-url-input]").should(
            "have.value",
            resourceAPIData.youtube_page_url
          );
        } else if (resourceType === "podcast-episode") {
          cy.get("[data-test=select-podcast]").should(
            "have.value",
            resourceAPIData.from_podcast
          );
          cy.get("[data-test=spotify-ep-url-input]").should(
            "have.value",
            resourceAPIData.spotify_episode_url
          );
          cy.get("[data-test=youtube-ep-url-input]").should(
            "have.value",
            resourceAPIData.youtube_episode_url
          );
        } else {
          cy.get("[data-test=youtube-url-input]").should(
            "have.value",
            resourceAPIData.youtube_url
          );
        }

        cy.get("[data-test=value-one-input]").should(
          "have.value",
          resourceAPIData.value_one
        );
        cy.get("[data-test=value-two-input]").should(
          "have.value",
          resourceAPIData.value_two
        );
        cy.get("[data-test=value-three-input]").should(
          "have.value",
          resourceAPIData.value_three
        );

        cy.get("[data-test=submit]").should("not.be.enabled");

        cy.updateResourceFieldsWithUI(resourceType, newData);

        cy.get("[data-test=submit]").should("be.enabled").click();

        cy.url().should("contain", detailpageUrl);

        cy.get("[data-test=detail-page-container]")
          .should("contain", newResourceData.title)
          .and("contain", newResourceData.description);

        // cy.get("[data-test=update-successfull-message]");
      });
    });

    it(`should submit the ${resourceType} form by pressing ENTER when all required fields are filled`, () => {
      // Wait for loading spinner to disappear.
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]")
            .children()
            .first()
            .should("contain.text", resourceAPIData.title)
            .click();
        });

      cy.url().then((detailpageUrl) => {
        cy.get("[data-test=edit-button]").should("be.visible").click();

        cy.updateResourceFieldsWithUI(resourceType, newData);

        cy.get("[data-test=value-three-input]").type("{enter}");

        cy.url().should("contain", detailpageUrl);

        cy.get("[data-test=detail-page-container]").should(
          "contain",
          newResourceData.title
        );
      });
    });

    it(`should not create a new ${resourceType} resource when updating a ${resourceType}`, () => {
      // Wait for loading spinner to disappear.
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]")
            .children()
            .first()
            .should("contain.text", resourceAPIData.title)
            .click();
        });

      cy.get("[data-test=edit-button]").should("be.visible").click();

      cy.updateResourceFieldsWithUI(resourceType, newData);

      cy.get("[data-test=submit]").should("be.enabled").click();

      cy.visit(`/${getResourceTypePlural(resourceType)}/`);
      // Wait for loading spinner to disappear.
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]")
            .children()
            .contains(newData.title)
            .should("have.length", 1);
        });
    });

    it("should NOT display the edit button when logged in as a regular user", () => {
      cy.logoutWithUI();

      // TODO: login with admin user.
      cy.loginAndCleanUp();
      cy.get("[data-test=post-list-container]").children().first().click();

      cy.get("[data-test=edit-button]").should("not.exist");
    });

    afterEach(() => {
      cy.deleteTestData();
    });
  });
}

describe("Update Resource Cancel Button", () => {
  it("should go back to the previous page when clicking the cancel button", () => {
    for (const resourceType of resourceTypes) {
      cy.loginAndCleanUp();
      cy.createResourceWithAPI(resourceType, resourceAPIData);
      cy.visit("/");
      cy.get("[data-test=app]").should("be.visible");

      // Wait for loading spinner to disappear.
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]")
            .children()
            .first()
            .should("contain.text", resourceAPIData.title)
            .click();
        });

      cy.url().then((detailpageUrl) => {
        cy.get("[data-test=edit-button]").should("be.visible").click();
        cy.get("[data-test=cancel]").should("be.visible").click();

        cy.url().should("contain", detailpageUrl);
      });
    }
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});
