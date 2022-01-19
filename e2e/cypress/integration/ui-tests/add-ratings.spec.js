/// <reference types="cypress" />

describe("Add Ratings", () => {
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

  it("should add ratings to a resource", () => {
    cy.addRatingWithUI(5);

    cy.get("[data-test=star-icon-1]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-2]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-3]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-4]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-5]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=num-ratings]")
      .should("contain.text", "1")
      .and("contain.text", "review");
  });

  pages = ["books", "podcasts", "podcasts-episodes", "motivational-speeches"];
  for (let page of pages) {
    it(`should update rating on ${page} once it has been updated on detailpage`, () => {
      const numStarsFirstRating = 1;
      const numStarsUpdatedRating = 4;

      cy.fixture("apiResourceData").then((resourceData) => {
        // TODO: add utils to get resourceType from page string.
        let resourceType =
          page === "motivational-speeches"
            ? page.substr(0, page.length - 2)
            : page.substr(0, page.length - 1);

        // Change resource title to specific name
        resourceData.title = "Test Title - Ratings";
        cy.addResourceWithAPI(resourceType, resourceData);

        // Visit page section.
        cy.visit(page);

        // Click on new resource.
        cy.contains("Test Title - Ratings").click({ force: true });

        // Wait for heading to appear.
        cy.get(".heading").should("be.visible");

        cy.addRatingWithUI(numStarsFirstRating);

        cy.visit(page);

        // Check ratings container on page section.
        cy.get("[data-test=ratings-container]")
          .first()
          .within(() => {
            cy.get("[data-test=star-icon-1]").should("be.visible");
          })
          .click();

        cy.addRatingWithUI(numStarsUpdatedRating);

        cy.visit(page);

        cy.get("[data-test=ratings-container]")
          .first()
          .within(() => {
            const starsNumToCheck = [
              ...Array(numStarsUpdatedRating + 1).keys(),
            ].slice(1);

            for (let i of starsNumToCheck)
              cy.get(`[data-test=star-icon-${i}]`).should("be.visible");
          });
      });
    });
  }

  it("should NOT add a rating to a resource with invalid data", () => {
    cy.get("[data-test=add-rating-button]").should("be.visible").click();

    cy.get("[data-test=add-rating-input]")
      .should("be.visible")
      .clear()
      .type("nonsensetext");

    cy.get("[data-test=add-rating-submit-button]").click();

    cy.get("[data-test=add-rating-input-error]")
      .should("be.visible")
      .and("contain.text", "Rating needs to be between 1 and 5");
  });

  it("should add a rating to a resource by pressing ENTER when all fields are filled", () => {
    cy.get("[data-test=add-rating-button]").should("be.visible").click();

    cy.get("[data-test=add-rating-input]")
      .should("be.visible")
      .clear()
      .type("5{enter}");

    cy.get("[data-test=star-icon-1]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-2]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-3]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-4]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=star-icon-5]")
      .should("be.visible")
      .and("have.class", "orange");

    cy.get("[data-test=num-ratings]")
      .should("contain.text", "1")
      .and("contain.text", "review");
  });

  it("should NOT display rating input form after clicking cancel button", () => {
    cy.get("[data-test=add-rating-button]").should("be.visible").click();
    cy.get("[data-test=add-rating-cancel-button]").should("be.visible").click();
    cy.get("[data-test=rating-input-form]").should("not.exist");
  });

  it("should NOT post rating after clikcking on an element outside it", () => {});

  it("should display error label when submitting rating lower than 1", () => {
    cy.get("[data-test=add-rating-button]").should("be.visible").click();

    cy.get("[data-test=add-rating-input]")
      .should("be.visible")
      .clear()
      .type("0");

    cy.get("[data-test=add-rating-submit-button]").click();
    cy.get("[data-test=add-rating-input-error]")
      .should("be.visible")
      .and("contain.text", "Rating needs to be between 1 and 5");
  });

  it("should display error label when submitting rating higher than 5", () => {
    cy.get("[data-test=add-rating-button]").should("be.visible").click();

    cy.get("[data-test=add-rating-input]")
      .should("be.visible")
      .clear() 
      .type("6");

    cy.get("[data-test=add-rating-submit-button]").click();
    cy.get("[data-test=add-rating-input-error]")
      .should("be.visible")
      .and("contain.text", "Rating needs to be between 1 and 5");
  });

  it("should update without reloading the page", () => {});

  it("should display the text (0 reviews) in case of having more than 0 ratings", () => {
    cy.get("[data-test=num-ratings]").should("contain.text", "(0 reviews)");
  });

  it("should display the text (1 review) in case of having only 1 review", () => {
    cy.addRatingWithUI(5);

    cy.get("[data-test=num-ratings]").should("contain.text", "(1 review)");
  });

  it("should display the text (2 reviews) in case of having 2 ratings", () => {
    cy.location().then((loc) => {
      const resourceId = loc.pathname.replaceAll("/", "");
      cy.addRatingWithAPI(
        resourceId,
        5,
        "eeed5020633747d1b9530fe9a2a8bec0601aad93"
      );
      cy.addRatingWithAPI(
        resourceId,
        5,
        "4044a7dfd19e9d41c585b388af32cba151c6cd36"
      );
    });

    cy.reload();
    cy.get("[data-test=num-ratings]").should("contain.text", "(2 reviews)");
  });

  after(() => {
    cy.deleteTestData();
  });
});
