/// <reference types="cypress" />

describe("Add Comments", () => {
  beforeEach(() => {
    cy.deleteTestData();

    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithAPI("book", resourceData);
    });
    cy.request({
      url: "http://localhost:8000/api/books/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Cypress.env("adminToken")}`,
      },
    }).then((response) => {
      const firstBook = response.body[0];
      expect(firstBook).to.have.property("id");
      expect(firstBook).to.have.property("title", "Test Title");
    });

    cy.loginWithAPI("testuser1", "testpass1");
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
    cy.get("[data-test=add-comment-cancel-button]").click();
    cy.get("[data-test=comment-input]").should("contain.value", "");
  });

  it("should add 5 comments", () => {
    cy.fixture("comments").then((comments) => {
      for (let comment of comments) {
        cy.addCommentWithUI(comment.text);
      }
    });

    cy.get("[data-test=comment-container]")
      .should("be.visible")
      .and("have.length", 5);
  });

  it("should have comments persist after page reload", () => {
    cy.fixture("comments").then((comments) => {
      for (let comment of comments) {
        cy.addCommentWithUI(comment.text);
      }
    });

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
