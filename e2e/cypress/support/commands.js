// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (username, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (text) {
    return originalFn(element, text, options);
  }
});

Cypress.Commands.add("loginAdminWithUI", () => {
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

Cypress.Commands.add("loginWithUI", (username, password) => {
  cy.visit("/");
  cy.get("#username")
    .type(username ? username : Cypress.env("adminUser"))
    .get("#password")
    .type(password ? password : Cypress.env("adminPass"))
    .get("#submitButton")
    .click();

  cy.get(".homepage").should("be.visible");
});

Cypress.Commands.add("loginWithAPI", (username, password) => {
  let token;

  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8000/auth/",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username ? username : Cypress.env("adminUser"),
      password: password ? password : Cypress.env("adminPass"),
    }),
  }).then((response) => {
    token = response.body.token;
    cy.log(token)
    expect(response.status).to.eq(200);
  });

  cy.visit("/", {
    onBeforeLoad(win) {
      win.localStorage.setItem("token", JSON.stringify(token));
    },
  });
});

Cypress.Commands.add("logoutWithUI", () => {
  cy.get("[data-test=logout-link]").click();
  cy.get(".login-container").should("be.visible");
});

Cypress.Commands.add("deleteTestData", () => {
  cy.request({
    url: "http://localhost:8000/api/delete-test-data/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${Cypress.env("adminToken")}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

Cypress.Commands.add(
  "addResourceWithUI",
  (resourceType, testData, requiredFieldsOnly = false) => {
    cy.visit("/add/");
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
        cy.get("[data-test=spotify-url-input]").type(testData.spotifyUrl);
        cy.get("[data-test=youtube-url-input]").type(testData.youtubeUrl);
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
    cy.get("[data-test=value-one-input]").type(testData.valueOne);
    cy.get("[data-test=value-two-input]").type(testData.valueTwo);
    cy.get("[data-test=value-three-input]").type(testData.valueThree);

    cy.get("[data-test=submit]").click();

    cy.url().should("equal", Cypress.config().baseUrl);
  }
);

Cypress.Commands.add("addResourceWithAPI", (resourceType, testData) => {
  const resourcePlurals = {
    book: "books",
    podcast: "podcasts",
    "podcasts-episode": "podcast-episodes",
    "motivational-speech": "motivational-speeches",
  };
  const resourcePlural = resourcePlurals[resourceType];
  cy.request({
    url: `http://127.0.0.1:8000/api/${resourcePlural}/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${Cypress.env("adminToken")}`,
    },
    body: JSON.stringify(testData),
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add("addCommentWithUI", (text) => {
  cy.get("[data-test=comment-input]")
    .type(text)
    .should("have.value", text)
    .get("[data-test=submit]")
    .click();

  cy.get("[data-test=comment-input]").should("have.value", "");
});

Cypress.Commands.add("addRatingWithUI", (numStars) => {
  cy.get("[data-test=add-rating-button]").click();
  cy.get("[data-test=add-rating-input]").clear().type(numStars);
  cy.get("[data-test=add-rating-submit-button]").click();
  cy.get("[data-test=rating-input-form]").should("not.exist");
});

Cypress.Commands.add("addRatingWithAPI", (resource, numStars, token) => {
  const newRating = {
    resource: resource,
    stars: numStars,
  };
  cy.request({
    url: "http://127.0.0.1:8000/api/ratings/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token ? token : Cypress.env("adminToken")}`,
    },
    body: JSON.stringify(newRating),
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});
