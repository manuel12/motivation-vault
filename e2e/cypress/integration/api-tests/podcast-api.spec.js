/// <reference types="cypress" />

beforeEach(() => {
  cy.deleteTestData();
});

describe("Podacst API 'GET' request", () => {
  before(() => {
    cy.fixture("apiResourceData").then((testData) =>
      cy.addResourceWithAPI("podcast", testData)
    );
  });

  it("should have status code 200", () => {
    cy.request("http://localhost:8000/api/podcasts/").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should return JSON", () => {
    cy.request("http://localhost:8000/api/podcasts/").then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have podcast fields", () => {
    cy.request("http://localhost:8000/api/podcasts/").then((response) => {
      const firstPodcast = response.body[0];
      expect(firstPodcast).to.have.property("id");
      expect(firstPodcast).to.have.property("title", "Test Title");
      expect(firstPodcast).to.have.property("author", "Test Author");
      expect(firstPodcast).to.have.property("description");
      expect(firstPodcast).to.have.property("imageURL");
      expect(firstPodcast).to.have.property("website_url");
      expect(firstPodcast).to.have.property("website_url");
      expect(firstPodcast).to.have.property("avg_rating", 0);
      expect(firstPodcast).to.have.property("num_ratings", 0);
    });
  });
});

describe("Podacst API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/podcasts/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
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
        url: "http://localhost:8000/api/podcasts/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
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

  it("should have podcast fields", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/podcasts/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        console.log(response.body);
        const podcast = response.body;
        expect(podcast).to.have.property("id");
        expect(podcast).to.have.property("title", "Test Title");
        expect(podcast).to.have.property("author", "Test Author");
        expect(podcast).to.have.property("description");
        expect(podcast).to.have.property("imageURL");
        expect(podcast).to.have.property("website_url");
        expect(podcast).to.have.property("website_url");
        expect(podcast).to.have.property("avg_rating", 0);
        expect(podcast).to.have.property("num_ratings", 0);
      });
    });
  });
});
