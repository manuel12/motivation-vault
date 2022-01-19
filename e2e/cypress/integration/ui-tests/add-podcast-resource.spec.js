/// <reference types="cypress" />

describe("Add Podcast Resources", () => {
  beforeEach(() => {
    cy.deleteTestData();
    
    cy.loginWithAPI("testuser1", "testpass1");
    cy.get(".App").should("be.visible");
  });

  it("should add a podcast resource", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("podcast", resourceData);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  });

  it("should display added podcast resource on podcast section", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("podcast", resourceData);

      cy.visit("/podcasts/");
      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  });

  it("should add a podcast resource filling required fields only", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("podcast", resourceData, true);
      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author);
    });
  });

  it("should NOT submit podcast form without filling required fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=title-input-error]").should("be.visible");
    cy.get("[data-test=author-input-error]").should("be.visible");
    cy.get("[data-test=website-url-input-error]").should("be.visible");
    cy.get("[data-test=spotify-url-input-error]").should("be.visible");
    cy.get("[data-test=youtube-url-input-error]").should("be.visible");
  });

  it("should NOT add a podcast resource with invalid data", () => {
    cy.fixture("invalidResourceData").then((invalidData) => {
      cy.addResourceWithUI("podcast", invalidData);

      cy.url().should("contain", "add/");
      
      cy.get("[data-test=website-url-input-error]")
        .should("be.visible")
        .and("contain.text", "Website URL has to be a valid url!");

      cy.get("[data-test=spotify-url-input-error]")
        .should("be.visible")
        .and("contain.text", "Spotify URL has to be a valid url!");

      cy.get("[data-test=youtube-url-input-error]")
        .should("be.visible")
        .and("contain.text", "Youtube URL has to be a valid url!");
    });
  });

  it("should add a podcast resource by pressing ENTER when all fields are filled", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.visit("/add/");
      cy.get(".add-container").should("be.visible");
      cy.get("[data-test=select-resource-type]").select("Podcast");

      cy.get("[data-test=title-input]").type(resourceData.title);
      cy.get("[data-test=author-input]").type(resourceData.author);
      cy.get("[data-test=description-input]").type(resourceData.description);

      cy.get("[data-test=website-url-input]").type(resourceData.websiteUrl);
      cy.get("[data-test=spotify-url-input]").type(resourceData.spotifyUrl);
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
