/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-api-data.json");

describe("Delete Book Resources", () => {
  beforeEach(() => {
    // TODO: login with admin user.
    cy.loginAndCleanUp();
    cy.createResourceWithAPI("book", resourceData);
    cy.visit("/");
    cy.get("[data-test=app]").should("be.visible");
    cy.get("[data-test=spinner]")
      .should("not.exist")
      .then(() => {
        cy.get("[data-test=post-list-container]")
          .children()
          .first()
          .should("contain.text", "Test Title")
          .click();
      });
  });

  it("should NOT display deleted resource on homepage", () => {
    cy.get("[data-test=delete-button]").click();
    cy.get("[data-test=modal-delete-button]").click();

    cy.url().should("eq", Cypress.config().baseUrl);
    cy.get("[data-test=spinner]")
      .should("not.exist")
      .then(() => {
        cy.get("[data-test=post-list-container]")
          .should("not.contain", resourceData.title)
          .and("not.contain", resourceData.author)
          .and("not.contain", resourceData.description.substring(0, 300))
          .and("not.contain.html", resourceData.imageUrl);
      });
  });

  it("should NOT display deleted resource on bookpage", () => {
    cy.get("[data-test=delete-button]").click();
    cy.get("[data-test=modal-delete-button]").click();

    cy.visit("/books/");
    cy.get("[data-test=spinner]")
      .should("not.exist")
      .then(() => {
        cy.get("[data-test=post-list-container]")
          .should("not.contain", resourceData.title)
          .and("not.contain", resourceData.author)
          .and("not.contain", resourceData.description.substring(0, 300))
          .and("not.contain.html", resourceData.imageUrl);
      });
  });

  it("should NOT display deleted resource detailpage", () => {
    cy.url().then((url) => {
      cy.get("[data-test=delete-button]").click();
      cy.get("[data-test=modal-delete-button]").click();

      cy.visit(url);
      cy.get("[data-test=not-found]").should("be.visible");
    })
  });

  it("should NOT delete resource after clicking cancel button on delete dialog", () => {
    cy.url().then((url) => {
      cy.get("[data-test=delete-button]").click();
      cy.get("[data-test=modal-cancel-button]").click();

      cy.url().should("eq", url);

      cy.get("[data-test=detail-page-container]")
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description)
        .and("contain.html", resourceData.imageUrl);
    });
  });
});
