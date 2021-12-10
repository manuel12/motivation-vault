/// <reference types="cypress" />

describe("Add Ratings", () => {
  before(() => {
    cy.deleteTestData();
    cy.fixture("resourceData").then((resourceData) =>
      cy.addResourceWithAPI("book", resourceData)
    );
  })

  beforeEach(() => {
    cy.loginWithAPI("testuser1", "testpass1");

    cy.get("[data-test=post-container] > a")
    .should("be.visible")
    .first()
    .click({ force: true });
  })
  
  const pages = ["home", "books", "podcasts", "motivational-speeches"];
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
    cy.addRatingWithUI(5)

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

  const elements = [
    ".content",
    ".heading",
    ".author-container > strong",
    ".image",
  ];

  for (let element of elements) {
    it(`should NOT display rating input form  after clicking on an element (${element}) outside it`, () => {
      cy.get("[data-test=add-rating-button]").should("be.visible").click();
      cy.get(element).click();
      cy.get("[data-test=add-rating-input-form]").should("not.be.visible");
    });
  }

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
    cy.addRatingWithUI(5)

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

    cy.reload()
    cy.get("[data-test=num-ratings]").should("contain.text", "(2 reviews)");
  });

  after(() => {
    cy.deleteTestData()
  })
});
