/// <reference types="cypress" />

import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";
const testuserData = require("../fixtures/testuser.json");

addMatchImageSnapshotCommand({
  failureThreshold: 0.05,
  failureThresholdType: "pixel",
});

// Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
//   if (text) {
//     return originalFn(element, text, options);
//   }
// });

Cypress.Commands.add("loginAdminWithUI", () => {
  /**
   * Login the admin user by interacting with the UI
   * and using credentials found on cypress.env.json
   */

  cy.visit(Cypress.config().adminUrl);
  cy.get("#id_username")
    .type(Cypress.env("adminUser"))
    .get("#id_password")
    .type(Cypress.env("adminPass"))
    .get("[type=submit]")
    .click();

  cy.get("#content-main").should("be.visible");
  cy.get("#recent-actions-module").should("be.visible");
});

Cypress.Commands.add("loginWithUI", (
  //username, password
  ) => {
  /**
   * Login the a normal user by interacting with the UI
   * if no credentials are provided credentials
   * found on testuser.json will be used.
   */

  cy.visit("/");

  cy.get("#username")
    .type(
      //username ? username : 
      testuserData.username)
    .get("#password")
    .type(
      //password ? password : 
      testuserData.password)
    .get("#submitButton")
    .click();

  cy.get(".homepage").should("be.visible");
});

Cypress.Commands.add("loginWithAPI", () => {
  /**
   * Login programatically using the API. if no credentials
   * are provided credentials found on testuser.json
   * will be used.
   *
   * Request will set a token on localStorage necessary
   * for login.
   */

  let token;
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8000/auth/",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: testuserData.username,
      password: testuserData.password,
    }),
  }).then((response) => {
    token = response.body.token;
    expect(response.status).to.eq(200);
  });

  cy.visit("/", {
    onBeforeLoad(win) {
      win.localStorage.setItem("token", JSON.stringify(token));
    },
  });
});

Cypress.Commands.add("loginAndCleanUp", () => {
  /**
   * Deletes any previous data left from tests and logs in.
   */
  cy.deleteTestData();
  cy.loginWithAPI();
});

Cypress.Commands.add("logoutWithUI", () => {
  /**
   * Logout the usen by clicking on the logout link.
   */

  cy.get("[data-test=logout-link]").click();
  cy.get("[data-test=login-container]").should("be.visible");
});

Cypress.Commands.add("deleteTestData", () => {
  /**
   * Deletes all resources and comments created by tests.
   *
   * The user token found on testuser.json will be used for
   * authorization.
   */

  cy.request({
    url: "http://localhost:8000/api/delete-test-data/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${testuserData["token"]}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

Cypress.Commands.add(
  "createResourceWithUI",
  (resourceType, testData, requiredFieldsOnly = false) => {
    /**
     * Creates a resource by using the UI.
     *
     * The resource in question is determined by the resourceType param
     * and can be one of four types: book, podcast, podcast-episode or
     * motivational-speech.
     *
     * The command will select the resource type from a dropdown and then
     * fill out the respective resource form fields.
     *
     * If the requiredFieldsOnly param is set to true then
     * the non-required fields (description, valueOne, valueTwo, valueThree)
     * will be skipped.
     */

    //cy.visit("/add/");
    cy.get("[data-test=add-link]").click();
    cy.get(".add-container").should("be.visible");

    cy.get("[data-test=select-resource-type]").select(resourceType);

    cy.get("[data-test=title-input]").type(testData.title);
    cy.get("[data-test=author-input]").type(testData.author);

    switch (resourceType) {
      case "book":
        cy.get("[data-test=subtitle-input]").type(testData.subtitle);
        cy.get("[data-test=isbn-input]").type(testData.isbn);
        break;

      case "podcast":
        cy.get("[data-test=website-url-input]").type(testData.websiteUrl);
        cy.get("[data-test=spotify-page-url-input]").type(testData.spotifyUrl);
        cy.get("[data-test=youtube-page-url-input]").type(testData.youtubeUrl);
        break;

      case "podcast-episode":
        cy.get("[data-test=select-podcast]").select(testData.podcast);
        cy.get("[data-test=spotify-ep-url-input]").type(testData.spotifyUrl);
        cy.get("[data-test=youtube-ep-url-input]").type(testData.youtubeUrl);
        break;

      case "motivational-speech":
        cy.get("[data-test=youtube-url-input]").type(testData.youtubeUrl);
        break;
    }

    if (requiredFieldsOnly) return cy.get("[data-test=submit]").click();

    cy.get("[data-test=description-input]").type(testData.description);
    cy.get("[data-test=image-url-input]").type(testData.imageUrl);
    
    cy.get("[data-test=value-one-input]").type(testData.valueOne);
    cy.get("[data-test=value-two-input]").type(testData.valueTwo);
    cy.get("[data-test=value-three-input]").type(testData.valueThree);

    cy.get("[data-test=submit]").click();
  }
);

Cypress.Commands.add("createResourceWithAPI", (resourceType, testData) => {
  /**
   * Creates a resource by using the API.
   *
   * The resource in question is determined by the resourceType param
   * and can be one of four types: book, podcast, podcast-episode or
   * motivational-speech.
   *
   * The resourceType will be converted to it's plural which will
   * form part of the url: book > http://127.0.0.1:8000/api/books/.
   *
   * The user token found on testuser.json will be used for
   * authorization.
   */

  const resourcePlurals = {
    book: "books",
    podcast: "podcasts",
    "podcast-episode": "podcast-episodes",
    "motivational-speech": "motivational-speeches",
  };
  const resourcePlural = resourcePlurals[resourceType];
  cy.request({
    url: `http://127.0.0.1:8000/api/${resourcePlural}/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${testuserData["token"]}`,
    },
    body: JSON.stringify(testData),
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add("createCommentWithUI", (text) => {
  /**
   * Creates a comment by using the UI.
   *
   * The command checks that the text is present as value
   * on the input element and also that the value is cleared
   * after the submit button has been clicked.
   */

  cy.get("[data-test=comment-input]")
    .type(text)
    .should("have.value", text)
    .get("[data-test=add-comment-button]")
    .click();

  cy.get("[data-test=comment-input]").should("have.value", "");
});

Cypress.Commands.add("createRatingWithUI", (numStars) => {
  /**
   * Creates a rating by using the UI.
   *
   */

  cy.get("[data-test=add-rating-button]").click();
  cy.get(`[data-test=add-star-icon-${numStars}]`).click();
});

Cypress.Commands.add("createRatingWithAPI", (resource, numStars, token) => {
  /**
   * Creates a rating by using the UI.
   *
   * A specific token param can be passed to represent adding a rating from a
   * specific user or, if no token is passed, user token found on
   * testuser.json will be used for authorization.
   */

  const newRating = {
    resource: resource,
    stars: numStars,
  };

  cy.request({
    url: "http://127.0.0.1:8000/api/ratings/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token ? token : testuserData["token"]}`,
    },
    body: JSON.stringify(newRating),
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});
