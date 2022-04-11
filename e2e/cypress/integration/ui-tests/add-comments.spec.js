/// <reference types="cypress" />
const resourceTestData = require("../../fixtures/resourceTestData.json");
const commentsTestData = require("../../fixtures/commentsTestData.json");
const testuserData = require("../../fixtures/testuser.json");

describe("Add Comments", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.addResourceWithAPI("book", resourceTestData);

    cy.visit("/");
    cy.contains("Test Title").click({ force: true });
  });

  it("should add a comment", () => {
    cy.addCommentWithUI("[Test comment]");

    cy.get("[data-test=comment-container]")
      .first()
      .should("contain.text", "[Test comment]");
  });

  it("should clear comment input after clicking submit", () => {
    cy.addCommentWithUI("[Test comment]");

    cy.get("[data-test=comment-input]").should(
      "not.contain.value",
      "[Test comment]"
    );
  });

  it("should clear comment input form after clicking cancel button", () => {
    cy.get("[data-test=comment-input]").type("[Test comment]");
    cy.get("[data-test=cancel-comment-button]").click();
    cy.get("[data-test=comment-input]").should("contain.value", "");
  });

  it("should add 5 comments", () => {
    for (let comment of commentsTestData) {
      cy.addCommentWithUI(comment.text);
    }

    cy.get("[data-test=comment-container]")
      .should("be.visible")
      .and("have.length", 5);
  });

  it("should have comments persist after page reload", () => {
    for (let comment of commentsTestData) {
      cy.addCommentWithUI(comment.text);
    }

    cy.reload();
    cy.get("[data-test=comment-container]").should("have.length", 5);

    cy.get("[data-test=comment-container]")
      .eq(0)
      .should("contain.text", "This is my fifth comment!");
    cy.get("[data-test=comment-container]")
      .eq(1)
      .should("contain.text", "This is the forth comment!");
    cy.get("[data-test=comment-container]")
      .eq(2)
      .should("contain.text", "A truly great book, worth the read");
    cy.get("[data-test=comment-container]")
      .eq(3)
      .should("contain.text", "This book was great! Definetly recommend.");
    cy.get("[data-test=comment-container]")
      .eq(4)
      .should("contain.text", "Awesome book, really inspiring!");
  });

  after(() => {
    cy.deleteTestData();
  });
});
