/// <reference types="cypress" />

describe("Motivational Speech API 'GET' request", () => {
  before(() => {
    cy.deleteTestData()
    cy.fixture("apiResourceData").then((testData) =>
      cy.addResourceWithAPI("motivational-speech", testData)
    );
  });

  it("should have status code 200", () => {
    cy.request("http://localhost:8000/api/motivational-speeches/").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("should return JSON", () => {
    cy.request("http://localhost:8000/api/motivational-speeches/").then(
      (response) => {
        expect(response.headers).to.have.property(
          "content-type",
          "application/json"
        );
      }
    );
  });

  it("should have motivational speech fields", () => {
    cy.request("http://localhost:8000/api/motivational-speeches/").then(
      (response) => {
        const firstMotivationalSpeech = response.body[0];
        expect(firstMotivationalSpeech).to.have.property("id");
        expect(firstMotivationalSpeech).to.have.property("title", "Test Title");
        expect(firstMotivationalSpeech).to.have.property(
          "author",
          "Test Author"
        );
        expect(firstMotivationalSpeech).to.have.property("description");
        expect(firstMotivationalSpeech).to.have.property("imageURL");
        expect(firstMotivationalSpeech).to.have.property("youtube_url");
        expect(firstMotivationalSpeech).to.have.property("avg_rating", 0);
        expect(firstMotivationalSpeech).to.have.property("num_ratings", 0);
      }
    );
  });
});

describe("Motivational Speech API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/motivational-speeches/",
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
        url: "http://localhost:8000/api/motivational-speeches/",
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

  it("should have motivationalSpeech episode fields", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/motivational-speeches/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env("adminToken")}`,
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        const motivationalSpeech = response.body;
        expect(motivationalSpeech).to.have.property("id");
        expect(motivationalSpeech).to.have.property("title", testData.title);
        expect(motivationalSpeech).to.have.property("author", testData.author);
        expect(motivationalSpeech).to.have.property("description");
        expect(motivationalSpeech).to.have.property("imageURL");
        expect(motivationalSpeech).to.have.property("youtube_url", testData.youtube_url);
        expect(motivationalSpeech).to.have.property("avg_rating", 0);
        expect(motivationalSpeech).to.have.property("num_ratings", 0);
      });
    });
  });
});
