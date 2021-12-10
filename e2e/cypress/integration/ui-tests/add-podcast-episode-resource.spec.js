/// <reference types="cypress" />

describe("Add Podcast Episode Resources", () => {
  beforeEach(() => {
    cy.loginWithAPI("testuser1", "testpass1");
    cy.get(".App").should("be.visible");
  });

  it("should add a podcast episode resource", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("podcast-episode", resourceData);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  });

  it("should add a podcast episode resource filling required fields only", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("podcast-episode", resourceData, true);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author);
    });
  });

  it("should NOT submit podcast episode without filling required fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast Episode");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");
  });

  it("should NOT add a podcast episode resource with invalid data", () => {
    cy.fixture("invalidResourceData").then((invalidData) => {
      cy.addResourceWithUI("podcast-episode", invalidData);

      cy.get("[data-test=spotify-ep-url-input-error]")
        .should("be.visible")
        .and("contain.text", "Spotify episode URL has to be a valid url!");

      cy.get("[data-test=youtube-ep-url-input-error]")
        .should("be.visible")
        .and("contain.text", "Youtube episode URL has to be a valid url!");
    });
  });

  it("should add a podcast episode resource by pressing ENTER when all fields are filled", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.visit("/add/");
      cy.get(".add-container").should("be.visible");
      cy.get("[data-test=select-resource-type]").select("Podcast Episode");

      cy.get("[data-test=title-input]").type(resourceData.title);
      cy.get("[data-test=author-input]").type(resourceData.author);
      cy.get("[data-test=description-input]").type(resourceData.description);

      cy.get("[data-test=select-podcast]").select("Impact Theory");

      cy.get("[data-test=spotify-ep-url-input]").type(resourceData.spotifyEpUrl);
      cy.get("[data-test=youtube-ep-url-input]").type(resourceData.youtubeEpUrl);

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
