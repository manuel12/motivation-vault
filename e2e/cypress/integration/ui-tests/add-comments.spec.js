/// <reference types="cypress" />

describe("Add Comments", () => {
  before(() => {
    cy.deleteTestData()
    cy.loginWithAPI("testuser1", "testpass1")
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("book", resourceData);
    })
    cy.get(".post-container a").first().click({ force: true });
  })

  it("should add 3 comments", () => {
    cy.fixture("comments").then((comments) => {
      for (let comment of comments) {
        cy.addCommentWithUI(comment.text)
      }
    });

    cy.get("[data-test=comment-container]")
      .should("be.visible")
      .and("have.length", 3);
  });

  it("should display comment text and user", () => {
    cy.fixture("comments").then((comments) => {
      for (let comment of comments) {
        let commentIndex = comments.reverse().indexOf(comment);
        cy.get("[data-test=comment-container]")
          .eq(commentIndex)
          .should("contain.text", comments[commentIndex].get_username)
          .and("contain.text", comments[commentIndex].text);
      }
    });
  });

  it("should add a comment", () => {
    cy.addCommentWithUI("[Test comment]")

    cy.get("[data-test=comment-container]")
      .first()
      .should("contain.text", "[Test comment]");
  });

  it("should clear comment input after clicking submit", () => {
    cy.addCommentWithUI("[Test comment]")
    
    cy.get("[data-test=comment-input]").should(
      "not.contain.value",
      "[Test comment]"
    );
  });

  it("should have comments persist after page reload", () => {
    cy.get("[data-test=comment-container]").should("have.length", 5);

    cy.get("[data-test=comment-container]")
      .eq(0)
      .should("contain.text", "[Test comment]");
    cy.get("[data-test=comment-container]")
      .eq(1)
      .should("contain.text", "[Test comment]");
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
