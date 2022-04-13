/// <reference types="cypress" />

const resourceTestData = require("../../fixtures/resourceTestData.json");
const resourceInvalidTestData = require("../../fixtures/invalidResourceTestData.json");

describe("Add Podcast Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should add a podcast resource", () => {
    cy.addResourceWithUI("podcast", resourceTestData);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  it("should display added podcast resource on podcast section", () => {
    cy.addResourceWithUI("podcast", resourceTestData);

    cy.visit("/podcasts/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  it("should display added podcast resource on detail page", () => {
    cy.addResourceWithUI("podcast", resourceTestData);

    cy.url().should("not.contain", "podcast/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]").first().click();

    cy.get("[data-test=detail-page-container]")
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description)
      .and("contain", resourceTestData.valueOne)
      .and("contain", resourceTestData.valueTwo)
      .and("contain", resourceTestData.valueThree);
  });

  it("should add a podcast resource filling required fields only", () => {
    cy.addResourceWithUI("podcast", resourceTestData, true);
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author);
  });

  it("should NOT submit podcast form without filling required fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=title-input-error]").should("be.visible");
    cy.get("[data-test=author-input-error]").should("be.visible");
    cy.get("[data-test=website-url-input-error]").should("be.visible");
    cy.get("[data-test=spotify-page-url-input-error]").should("be.visible");
    cy.get("[data-test=youtube-page-url-input-error]").should("be.visible");
  });

  it("should NOT add a podcast resource with invalid data", () => {
    cy.addResourceWithUI("podcast", resourceInvalidTestData);

    cy.url().should("contain", "add/");

    cy.get("[data-test=website-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Website URL has to be a valid url!");

    cy.get("[data-test=spotify-page-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Spotify URL has to be a valid url!");

    cy.get("[data-test=youtube-page-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL has to be a valid url!");
  });

  it("should add a podcast resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast");

    cy.get("[data-test=title-input]").type(resourceTestData.title);
    cy.get("[data-test=author-input]").type(resourceTestData.author);
    cy.get("[data-test=description-input]").type(resourceTestData.description);

    cy.get("[data-test=website-url-input]").type(resourceTestData.websiteUrl);
    cy.get("[data-test=spotify-page-url-input]").type(
      resourceTestData.spotifyUrl
    );
    cy.get("[data-test=youtube-page-url-input]").type(
      resourceTestData.youtubeUrl
    );

    cy.get("[data-test=value-one-input]").type(resourceTestData.valueOne);
    cy.get("[data-test=value-two-input]").type(resourceTestData.valueTwo);
    cy.get("[data-test=value-three-input]").type(
      `${resourceTestData.valueThree}{enter}`
    );

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  after(() => {
    cy.deleteTestData();
  });
});
