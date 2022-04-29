/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-api-data.json");
const testuserData = require("../../fixtures/testuser.json");

describe("Podacst API 'GET' request", () => {
  before(() => {
    cy.deleteTestData();
    cy.createResourceWithAPI("podcast", resourceData);
  });

  it("should have status code 200", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcasts/",
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
      url: "http://localhost:8000/api/podcasts/",
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

  it("should have podcast fields", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcasts/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      const firstPodcast = response.body[0];
      expect(firstPodcast).to.have.property("id");
      expect(firstPodcast).to.have.property("title", "[Test Title]");
      expect(firstPodcast).to.have.property("author", "[Test Author]");
      expect(firstPodcast).to.have.property("description");
      expect(firstPodcast).to.have.property("imageURL");
      expect(firstPodcast).to.have.property("website_url");
      expect(firstPodcast).to.have.property("spotify_page_url");
      expect(firstPodcast).to.have.property("youtube_page_url");
      expect(firstPodcast).to.have.property("avg_rating", 0);
      expect(firstPodcast).to.have.property("num_ratings", 0);
    });
  });
});

describe("Podacst API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/podcasts/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceData),
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should return JSON", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/podcasts/",
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

  it("should have podcast fields", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/podcasts/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceData),
    }).then((response) => {
      const podcast = response.body;
      expect(podcast).to.have.property("id");
      expect(podcast).to.have.property("title", resourceData.title);
      expect(podcast).to.have.property("author", resourceData.author);
      expect(podcast).to.have.property("description");
      expect(podcast).to.have.property("imageURL");
      expect(podcast).to.have.property("website_url", resourceData.website_url);
      expect(podcast).to.have.property(
        "spotify_page_url",
        resourceData.spotify_page_url
      );
      expect(podcast).to.have.property(
        "youtube_page_url",
        resourceData.youtube_page_url
      );
      expect(podcast).to.have.property("avg_rating", 0);
      expect(podcast).to.have.property("num_ratings", 0);
    });
  });
});
