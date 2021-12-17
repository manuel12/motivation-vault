/// <reference types="cypress" />

describe("Podacst Episode API 'GET' request", () => {
  before(() => {
    cy.deleteTestData();
    cy.fixture("apiResourceData").then((testData) =>
      cy.addResourceWithAPI("podcasts-episode", testData)
    );
  });

  it("should have status code 200", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${Cypress.env("adminToken")}`,
      }
    }).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("should return JSON", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${Cypress.env("adminToken")}`,
      }
    }).then(
      (response) => {
        expect(response.headers).to.have.property(
          "content-type",
          "application/json"
        );
      }
    );
  });

  it("should have podcast episode fields", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${Cypress.env("adminToken")}`,
      }
    }).then(
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
        expect(firstMotivationalSpeech).to.have.property("spotify_episode_url");
        expect(firstMotivationalSpeech).to.have.property("youtube_episode_url");
        expect(firstMotivationalSpeech).to.have.property("avg_rating", 0);
        expect(firstMotivationalSpeech).to.have.property("num_ratings", 0);
      }
    );
  });
});

describe("Podcast Episode API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/podcast-episodes/",
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
        url: "http://localhost:8000/api/podcast-episodes/",
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

  it("should have podcast episode fields", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/podcast-episodes/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${Cypress.env("adminToken")}`,
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        const podcastEpisode = response.body;
        expect(podcastEpisode).to.have.property("id");
        expect(podcastEpisode).to.have.property("title", testData.title);
        expect(podcastEpisode).to.have.property("author", testData.author);
        expect(podcastEpisode).to.have.property("description");
        expect(podcastEpisode).to.have.property("imageURL");
        expect(podcastEpisode).to.have.property(
          "from_podcast",
          testData.from_podcast
        );
        expect(podcastEpisode).to.have.property(
          "youtube_episode_url",
          testData.youtube_episode_url
        );
        expect(podcastEpisode).to.have.property(
          "spotify_episode_url",
          testData.spotify_episode_url
        );
        expect(podcastEpisode).to.have.property("avg_rating", 0);
        expect(podcastEpisode).to.have.property("num_ratings", 0);
      });
    });
  });
});
