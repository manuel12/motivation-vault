/// <reference types="cypress" />

const resourceTestData = require("../../fixtures/resourceTestData.json");
const resourceInvalidTestData = require("../../fixtures/invalidResourceTestData.json");

describe("Add Book Resources", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  it("should add a book resource", () => {
    cy.addResourceWithUI("book", resourceTestData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  it("should display added book resource on book section", () => {
    cy.addResourceWithUI("book", resourceTestData);

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");
    
    cy.visit("/books/");
    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author)
      .and("contain", resourceTestData.description);
  });

  it("should display added book resource on detail page", () => {
    cy.addResourceWithUI("book", resourceTestData);

    cy.url().should("not.contain", "add/");
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

  it("should add a book resource filling required fields only", () => {
    cy.addResourceWithUI("book", resourceTestData, true);

    cy.get("[data-test=post-container]")
      .first()
      .should("contain", resourceTestData.title)
      .and("contain", resourceTestData.author);
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

  it("should NOT add a book resource with invalid data", () => {
    cy.addResourceWithUI("book", resourceInvalidTestData);

    cy.url().should("contain", "add/");

    cy.get("[data-test=isbn-input-error]")
      .should("be.visible")
      .and("contain.text", "ISBN has to be a 13 digits!");
  });

  it("should add a book resource by pressing ENTER when all fields are filled", () => {
    cy.visit("/add/");
    cy.get("[data-test=select-resource-type]").select("Book");

    cy.get("[data-test=title-input]").type(resourceTestData.title);
    cy.get("[data-test=subtitle-input]").type(resourceTestData.subtitle);
    cy.get("[data-test=author-input]").type(resourceTestData.author);
    cy.get("[data-test=isbn-input]").type(resourceTestData.isbn);

    cy.get("[data-test=description-input]").type(resourceTestData.description);

    cy.get("[data-test=value-one-input]").type(resourceTestData.valueOne);
    cy.get("[data-test=value-two-input]").type(resourceTestData.valueTwo);
    cy.get("[data-test=value-three-input]").type(
      `${resourceTestData.valueThree}{enter}`
    );

    cy.url().should("not.contain", "add/");
    cy.get("[data-test=add-container]").should("not.exist");

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
