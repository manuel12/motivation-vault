/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-data.json");
const invalidResourceData = require("../../fixtures/invalid-resource-data.json");

describe("Create Motivational Speech Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should create a motivational speech resource", () => {
    cy.createResourceWithUI("motivational-speech", resourceData);
    
    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created motivational speech resource on motivational speech section", () => {
    cy.createResourceWithUI("motivational-speech", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.visit("/motivational-speeches/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created motivational speech on detail page", () => {
    cy.createResourceWithUI("motivational-speech", resourceData);

    cy.url().should("not.contain", "motivational-speech/");
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

  it("should create a motivational speech resource filling required fields only", () => {
    cy.createResourceWithUI("motivational-speech", resourceData, true);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author);
  });

  it("should NOT submit motivational speech form without filling required fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Motivational Speech");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=title-input-error]").should("be.visible");
    cy.get("[data-test=author-input-error]").should("be.visible");
    cy.get("[data-test=youtube-url-input-error]").should("be.visible");
  });

  it("should NOT create a motivational speech resource with invalid data", () => {
    cy.createResourceWithUI("motivational-speech", invalidResourceData);

    cy.url().should("contain", "add/");

    cy.get("[data-test=youtube-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL has to be a valid URL!");
  });

  it("should create a motivational speech resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Motivational Speech");

    cy.get("[data-test=title-input]").type(resourceData.title);
    cy.get("[data-test=author-input]").type(resourceData.author);
    cy.get("[data-test=description-input]").type(resourceData.description);

    cy.get("[data-test=youtube-url-input]").type(resourceData.youtubeUrl);

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
