/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-data.json");
const invalidResourceData = require("../../fixtures/invalid-resource-data.json");

describe("Create Book Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should create a book resource", () => {
    cy.createResourceWithUI("book", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created book resource on book section", () => {
    cy.createResourceWithUI("book", resourceData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");
    
    cy.visit("/books/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author)
      .and("contain", resourceData.description);
  });

  it("should display created book resource on detail page", () => {
    cy.createResourceWithUI("book", resourceData);

    cy.url().should("not.contain", "add/");
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

  it("should create a book resource filling required fields only", () => {
    cy.createResourceWithUI("book", resourceData, true);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceData.title)
      .and("contain", resourceData.author);
  });

  it("should NOT submit a book form without filling required fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");

    cy.get("[data-test=select-resource-type]").select("Book");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=title-input-error]").should("be.visible");
    cy.get("[data-test=author-input-error]").should("be.visible");
    cy.get("[data-test=subtitle-input-error]").should("be.visible");
    cy.get("[data-test=isbn-input-error]").should("be.visible");
  });

  it("should NOT create a book resource with invalid data", () => {
    cy.createResourceWithUI("book", invalidResourceData);

    cy.url().should("contain", "add/");

    cy.get("[data-test=isbn-input-error]")
      .should("be.visible")
      .and("contain.text", "ISBN has to be a 13 digits!");
  });

  it("should create a book resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=select-resource-type]").select("Book");

    cy.get("[data-test=title-input]").type(resourceData.title);
    cy.get("[data-test=subtitle-input]").type(resourceData.subtitle);
    cy.get("[data-test=author-input]").type(resourceData.author);
    cy.get("[data-test=isbn-input]").type(resourceData.isbn);

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
