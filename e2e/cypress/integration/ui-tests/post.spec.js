/// <reference types="cypress" />

describe("Post", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
  });

  const pages = [
    "home",
    "books",
    "podcasts",
    "podcast-episodes",
    "motivational-speeches",
  ];

  const postSectionElements = [
    "title",
    "author",
    "description",
    "image",
    "rating-section",
  ];

  for (const page of pages) {
    context(`Check first post on ${page} page`, () => {
      it(`should display title, author, description, image and rating on post element`, () => {
        if (page !== "home") cy.visit(`/${page}/`);

        cy.get("[data-test=spinner]")
          .should("not.exist")
          .then(() => {
            cy.get("[data-test=post-list-container]")
              .children()
              .first()
              .within(() => {
                for (const element of postSectionElements) {
                  let elementToCheck;
                  element === "rating-section"
                    ? (elementToCheck = cy.get(`[data-test=ratings-container]`))
                    : (elementToCheck = cy.get(`[data-test=post-${element}]`));

                  elementToCheck.should("be.visible");
                }
              });
          });
      });
    });
  }
});
