/// <reference types="cypress" />

import { getResourceTypePlural } from "../../../../support/utils";
const resourceAPIData = require("../../../../fixtures/resource-api-data.json");

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`Delete ${resourceType} Resources`, () => {
    beforeEach(() => {
      // TODO: login with admin user.
      cy.loginAndCleanUp();
      cy.createPodcastForPodcastEpisodeTests(
        resourceType,
        resourceAPIData
      ).then(() => {
        cy.createResourceWithAPI(resourceType, resourceAPIData);
      });
      cy.visit("/");
      cy.get("[data-test=app]").should("be.visible");

      // Wait for loading spinner to disappear.
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]")
            .children()
            .first()
            .should("contain.text", resourceAPIData.title)
            .click();
        });
    });

    it(`should delete a ${resourceType} resource`, () => {
      cy.url().then((detailpageUrl) => {
        cy.get("[data-test=delete-button]").click();
        cy.get("[data-test=modal-accept-button]").click();

        cy.url().should("eq", Cypress.env("baseUrl"));

        // Wait for loading spinner to disappear.
        cy.get("[data-test=spinner]")
          .should("not.exist")
          .then(() => {
            cy.get("[data-test=post-list-container]")
              .should("not.contain", resourceAPIData.title)
              .and("not.contain", resourceAPIData.author)
              .and("not.contain", resourceAPIData.description.substring(0, 300))
              .and("not.contain.html", resourceAPIData.imageUrl);
          });

        cy.visit(`/${getResourceTypePlural(resourceType)}/`);

        // Wait for loading spinner to disappear.
        cy.get("[data-test=spinner]")
          .should("not.exist")
          .then(() => {
            cy.get("[data-test=post-list-container]")
              .should("not.contain", resourceAPIData.title)
              .and("not.contain", resourceAPIData.author)
              .and(
                "not.contain",
                resourceAPIData.description.substring(0, 300)
              );
          });

        cy.visit(detailpageUrl);
        cy.get("[data-test=not-found]").should("be.visible");
      });
    });

    it("should NOT delete the resource after clicking the cancel button on delete dialog", () => {
      cy.url().then((detailpageUrl) => {
        cy.get("[data-test=delete-button]").click();
        cy.get("[data-test=modal-cancel-button]").click();

        cy.url().should("eq", detailpageUrl);

        cy.get("[data-test=detail-page-container]")
          .should("contain", resourceAPIData.title)
          .and("contain", resourceAPIData.author)
          .and("contain", resourceAPIData.description);
      });
    });
  });

  after(() => {
    cy.deleteTestData();
  })
}
