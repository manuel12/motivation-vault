/// <reference types="cypress" />

const resourceTestData = require("../../fixtures/resourceAPITestData.json");
const tokenData = require("../../fixtures/tokens.json");

describe("Add Ratings", () => {
  beforeEach(() => {
    cy.loginAndCleanUp();
    cy.addResourceWithAPI("book", resourceTestData);

    cy.visit("/");
    cy.contains("Test Title").click({ force: true });
  });

  const getResourceTypeFromPage = (page) => {
    if (page === "podcasts-episodes") return "podcast-episode";
    else if (page === "motivational-speeches")
      return page.substr(0, page.length - 2);
    else return page.substr(0, page.length - 1);
  };

  const checkStars = (stars) => {
    let i = 1;
    while (i <= stars) {
      cy.get(`[data-test=star-icon-${i}]`)
        .should("be.visible")
        .invoke("attr", "class")
        .should("contain", "orange");
      i++;
    }
  };

  const getResourceIdFromUrl = (url) => url.pathname.replaceAll("/", "");

  let pages = [
    "home",
    "books",
    "podcasts",
    "podcast-episodes",
    "motivational-speeches",
  ];

  for (let page of pages) {
    it(`should display ratings section on ${page} page`, () => {
      cy.visit(`/${page == "home" ? "" : page}`);

      cy.get("[data-test=ratings-container]").first().should("be.visible");
    });
  }

  it("should display ratings section on detail page", () => {
    cy.get("[data-test=ratings-container]").should("be.visible");
  });

  const stars = [1, 2, 3, 4, 5];
  stars.forEach((star) => {
    it(`should add ratings with ${star} ${
      star > 1 ? "stars" : "star"
    } to a resource`, () => {
      cy.addRatingWithUI(star);
      checkStars(star);

      cy.get("[data-test=num-ratings]")
        .should("contain.text", "1")
        .and("contain.text", "rating");
    });
  });

  pages = ["books", "podcasts", "podcasts-episodes", "motivational-speeches"];

  for (let page of pages) {
    it(`should update rating on ${page} once it has been updated on detailpage`, () => {
      const numStarsFirstRating = 1;
      const numStarsUpdatedRating = 4;

      let resourceType = getResourceTypeFromPage(page);
      cy.log(resourceType);

      // Change resource title, add resource and check on page section
      resourceTestData.title = "Test Title - Ratings";
      cy.addResourceWithAPI(resourceType, resourceTestData);
      cy.visit(page);

      // Click on new resource, wait for heading to appear and
      // add rating.
      cy.contains("Test Title - Ratings").click({ force: true });
      cy.get("[data-test=heading]").should("be.visible");
      cy.addRatingWithUI(numStarsFirstRating);

      // Check ratings container on page section.
      cy.visit(page);
      cy.get("[data-test=ratings-container]")
        .first()
        .within(() => {
          checkStars(numStarsFirstRating);
        })
        .click();

      // Update rating, check page section and updated number of stars.
      cy.addRatingWithUI(numStarsUpdatedRating);
      cy.visit(page);
      cy.get("[data-test=ratings-container]")
        .first()
        .within(() => {
          checkStars(numStarsUpdatedRating);
        });
    });
  }

  it("should display the text (0 ratings) in case of having more than 0 ratings", () => {
    cy.get("[data-test=num-ratings]").should("contain.text", "(0 ratings)");
  });

  it("should display the text (1 rating) in case of having only 1 rating", () => {
    cy.addRatingWithUI(5);

    cy.get("[data-test=num-ratings]").should("contain.text", "(1 rating)");
  });

  it("should display the text (2 ratings) in case of having 2 ratings", () => {
    const testuser2Token = tokenData["testuser2"];
    const testuser3Token = tokenData["testuser3"];

    // Get resourceId and add 2 ratings from different user to said resourceId.
    cy.location().then((loc) => {
      const resourceId = getResourceIdFromUrl(loc);
      cy.addRatingWithAPI(resourceId, 5, testuser2Token);
      cy.addRatingWithAPI(resourceId, 5, testuser3Token);
    });

    cy.reload();
    cy.get("[data-test=num-ratings]").should("contain.text", "(2 ratings)");
  });

  after(() => {
    cy.deleteTestData();
  });
});
