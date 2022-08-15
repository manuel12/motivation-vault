/// <reference types="cypress" />

const resourceData = require("../../../../fixtures/resource-data.json");
const commentsData = require("../../../../fixtures/comments-data.json");

describe("Create Comments", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.createResourceWithAPI("book", resourceData);

    cy.visit("/");
    cy.contains(resourceData.title).click({ force: true });

    const now = new Date(Date.UTC(2022, 1, 1)).getTime();
    cy.clock(now);
  });

  it("should create 1, 2, 3, 4 and 5 comment(s)", () => {
    for (const comment of commentsData) {
      cy.createCommentWithUI(comment.text);

      cy.get("[data-test=comment-container]")
        .eq(0)
        .should("contain.text", comment.text);
    }

    cy.get("[data-test=comment-container]")
      .should("be.visible")
      .and("have.length", 5);
  });

  it("should clear comment input after clicking submit and after clicking the cancel button", () => {
    cy.createCommentWithUI("[Test comment]");

    cy.get("[data-test=comment-input]").should(
      "not.contain.value",
      "[Test comment]"
    );

    cy.get("[data-test=comment-input]").type("[Test comment]");
    cy.get("[data-test=cancel-comment-button]").click();
    cy.get("[data-test=comment-input]").should("contain.value", "");
  });

  it("should have comments persist after page reload", () => {
    for (const comment of commentsData) {
      cy.createCommentWithUI(comment.text);
    }

    cy.reload();
    cy.get("[data-test=comment-container]").should("have.length", 5);

    cy.get("[data-test=comment-container]")
      .eq(4)
      .should("contain.text", "This is my fifth comment!");
    cy.get("[data-test=comment-container]")
      .eq(3)
      .should("contain.text", "This is the forth comment!");
    cy.get("[data-test=comment-container]")
      .eq(2)
      .should("contain.text", "A truly great book, worth the read");
    cy.get("[data-test=comment-container]")
      .eq(1)
      .should("contain.text", "This book was great! Definetly recommend.");
    cy.get("[data-test=comment-container]")
      .eq(0)
      .should("contain.text", "Awesome book, really inspiring!");
  });

  after(() => {
    cy.deleteTestData();
  });
});
