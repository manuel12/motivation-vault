/// <reference types="cypress" />

const resourceTestData = require("../../fixtures/resourceTestData.json");
const resourceInvalidTestData = require("../../fixtures/invalidResourceTestData.json");

describe("Add Motivational Speech Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should add a motivational speech resource", () => {
    cy.addResourceWithUI("motivational-speech", resourceTestData);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  it("should display added motivational speech resource on motivational speech section", () => {
    cy.addResourceWithUI("motivational-speech", resourceTestData);

    cy.visit("/motivational-speeches/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  it("should display added motivational speech on detail page", () => {
    cy.addResourceWithUI("motivational-speech", resourceTestData);

    cy.url().should("not.contain", "motivational-speech/");
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

  it("should add a motivational speech resource filling required fields only", () => {
    cy.addResourceWithUI("motivational-speech", resourceTestData, true);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author);
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

  it("should NOT add a motivational speech resource with invalid data", () => {
    cy.addResourceWithUI("motivational-speech", resourceInvalidTestData);

    cy.url().should("contain", "add/");

    cy.get("[data-test=youtube-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL has to be a valid URL!");
  });

  it("should add a motivational speech resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Motivational Speech");

    cy.get("[data-test=title-input]").type(resourceTestData.title);
    cy.get("[data-test=author-input]").type(resourceTestData.author);
    cy.get("[data-test=description-input]").type(resourceTestData.description);

    cy.get("[data-test=youtube-url-input]").type(resourceTestData.youtubeUrl);

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
