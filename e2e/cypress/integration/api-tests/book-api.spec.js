/// <reference types="cypress" />

beforeEach(() => {
  cy.deleteTestData()
})

describe("Book API 'GET' request", () => {
  before(() => {
    cy.fixture("apiResourceData").then((testData) =>
      cy.addResourceWithAPI("book", testData)
    );
  });

  it.skip("should have status code 200", () => {
    cy.request("http://localhost:8000/api/books/").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it.skip("should return JSON", () => {
    cy.request("http://localhost:8000/api/books/").then((response) => {
      expect(response.headers).to.have.property("content-type", "application/json");
    });
  });

  it.skip("should have book fields", () => {
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
    cy.fixture("apiResourceData").then((testData) =>{

      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/books/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
        },
        body: JSON.stringify(testData)  
      }).then((response) => {
        expect(response.status).to.eq(201);
      });


    });
  });

  it("should return JSON", () => {
    cy.fixture("apiResourceData").then((testData) =>{

      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/books/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
        },
        body: JSON.stringify(testData)  
      }).then((response) => {
        expect(response.headers).to.have.property("content-type", "application/json");
      });

    });
  })

  it("should have book fields", () => {
    cy.fixture("apiResourceData").then((testData) =>{

      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/books/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
        },
        body: JSON.stringify(testData)  
      }).then((response) => {
        cy.log(response.body)
        const book = response.body;
        expect(book).to.have.property("id");
        expect(book).to.have.property("title", "Test Title");
        expect(book).to.have.property("author", "Test Author");
        expect(book).to.have.property("description");
        expect(book).to.have.property("imageURL");
        expect(book).to.have.property("subtitle", "Test Subtitle");
        expect(book).to.have.property("isbn", "1234567891011");
        expect(book).to.have.property("avg_rating", 0);
        expect(book).to.have.property("num_ratings", 0);
      });

    });
  })

})