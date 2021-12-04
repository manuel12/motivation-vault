/// <reference types="cypress" />

describe("Podacst Episode API 'GET' request", () => {
  before(() => {
    cy.fixture("apiResourceData").then((testData) =>
      cy.addResourceWithAPI("podcasts-episode", testData)
    );
  });

  it("should have status code 200", () => {
    cy.request("http://localhost:8000/api/podcast-episodes/").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("should return JSON", () => {
    cy.request("http://localhost:8000/api/podcast-episodes/").then(
      (response) => {
        expect(response.headers).to.have.property(
          "content-type",
          "application/json"
        );
      }
    );
  });

  it("should have podcast episode fields", () => {
    cy.request("http://localhost:8000/api/podcast-episodes/").then(
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
        url: "http://localhost:8000/api/podcast-episodes/",
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

  it("should have podcast episode fields", () => {
    cy.fixture("apiResourceData").then((testData) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8000/api/podcast-episodes/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 51d55878caa6db7066be358ad1cd51eb90d88897",
        },
        body: JSON.stringify(testData),
      }).then((response) => {
        console.log(response.body);
        const podcast = response.body;
        expect(podcastEpisode).to.have.property("id");
        expect(podcastEpisode).to.have.property("title", "Test Title");
        expect(podcastEpisode).to.have.property("author", "Test Author");
        expect(podcastEpisode).to.have.property("description");
        expect(podcastEpisode).to.have.property("imageURL");
        expect(podcastEpisode).to.have.property("from_podcast");
        expect(podcastEpisode).to.have.property("youtube_episode_url");
        expect(podcastEpisode).to.have.property("spotify_episode_url");
        expect(podcastEpisode).to.have.property("avg_rating", 0);
        expect(podcastEpisode).to.have.property("num_ratings", 0);
      });
    });
  });
});
