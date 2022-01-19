/// <reference types="cypress" />

describe("Logout", () => {
  beforeEach(() => {
    cy.deleteTestData();
    cy.loginWithAPI("testuser1", "testpass1");
  });
  it("should logout by navigation bar", () => {
    cy.get("[data-test=logout-link]").click();

    cy.get("h1").should("contain.text", "Login");
    cy.get(".nav-list").should("not.exist");
    cy.get(".homepage").should("not.exist");
  });
});
