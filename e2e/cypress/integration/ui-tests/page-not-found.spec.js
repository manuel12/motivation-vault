/// <reference types="cypress" />

describe("404 Page not found", () => {
  beforeEach(() => {
    cy.loginWithAPI("testuser1", "testpass1");
    cy.get(".App").should("be.visible");
  });

  // Add tests to check that models can be submitted without filling out optional fields.

  it("should show 404 page not found on a non-existant url", () => {
    cy.visit("/non-existant/url/");
    cy.get(".not-found").should("be.visible");
  });

  it("should show 404 page not found on a non-existant url on books section", () => {
    cy.visit("/books//non-existant/url/");
    cy.get(".not-found").should("be.visible");
  });

  it("should show 404 page not found on a non-existant url on podcasts section", () => {
    cy.visit("/podcasts//non-existant/url/");
    cy.get(".not-found").should("be.visible");
  });

  it("should show 404 page not found on a non-existant url on podcasts episode section", () => {
    cy.visit("/podcasts-episodes/non-existant/url/");
    cy.get(".not-found").should("be.visible");
  });

  it("should show 404 page not found on a non-existant url on motivational speeches section", () => {
    cy.visit("/motivational-speeches/non-existant/url/");
    cy.get(".not-found").should("be.visible");
  });
});
