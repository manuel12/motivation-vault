/// <reference types="cypress" />

const scrubbedElements = [""];

describe("Visual Tests - Error labels", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.get("[data-test=app]").should("be.visible");
  });

  // Create tests to check that models can be submitted without filling out optional fields.
  it("should match the previous screenshot of book form error labels", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Book");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]").should("be.visible");

    cy.get("[data-test=author-input-error]").should("be.visible");

    cy.get("[data-test=subtitle-input-error]").should("be.visible");

    cy.get("[data-test=isbn-input-error]").should("be.visible");

    cy.get("[data-test=isbn-input]").type(".");
    cy.get("[data-test=submit]").click();

    cy.get("[data-test=isbn-input-error]").should("be.visible");

    cy.get("[data-test=add-container]").matchImageSnapshot({blackout: scrubbedElements});
  });

  it("should match the previous screenshot of podcast form error labels", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]").should("be.visible");

    cy.get("[data-test=author-input-error]").should("be.visible");

    cy.get("[data-test=website-url-input-error]").should("be.visible");

    cy.get("[data-test=spotify-page-url-input-error]").should("be.visible");

    cy.get("[data-test=youtube-page-url-input-error]").should("be.visible");

    cy.get("[data-test=website-url-input]").type(".");
    cy.get("[data-test=spotify-page-url-input]").type(".");
    cy.get("[data-test=youtube-page-url-input]").type(".");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=website-url-input-error]").should("be.visible");

    cy.get("[data-test=spotify-page-url-input-error]").should("be.visible");

    cy.get("[data-test=youtube-page-url-input-error]").should("be.visible");

    cy.get("[data-test=add-container]").matchImageSnapshot({blackout: scrubbedElements});
  });

  it("should match the previous screenshot of podcast episode form error labels", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Podcast Episode");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]").should("be.visible");

    cy.get("[data-test=author-input-error]").should("be.visible");

    cy.get("[data-test=select-podcast-error]").should("be.visible");

    cy.get("[data-test=spotify-ep-url-input-error]").should("be.visible");

    cy.get("[data-test=youtube-ep-url-input-error]").should("be.visible");

    cy.get("[data-test=spotify-ep-url-input]").type(".");

    cy.get("[data-test=youtube-ep-url-input]").type(".");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=spotify-ep-url-input-error]").should("be.visible");

    cy.get("[data-test=youtube-ep-url-input-error]").should("be.visible");

    cy.get("[data-test=add-container]").matchImageSnapshot({blackout: scrubbedElements});
  });

  it("should match the previous screenshot of motivational speech form error labels", () => {
    cy.visit("/add/");
    cy.get("[data-test=add-container]").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Motivational Speech");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=title-input-error]").should("be.visible");

    cy.get("[data-test=author-input-error]").should("be.visible");

    cy.get("[data-test=youtube-url-input-error]").should("be.visible");

    cy.get("[data-test=youtube-url-input]").type(".");

    cy.get("[data-test=submit]").click();

    cy.get("[data-test=youtube-url-input-error]").should("be.visible");

    cy.get("[data-test=add-container]").matchImageSnapshot({blackout: scrubbedElements});
  });
});
