/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-api-data.json");
// TODO: add newResourceData fixture.
const newResourceData = null;
const testuserData = require("../../fixtures/testuser.json");

// TODO: add admin user data fixture.
const adminuserData = null;

describe("Book API 'GET' request", () => {
  before(() => {
    cy.deleteTestData();
    cy.createResourceWithAPI("book", resourceData);
  });

  it("should have status code 200", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should return JSON", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have book fields", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      const firstBook = response.body[0];
      expect(firstBook).to.have.property("id");
      expect(firstBook).to.have.property("title", "[Test Title]");
      expect(firstBook).to.have.property("author", "[Test Author]");
      expect(firstBook).to.have.property("description");
      expect(firstBook).to.have.property("imageURL");
      expect(firstBook).to.have.property("subtitle", "[Test Subtitle]");
      expect(firstBook).to.have.property("isbn", "1234567891011");
      expect(firstBook).to.have.property("avg_rating", 0);
      expect(firstBook).to.have.property("num_ratings", 0);
    });
  });
});

describe("Book API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceData),
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should add 1 to the book resource count", () => {
    let bookResourceCount;

    cy.request("http://localhost:8000/api/books/").then((response) => {
      bookResourceCount = response.body.length;
    });

    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceData),
    });

    cy.request("http://localhost:8000/api/books/").then((response) => {
      expect(response.body.length).to.eq(bookResourceCount + 1);
    });
  });

  it("should return JSON", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceData),
    }).then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have book fields", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceData),
    }).then((response) => {
      const book = response.body;
      expect(book).to.have.property("id");
      expect(book).to.have.property("title", resourceData.title);
      expect(book).to.have.property("author", resourceData.author);
      expect(book).to.have.property("description");
      expect(book).to.have.property("imageURL");
      expect(book).to.have.property("subtitle", resourceData.subtitle);
      expect(book).to.have.property(
        "isbn",
        Number(resourceData.isbn).toString()
      );
      expect(book).to.have.property("avg_rating", 0);
      expect(book).to.have.property("num_ratings", 0);
    });
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});

describe("Book API 'PUT' request", () => {
  const ctx = {};

  before(() => {
    cy.deleteTestData();
    cy.createResourceWithAPI("book", resourceData);

    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${adminuserData.token}`,
      },
    }).then((response) => {
      const firstBook = response.body[0];
      console.log(firstBook);
      ctx.id = firstBook.id;
    });
  });

  it.only("should have status code 204", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:8000/api/books/${ctx.id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${adminuserData.token}`,
      },
      body: JSON.stringify(newResourceData),
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should return JSON", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:8000/api/books/${ctx.id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${adminuserData.token}`,
      },
      body: JSON.stringify(newResourceData),
    }).then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have updated fields with updated data", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/books/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${adminuserData.token}`,
      },
      body: JSON.stringify(newResourceData),
    }).then((response) => {
      const book = response.body;
      expect(book).to.have.property("id");
      expect(book).to.have.property("title", newResourceData.title);
      expect(book).to.have.property("author", newResourceData.author);
      expect(book).to.have.property("description");
      expect(book).to.have.property("imageURL");
      expect(book).to.have.property("subtitle", newResourceData.subtitle);
      expect(book).to.have.property(
        "isbn",
        Number(newResourceData.isbn).toString()
      );
      expect(book).to.have.property("avg_rating", 0);
      expect(book).to.have.property("num_ratings", 0);
    });
  });
});
