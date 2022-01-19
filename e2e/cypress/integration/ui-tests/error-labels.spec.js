/// <reference types="cypress" />

describe("Error labels", () => {
  beforeEach(() => {
    cy.deleteTestData();
    
    cy.loginWithAPI("testuser1", "testpass1");
    cy.get(".App").should("be.visible");
  });

  // Add tests to check that models can be submitted without filling out optional fields.
  it("should display error labels for book form fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Book");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]")
      .should("be.visible")
      .and("contain.text", "Title cannot be empty!");

    cy.get("[data-test=author-input-error]")
      .should("be.visible")
      .and("contain.text", "Author cannot be empty!");

    cy.get("[data-test=subtitle-input-error]")
      .should("be.visible")
      .and("contain.text", "Subtitle cannot be empty!");

    cy.get("[data-test=isbn-input-error]")
      .should("be.visible")
      .and("contain.text", "ISBN cannot be empty!");
  });

  it("should display error labels for podcast form fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]")
      .should("be.visible")
      .and("contain.text", "Title cannot be empty!");

    cy.get("[data-test=author-input-error]")
      .should("be.visible")
      .and("contain.text", "Author cannot be empty!");

    cy.get("[data-test=website-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Website URL cannot be empty!");

    cy.get("[data-test=youtube-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL cannot be empty!");
  });

  it("should display error labels for podcast episode form fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast Episode");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]")
      .should("be.visible")
      .and("contain.text", "Title cannot be empty!");

    cy.get("[data-test=author-input-error]")
      .should("be.visible")
      .and("contain.text", "Author cannot be empty!");

    cy.get("[data-test=select-podcast-error]")
      .should("be.visible")
      .and("contain.text", "Podcast cannot be empty!");

    cy.get("[data-test=spotify-ep-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Spotify episode URL cannot be empty!");

    cy.get("[data-test=youtube-ep-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube episode URL cannot be empty!");
  });

  it("should display error labels for motivational speech form fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Motivational Speech");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]")
      .should("be.visible")
      .and("contain.text", "Title cannot be empty!");

    cy.get("[data-test=author-input-error]")
      .should("be.visible")
      .and("contain.text", "Author cannot be empty!");

    cy.get("[data-test=youtube-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL cannot be empty!");
  });
});
