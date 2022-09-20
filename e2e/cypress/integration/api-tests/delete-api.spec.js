import { getResourceTypePlural } from "../../support/utils";
const resourceAPIData = require("../../fixtures/resource-api-data.json");
const adminuserData = require("../../fixtures/adminuser.json");

const resourceTypes = [
  "book",
  "podcast",
  // "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`${resourceType} API 'DELETE' request`, () => {
    const ctx = {};
  
    beforeEach(() => {
      cy.request(
        `${Cypress.env('baseUrl')}api/${getResourceTypePlural(resourceType)}/`
      ).then((response) => {
        ctx.originalResourceCount = response.body.length;
        cy.log(`ctx.originalResourceCount: ${ctx.originalResourceCount}`)
      });
  
      cy.deleteTestData();
      cy.createResourceWithAPI(resourceType, resourceAPIData);
  
      cy.request({
        method: "GET",
        url: `${Cypress.env('baseUrl')}api/${getResourceTypePlural(resourceType)}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env('adminToken')}`,
        },
      }).then((response) => {
        const firstResource = response.body[0];

        cy.request({
          method: "DELETE",
          url: `${Cypress.env('baseUrl')}api/${getResourceTypePlural(resourceType)}/${
            firstResource.id
          }/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token  ${Cypress.env('adminToken')}`,
          },
        }).then((response) => {
          ctx.response = response;
        });
      });
    });
  
    it("should have status code 204 and display resource count back to original count after deleting", () => {
        // Check status code 204
        expect(ctx.response.status).to.eq(204);

        /// Check resource count back to original
        cy.request(
          `${Cypress.env('baseUrl')}api/${getResourceTypePlural(resourceType)}/`
        ).then((response) => {
          expect(response.body.length).to.eq(ctx.originalResourceCount);
        });
    });
  });  
}

