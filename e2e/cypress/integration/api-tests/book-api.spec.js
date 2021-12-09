/// <reference types="cypress" />

describe("Book API 'GET' request", () => {
  before(() => {
    cy.deleteTestData();
    cy.fixture("apiResourceData").then((testData) =>
      cy.addResourceWithAPI("book", testData)
    );
  });

  it("should have status code 200", () => {
    cy.request("http://localhost:8000/api/books/").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should return JSON", () => {
    cy.request("http://localhost:8000/api/books/").then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have book fields", () => {
    cy.request("http://localhost:8000/api/books/").then((response) => {
      const firstBook = response.body[0];
      expect(firstBook).to.have.property("id");
      expect(firstBook).to.have.property("title", "Test Title");
      expect(firstBook).to.have.property("author", "Test Author");
      expect(firstBook).to.have.property("description");
      expect(firstBook).to.have.property("imageURL");
      expect(firstBook).to.have.property("subtitle", "Test Subtitle");
      expect(firstBook).to.have.property("isbn", "1234567891011");
      expect(firstBook).to.have.property("avg_rating", 0);
      expect(firstBook).to.have.property("num_ratings", 0);
    });
  });
});

describe("Book API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/books/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env("adminToken")}`,
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  it("should return JSON", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/books/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env("adminToken")}`,
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        expect(response.headers).to.have.property(
          "content-type",
          "application/json"
        );
      });
    });
  });

  it("should have book fields", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/books/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env("adminToken")}`,
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        const book = response.body;
        expect(book).to.have.property("id");
        expect(book).to.have.property("title", testData.title);
        expect(book).to.have.property("author", testData.author);
        expect(book).to.have.property("description");
        expect(book).to.have.property("imageURL");
        expect(book).to.have.property("subtitle", testData.subtitle);
        expect(book).to.have.property("isbn", Number(testData.isbn).toString());
        expect(book).to.have.property("avg_rating", 0);
        expect(book).to.have.property("num_ratings", 0);
      });
    });
  });
});
