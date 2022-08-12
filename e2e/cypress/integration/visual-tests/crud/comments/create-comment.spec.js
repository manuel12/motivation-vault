/// <reference types="cypress" />

const resourceData = require("../../../../fixtures/resource-data.json");
const commentsData = require("../../../../fixtures/comments-data.json");

describe("Visual Tests - Create Comments", () => {
  before(() => {
    cy.loginWithAPI();
    cy.createResourceWithAPI("book", resourceData);

    cy.visit("/");
    cy.contains(resourceData.title).click({ force: true });
  });

  it(`should create 1, 2, 3, 4, 5 comments`, () => {
    let commentCounter = 1;
    for (const comment of commentsData) {
      const now = new Date(Date.UTC(2022, 1, 1)).getTime();
      cy.clock(now);

      cy.createCommentWithUI(comment.text);
      cy.get("[data-test=comment-section-container]").matchImageSnapshot(
        `${commentCounter} comment`
      );
      commentCounter += 1;
    }
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});
