/// <reference types="cypress" />

const resourceData = require("../../../fixtures/resource-data.json");

describe("Edit/Delete Buttons", () => {
  beforeEach(() => {});

  it(`should display Edit/Delete buttons on resource's detail pages for staff users`, () => {
    // Login with staff user
    cy.loginAndCleanUp();

    // Create a resource
    cy.createResourceWithAPI("book", resourceData);

    // Click on the created resource
    cy.visit("/");
    cy.contains(resourceData.title).click({ force: true });

    // Check on resource detail page edit/delete buttons are visible.
    cy.get("[data-test=edit-delete-buttons-container]").should("be.visible");
    cy.get("[data-test=edit-button]").should("be.visible");
    cy.get("[data-test=delete-button]").should("be.visible");
  });

  // Add checks for resource detailpages for every resource type.

  it(`should NOT display Edit/Delete buttons on resource's detail pages for staff users`, () => {
    // Login with no staff user
    cy.loginAndCleanUp("testuser2", "testpass1");

    // Create a resource
    cy.createResourceWithAPI("book", resourceData);

    // Click on the created resource
    cy.visit("/");
    cy.contains(resourceData.title).click({ force: true });

    // Check on resource detail page is edit/delete buttons are NOT visible.
    cy.get("[data-test=edit-delete-buttons-container]").should("not.exist");
    cy.get("[data-test=edit-button]").should("not.exist");
    cy.get("[data-test=delete-button]").should("not.exist");
  });
});
