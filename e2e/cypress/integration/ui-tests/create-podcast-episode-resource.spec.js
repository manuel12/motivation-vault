/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-data.json");
const invalidResourceData = require("../../fixtures/invalid-resource-data.json");

describe("Create Podcast Episode Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should create a podcast episode resource", () => {
    cy.createResourceWithUI("podcast-episode", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created podcast episode resource on podcast episode section", () => {
    cy.createResourceWithUI("podcast-episode", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.visit("/podcast-episodes/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created podcast episode resource on detail page", () => {
    cy.createResourceWithUI("podcast-episode", resourceData);

    cy.url().should("not.contain", "podcast-episode/");
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

  it("should create a podcast episode resource filling required fields only", () => {
    cy.createResourceWithUI("podcast-episode", resourceData, true);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author);
  });

  it("should NOT submit podcast episode without filling required fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast Episode");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=title-input-error]").should("be.visible");
    cy.get("[data-test=author-input-error]").should("be.visible");

    cy.get("[data-test=select-podcast-error]").should("be.visible");
    cy.get("[data-test=spotify-ep-url-input-error]").should("be.visible");
    cy.get("[data-test=youtube-ep-url-input-error]").should("be.visible");
  });

  it("should NOT create a podcast episode resource with invalid data", () => {
    cy.createResourceWithUI("podcast-episode", invalidResourceData);

    cy.url().should("contain", "add/");

    cy.get("[data-test=spotify-ep-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Spotify episode URL has to be a valid url!");

    cy.get("[data-test=youtube-ep-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube episode URL has to be a valid url!");
  });

  it("should create a podcast episode resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast Episode");

    cy.get("[data-test=title-input]").type(resourceData.title);
    cy.get("[data-test=author-input]").type(resourceData.author);
    cy.get("[data-test=description-input]").type(resourceData.description);

    cy.get("[data-test=select-podcast]").select("Impact Theory");

    cy.get("[data-test=spotify-ep-url-input]").type(
      resourceData.spotifyEpUrl
    );
    cy.get("[data-test=youtube-ep-url-input]").type(
      resourceData.youtubeEpUrl
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
