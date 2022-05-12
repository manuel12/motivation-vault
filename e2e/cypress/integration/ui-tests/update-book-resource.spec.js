/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-data.json");
const newResourceData = require("../../fixtures/resource-updated-data.json");

describe("Update Book Resources", () => {
  beforeEach(() => {
    // TODO: login with admin user.
    cy.loginAndCleanUp();
    cy.createResourceWithAPI("book", resourceData);
    cy.get("[data-test=app]").should("be.visible");
  });

  it("Should update a book resource", () => {
    cy.get("[data-test=post-list-container]").children().first().click();

    let resourceUrl;
    cy.url().then((url) => {
      resourceUrl = url;
    });

    cy.get("[data-test=edit-button]").should("be.visible").click();

    cy.url().should("contain", "/update/");

    cy.get("h2").should("contain.text", "Update Resource Form");

    cy.get("[data-test=title-input]").should("have.value", resourceData.title);
    cy.get("[data-test=author-input]").should(
      "have.value",
      resourceData.author
    );
    cy.get("[data-test=description-input]").should(
      "have.value",
      resourceData.description
    );

    cy.get("[data-test=image-url-input]").should(
      "have.value",
      resourceData.imageUrl
    );

    cy.get("[data-test=subtitle-input]").should(
      "have.value",
      resourceData.subtitle
    );
    cy.get("[data-test=isbn-input]").should("have.value", resourceData.isbn);

    cy.get("[data-test=value-one-input]").should(
      "have.value",
      resourceData.valueOne
    );
    cy.get("[data-test=value-two-input]").should(
      "have.value",
      resourceData.valueTwo
    );
    cy.get("[data-test=value-three-input]").should(
      "have.value",
      resourceData.valueThree
    );

    cy.get("[data-test=submit]").should("not.be.enabled");

    cy.updateResourceFields("book", {
      title: newResourceData.title,
      subtitle: newResourceData.subtitle,
      description: newResourceData.description,
      isbn: newResourceDat.isbn,
    });

    cy.get("[data-test=submit]").should("be.enabled").click();

    cy.url().should("contain", `${Cypress.config.baseUrl}/${resourceUrl}/`);

    cy.get("[data-test=detail-page-container]")
      .should("contain", newResourceData.title)
      .and("contain", newResourceData.subtitle)
      .and("contain", newResourceData.description)
      .and("contain", newResourceData.isbn);

    cy.get("[data-test=update-successfull-message]");
  });

  it("should NOT display edit button when logged in as regular user", () => {
    cy.logout();

    // TODO: login with admin user.
    cy.loginAndCleanUp();
    cy.get("[data-test=post-list-container]").children().first().click();

    cy.get("[data-test=edit-button]").should("not.exist");
  });
});
