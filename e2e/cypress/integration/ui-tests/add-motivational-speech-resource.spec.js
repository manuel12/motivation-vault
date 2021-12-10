/// <reference types="cypress" />

describe("Add Motivational Speech Resources", () => {
  beforeEach(() => {
    cy.loginWithAPI("testuser1", "testpass1");
    cy.get(".App").should("be.visible");
  });

  it("should add a motivational speech resource", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("motivational-speech", resourceData);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  });

  it("should add a motivational speech resource filling required fields only", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("motivational-speech", resourceData, true);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author);
    });
  });

  it("should NOT submit motivational speech form without filling required fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Motivational Speech");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");
  });

  it("should NOT add a motivational speech resource with invalid data", () => {
    cy.fixture("invalidResourceData").then((invalidData) => {
      cy.addResourceWithUI("motivational-speech", invalidData);

      cy.get("[data-test=youtube-url-input-error]")
        .should("be.visible")
        .and("contain.text", "Youtube URL has to be a valid URL!");
    });
  });

  it("should add a motivational speech resource by pressing ENTER when all fields are filled", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.visit("/add/");
      cy.get(".add-container").should("be.visible");
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
  });

  after(() => {
    cy.deleteTestData();
  });
});
