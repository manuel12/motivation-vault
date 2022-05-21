/// <reference types="cypress" />
import { getResourceTypePlural } from "../../support/utils";
const resourceData = require("../../fixtures/resource-data.json");
const invalidResourceData = require("../../fixtures/invalid-resource-data.json");

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`Create ${resourceType} Resources`, () => {
    const capitalizedResouceTypes = {
      book: "Book",
      podcast: "Podcast",
      "podcast-episode": "Podcast Episode",
      "motivational-speech": "Motivational Speech",
    };
    const capitalizedResouceType = capitalizedResouceTypes[resourceType];

    beforeEach(() => {
      cy.loginAndCleanUp();
      cy.get("[data-test=app]").should("be.visible");
    });

    it(`should create a ${resourceType} resource`, () => {
      cy.createResourceWithUI(resourceType, resourceData);

      cy.url().should("not.contain", "add/");
      cy.get("[data-test=add-container]").should("not.exist");

      // Check resource is displayed first on homepage.
      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);

      // Check resource is displayed first on resource type page.
      cy.visit(`/${getResourceTypePlural(resourceType)}/`);
      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);

      cy.get("[data-test=post-container]").first().click();

      // Check resource is displayed first on detail page.
      cy.get("[data-test=detail-page-container]")
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description)
        .and("contain", resourceData.valueOne)
        .and("contain", resourceData.valueTwo)
        .and("contain", resourceData.valueThree);
    });

    it(`should create a ${resourceType} resource filling required fields only`, () => {
      cy.createResourceWithUI(resourceType, resourceData, true);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author);
    });

    it(`should NOT submit a ${resourceType} form without filling required fields`, () => {
      cy.visit("/add/");
      cy.get("[data-test=add-container]").should("be.visible");

      cy.get("[data-test=select-resource-type]").select(capitalizedResouceType);

      cy.get("[data-test=submit]").click();

      cy.url().should("contain", "add/");

      cy.get("[data-test=title-input-error]").should("be.visible");
      cy.get("[data-test=author-input-error]").should("be.visible");

      if (resourceType === "book") {
        cy.get("[data-test=subtitle-input-error]").should("be.visible");
        cy.get("[data-test=isbn-input-error]").should("be.visible");
      } else if (resourceType === "podcast") {
        cy.get("[data-test=website-url-input-error]").should("be.visible");
        cy.get("[data-test=spotify-page-url-input-error]").should("be.visible");
        cy.get("[data-test=youtube-page-url-input-error]").should("be.visible");
      } else if (resourceType === "podcast-episode") {
        cy.get("[data-test=select-podcast-error]").should("be.visible");
        cy.get("[data-test=spotify-ep-url-input-error]").should("be.visible");
        cy.get("[data-test=youtube-ep-url-input-error]").should("be.visible");
      } else {
        cy.get("[data-test=youtube-url-input-error]").should("be.visible");
      }
    });

    it(`should NOT create a ${resourceType} resource with invalid data`, () => {
      cy.createResourceWithUI(resourceType, invalidResourceData);

      cy.url().should("contain", "add/");

      if (resourceType === "book") {
        cy.get("[data-test=isbn-input-error]")
          .should("be.visible")
          .and("contain.text", "ISBN has to be a 13 digits!");
      } else if (resourceType === "podcast") {
        cy.get("[data-test=website-url-input-error]")
          .should("be.visible")
          .and("contain.text", "Website URL has to be a valid url!");
        cy.get("[data-test=spotify-page-url-input-error]")
          .should("be.visible")
          .and("contain.text", "Spotify URL has to be a valid url!");
        cy.get("[data-test=youtube-page-url-input-error]")
          .should("be.visible")
          .and("contain.text", "Youtube URL has to be a valid url!");
      } else if (resourceType === "podcast-episode") {
        cy.get("[data-test=spotify-ep-url-input-error]")
          .should("be.visible")
          .and("contain.text", "Spotify episode URL has to be a valid url!");
        cy.get("[data-test=youtube-ep-url-input-error]")
          .should("be.visible")
          .and("contain.text", "Youtube episode URL has to be a valid url!");
      } else {
        cy.get("[data-test=youtube-url-input-error]")
          .should("be.visible")
          .and("contain.text", "Youtube URL has to be a valid URL!");
      }
    });

    it(`should create a ${resourceType} resource by pressing ENTER when all form fields are filled`, () => {
      cy.visit("/add/");
      cy.get("[data-test=select-resource-type]").select(capitalizedResouceType);

      cy.get("[data-test=title-input]").type(resourceData.title);
      cy.get("[data-test=author-input]").type(resourceData.author);

      if (resourceType === "book") {
        cy.get("[data-test=subtitle-input]").type(resourceData.subtitle);
        cy.get("[data-test=isbn-input]").type(resourceData.isbn);
      } else if (resourceType === "podcast") {
        cy.get("[data-test=website-url-input]").type(resourceData.websiteUrl);
        cy.get("[data-test=spotify-page-url-input]").type(
          resourceData.spotifyUrl
        );
        cy.get("[data-test=youtube-page-url-input]").type(
          resourceData.youtubeUrl
        );
      } else if (resourceType === "podcast-episode") {
        cy.get("[data-test=select-podcast]").select("Impact Theory");
        cy.get("[data-test=spotify-ep-url-input]").type(
          resourceData.spotifyEpUrl
        );
        cy.get("[data-test=youtube-ep-url-input]").type(
          resourceData.youtubeEpUrl
        );
      } else {
        cy.get("[data-test=youtube-url-input]").type(resourceData.youtubeUrl);
      }

      cy.get("[data-test=description-input]").type(resourceData.description);

      cy.get("[data-test=value-one-input]").type(resourceData.valueOne);
      cy.get("[data-test=value-two-input]").type(resourceData.valueTwo);
      cy.get("[data-test=value-three-input]").type(
        `${resourceData.valueThree}{enter}`
      );

      cy.url().should("not.contain", "add/");
      cy.get("[data-test=add-container]").should("not.exist");

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });

    after(() => {
      cy.deleteTestData();
    });
  });
}
