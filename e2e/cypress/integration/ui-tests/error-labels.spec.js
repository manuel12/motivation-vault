/// <reference types="cypress" />

describe("Error labels", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  // Add tests to check that models can be submitted without filling out optional fields.
  it("should display error labels for book form fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
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

    cy.get("[data-test=isbn-input]").type("AAA");
    cy.get("[data-test=submit]").click();

    cy.get("[data-test=isbn-input-error]")
      .should("be.visible")
      .and("contain.text", "ISBN has to be a 13 digits!");
  });

  it("should display error labels for podcast form fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
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

    cy.get("[data-test=spotify-page-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Spotify URL cannot be empty!");

    cy.get("[data-test=youtube-page-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL cannot be empty!");

    cy.get("[data-test=website-url-input]").type("AAA");
    cy.get("[data-test=spotify-page-url-input]").type("AAA");
    cy.get("[data-test=youtube-page-url-input]").type("AAA");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=website-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Website URL has to be a valid url!");

    cy.get("[data-test=spotify-page-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Spotify URL has to be a valid url!");

    cy.get("[data-test=youtube-page-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL has to be a valid url!");
  });

  it("should display error labels for podcast episode form fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
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

    cy.get("[data-test=spotify-ep-url-input]").type("AAA");

    cy.get("[data-test=youtube-ep-url-input]").type("AAA");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=spotify-ep-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Spotify episode URL has to be a valid url!");

    cy.get("[data-test=youtube-ep-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube episode URL has to be a valid url!");
  });

  it("should display error labels for motivational speech form fields", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
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

    cy.get("[data-test=youtube-url-input]").type("AAA");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=youtube-url-input-error]")
      .should("be.visible")
      .and("contain.text", "Youtube URL has to be a valid URL!");
  });
});
