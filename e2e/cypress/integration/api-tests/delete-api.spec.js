import { getResourceTypePlural } from "../../support/utils";
const resourceAPIData = require("../../fixtures/resource-api-data.json");
const adminuserData = require("../../fixtures/adminuser.json");

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

for (const resourceType of resourceTypes) {
  describe(`${resourceType} API 'DELETE' request`, () => {
    const ctx = {};
  
    beforeEach(() => {
      cy.request(
        `http://localhost:8000/api/${getResourceTypePlural(resourceType)}/`
      ).then((response) => {
        ctx.originalResourceCount = response.body.length;
      });
  
      cy.deleteTestData();
      cy.createResourceWithAPI(resourceType, resourceAPIData);
  
      cy.request({
        method: "GET",
        url: `http://localhost:8000/api/${getResourceTypePlural(resourceType)}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${adminuserData.token}`,
        },
      }).then((response) => {
        const firstBook = response.body[0];
        ctx.id = firstBook.id;
      });
    });
  
    it("should have status code 204", () => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:8000/api/${getResourceTypePlural(resourceType)}/${
          ctx.id
        }/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${adminuserData.token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  
    it("should display resource count back to original count after deleting", () => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:8000/api/${getResourceTypePlural(resourceType)}/${
          ctx.id
        }/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${adminuserData.token}`,
        },
      });
  
      cy.request(
        `http://localhost:8000/api/${getResourceTypePlural(resourceType)}/`
      ).then((response) => {
        expect(response.body.length).to.eq(ctx.originalResourceCount);
      });
    });
  });  
}

