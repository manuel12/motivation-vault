/// <reference types="cypress" />

describe("Add Book Resources", () => {
  beforeEach(() => {
    cy.deleteTestData();
    
    cy.loginWithAPI("testuser1", "testpass1");
    cy.get(".App").should("be.visible");
  });

  it("should add a book resource", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("book", resourceData);

      cy.url().should("not.contain", "add/");
      cy.get(".add-container").should("not.exist");

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  });

  it("should display added book resource on book section", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("book", resourceData);

      cy.visit("/books/");
      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  })

  it("should add a book resource filling required fields only", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.addResourceWithUI("book", resourceData, true);

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author);
    });
  });

  it("should NOT submit a book form without filling required fields", () => {
    cy.visit("/add/");
    cy.get(".add-container").should("be.visible");
    cy.get("[data-test=select-resource-type]").select("Book");

    cy.get("[data-test=submit]").click();

    cy.url().should("contain", "add/");

    cy.get("[data-test=title-input-error]").should("be.visible");
    cy.get("[data-test=author-input-error]").should("be.visible");
    cy.get("[data-test=subtitle-input-error]").should("be.visible");
    cy.get("[data-test=isbn-input-error]").should("be.visible");
  });

  it("should NOT add a book resource with invalid data", () => {
    cy.fixture("invalidResourceData").then((invalidData) => {
      cy.addResourceWithUI("book", invalidData);

      cy.url().should("contain", "add/");
      
      cy.get("[data-test=isbn-input-error]")
        .should("be.visible")
        .and("contain.text", "ISBN has to be a 13 digits!");
    });
  });

  it("should add a book resource by pressing ENTER when all fields are filled", () => {
    cy.fixture("resourceData").then((resourceData) => {
      cy.visit("/add/");
      cy.get(".add-container").should("be.visible");
      cy.get("[data-test=select-resource-type]").select("Book");

      cy.get("[data-test=title-input]").type(resourceData.title);
      cy.get("[data-test=subtitle-input]").type(resourceData.subtitle);
      cy.get("[data-test=author-input]").type(resourceData.author);
      cy.get("[data-test=isbn-input]").type(resourceData.isbn);

      cy.get("[data-test=description-input]").type(resourceData.description);

      cy.get("[data-test=value-one-input]").type(resourceData.valueOne);
      cy.get("[data-test=value-two-input]").type(resourceData.valueTwo);
      cy.get("[data-test=value-three-input]").type(
        `${resourceData.valueThree}{enter}`
      );

      cy.url().should("not.contain", "add/");
      cy.get(".add-container").should("not.exist");

      cy.get("[data-test=post-container]")
        .first()
        .should("contain", resourceData.title)
        .and("contain", resourceData.author)
        .and("contain", resourceData.description);
    });
  });

  after(() => {
    cy.deleteTestData();
  });
});
