/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-data.json");
const invalidResourceData = require("../../fixtures/invalid-resource-data.json");

describe("Create Podcast Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should create a podcast resource", () => {
    cy.createResourceWithUI("podcast", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created podcast resource on podcast section", () => {
    cy.createResourceWithUI("podcast", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.visit("/podcasts/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created podcast resource on detail page", () => {
    cy.createResourceWithUI("podcast", resourceData);

    cy.url().should("not.contain", "podcast/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]").first().click();

    cy.get("[data-test=detail-page-container]")
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description)
      .and("contain", resourceData.valueOne)
      .and("contain", resourceData.valueTwo)
      .and("contain", resourceData.valueThree);
  });

  it("should create a podcast resource filling required fields only", () => {
    cy.createResourceWithUI("podcast", resourceData, true);
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author);
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

  it("should NOT create a podcast resource with invalid data", () => {
    cy.createResourceWithUI("podcast", invalidResourceData);

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

  it("should create a podcast resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast");

    cy.get("[data-test=title-input]").type(resourceData.title);
    cy.get("[data-test=author-input]").type(resourceData.author);
    cy.get("[data-test=description-input]").type(resourceData.description);

    cy.get("[data-test=website-url-input]").type(resourceData.websiteUrl);
    cy.get("[data-test=spotify-page-url-input]").type(
      resourceData.spotifyUrl
    );
    cy.get("[data-test=youtube-page-url-input]").type(
      resourceData.youtubeUrl
    );

    cy.get("[data-test=value-one-input]").type(resourceData.valueOne);
    cy.get("[data-test=value-two-input]").type(resourceData.valueTwo);
    cy.get("[data-test=value-three-input]").type(
      `${resourceData.valueThree}{enter}`
    );

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
