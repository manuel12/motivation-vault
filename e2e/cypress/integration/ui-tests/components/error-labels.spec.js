/// <reference types="cypress" />

const testuserData = require("../../../fixtures/testuser.json");

const resourceTypes = [
  "book",
  "podcast",
  "podcast-episode",
  "motivational-speech",
];

const capitalizedResourceTypes = {
  book: "Book",
  podcast: "Podcast",
  "podcast-episode": "Podcast Episode",
  "motivational-speech": "Motivational Speech",
};

describe("Error labels", () => {
  context("Create resource form input errors", () => {
    beforeEach(() => {
      cy.loginAndCleanUp();
      cy.get("[data-test=app]").should("be.visible");
    });

    for (const resourceType of resourceTypes) {
      it(`should display error labels for ${resourceType} form fields`, () => {
        cy.visit("/add/");
        cy.get("[data-test=add-container]").should("be.visible");
        cy.get("[data-test=select-resource-type]").select(
          capitalizedResourceTypes[resourceType]
        );

        cy.get("[data-test=submit]").click();

        cy.get("[data-test=title-input-error]")
          .should("be.visible")
          .and("contain.text", "Title cannot be empty!");

        cy.get("[data-test=author-input-error]")
          .should("be.visible")
          .and("contain.text", "Author cannot be empty!");

        if (resourceType == "book") {
          cy.get("[data-test=subtitle-input-error]")
            .should("be.visible")
            .and("contain.text", "Subtitle cannot be empty!");

          cy.get("[data-test=isbn-input-error]")
            .should("be.visible")
            .and("contain.text", "ISBN cannot be empty!");

          cy.get("[data-test=isbn-input]").type(".");
          cy.get("[data-test=submit]").click();

          cy.get("[data-test=isbn-input-error]")
            .should("be.visible")
            .and("contain.text", "ISBN has to be a 13 digits!");

          cy.get("#add-resource-form").matchImageSnapshot();
        } else if (resourceType == "podcast") {
          cy.get("[data-test=website-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Website URL cannot be empty!");

          cy.get("[data-test=spotify-page-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Spotify URL cannot be empty!");

          cy.get("[data-test=youtube-page-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Youtube URL cannot be empty!");

          cy.get("[data-test=website-url-input]").type(".");
          cy.get("[data-test=spotify-page-url-input]").type(".");
          cy.get("[data-test=youtube-page-url-input]").type(".");

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

          cy.get("#add-resource-form").matchImageSnapshot();
        } else if (resourceType == "podcast-episode") {
          cy.get("[data-test=select-podcast-error]")
            .should("be.visible")
            .and("contain.text", "Podcast cannot be empty!");

          cy.get("[data-test=spotify-ep-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Spotify episode URL cannot be empty!");

          cy.get("[data-test=youtube-ep-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Youtube episode URL cannot be empty!");

          cy.get("[data-test=spotify-ep-url-input]").type(".");

          cy.get("[data-test=youtube-ep-url-input]").type(".");

          cy.get("[data-test=submit]").click();

          cy.get("[data-test=spotify-ep-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Spotify episode URL has to be a valid url!");

          cy.get("[data-test=youtube-ep-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Youtube episode URL has to be a valid url!");

          cy.get("#add-resource-form").matchImageSnapshot();
        } else if (resourceType == "motivational-speech") {
          cy.get("[data-test=youtube-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Youtube URL cannot be empty!");

          cy.get("[data-test=youtube-url-input]").type(".");

          cy.get("[data-test=submit]").click();

          cy.get("[data-test=youtube-url-input-error]")
            .should("be.visible")
            .and("contain.text", "Youtube URL has to be a valid URL!");

          cy.get("#add-resource-form").matchImageSnapshot();
        }
      });
    }
  });

  context("Login form input errors", () => {
    it("should show an error message when leaving the username or password empty", () => {
      cy.visit("/");
      cy.get("[data-test=submit-button]").click();

      cy.get("[data-test=username-error]")
        .should("be.visible")
        .and("contain.text", "You need to provide a username.");

      cy.get("[data-test=password-error]")
        .should("be.visible")
        .and("contain.text", "You need to provide a password.");

      cy.get("[data-test=login-container]").matchImageSnapshot();
    });

    it("should show an error message when using valid username and invalid password", () => {
      cy.loginWithUI(testuserData.username, "fakepassword");

      cy.get("[data-test=username-error]")
        .should("be.visible")
        .and("contain.text", "Unable to log in with provided credentials.");

      cy.get("[data-test=password-error]")
        .should("be.visible")
        .and("contain.text", "Unable to log in with provided credentials.");

      cy.get("[data-test=login-container]").matchImageSnapshot();
    });
  });

  context("Register form input errors", () => {
    beforeEach(() => {
      cy.deleteTestData();
      cy.visit("/");
      cy.get("[data-test=register-link]").click();
    });

    it("should show an error message when leaving the username or password empty", () => {
      cy.get("[data-test=submit-button]").click();

      cy.get("[data-test=username-error]")
        .should("be.visible")
        .and("contain.text", "You need to provide a username.");

      cy.get("[data-test=password-error]")
        .should("be.visible")
        .and("contain.text", "You need to provide a password.");

      cy.get("[data-test=login-container]").matchImageSnapshot();
    });
  });
});
