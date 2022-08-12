/// <reference types="cypress" />

import { getResourceTypePlural } from "../../../../support/utils";
const resourceAPIData = require("../../../../fixtures/resource-api-data.json");
resourceAPIData.title = `${resourceAPIData.title} - [Book Resource]`;

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

const scrubbedElements = [
  "[data-test=image-container]",
  "[data-test=image]",
  "[data-test=iframe]",
];

for (const resourceType of resourceTypes) {
  describe(`Visual Tests - Create ${resourceType} Resources`, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.loginWithAPI("testuser1", "testpass1");
    });

    it(`should match the previous screenshot of the home, ${resourceType} and detail page`, () => {
      cy.createResourceWithAPI(resourceType, resourceAPIData);

      // Homepage
      cy.visit("/");
      cy.get("[data-test=post-container]")
        .first()
        .within(() => {
          cy.get("[data-test=post-image]")
            .should("be.visible")
            .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
          cy.wait(500);
        })
        .should("contain", resourceAPIData.title)
        .matchImageSnapshot(`${resourceType} homepage`, {
          blackout: scrubbedElements,
        });

      // ResourceType page
      cy.visit(`/${getResourceTypePlural(resourceType)}`);
      cy.get("[data-test=post-container]")
        .first()
        .within(() => {
          cy.get("[data-test=post-image]")
            .should("be.visible")
            .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
          cy.wait(500);
        })
        .should("contain", resourceAPIData.title)
        .matchImageSnapshot(`${resourceType} page`, {
          blackout: scrubbedElements,
        });

      // Detailpage
      cy.visit("/");
      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceAPIData.title)
        .within(() => {
          cy.get("[data-test=text-container]").click();
        });

      let mediaElement = null;
      if (resourceType == "book" || resourceType == "podcast") {
        mediaElement = cy
          .get("[data-test=image]")
          .should("be.visible")
          .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
          });
      } else {
        mediaElement = cy.get("[data-test=iframe]");
      }
      //cy.get("[data-test=image]")

      cy.get("[data-test=detail-page-container]").matchImageSnapshot(
        `${resourceType} detailpage`,
        {
          blackout: scrubbedElements,
        }
      );
    });

    // it(`should match previous screenshot of ${resourceType} page`, () => {
    //   cy.createResourceWithAPI(resourceType, resourceAPIData);

    //   cy.visit(`/${getResourceTypePlural(resourceType)}`);
    //   cy.get("[data-test=post-container]")
    //     .first()
    //     .within(() => {
    //       cy.get("[data-test=post-image]")
    //         .should("be.visible")
    //         .and(($img) => {
    //           expect($img[0].naturalWidth).to.be.greaterThan(0);
    //         });
    //       cy.wait(500);
    //     })
    //     .should("contain", resourceAPIData.title)
    //     .matchImageSnapshot({ blackout: scrubbedElements });
    // });

    // it("should match previous screenshot of detail page", () => {
    //   cy.createResourceWithAPI(resourceType, resourceAPIData);

    //   cy.visit("/");
    //   cy.get("[data-test=post-container]")
    //     .first()
    //     .should("contain", resourceAPIData.title)
    //     .within(() => {
    //       cy.get("[data-test=text-container]").click();
    //     });

    //   let mediaElement = null;
    //   if (resourceType == "book" || resourceType == "podcast") {
    //     mediaElement = cy
    //       .get("[data-test=image]")
    //       .should("be.visible")
    //       .and(($img) => {
    //         expect($img[0].naturalWidth).to.be.greaterThan(0);
    //       });
    //   } else {
    //     mediaElement = cy.get("[data-test=iframe]");
    //   }
    //   //cy.get("[data-test=image]")

    //   cy.get("[data-test=detail-page-container]").matchImageSnapshot({
    //     blackout: scrubbedElements,
    //   });
    // });

    afterEach(() => {
      cy.deleteTestData();
    });
  });
}
