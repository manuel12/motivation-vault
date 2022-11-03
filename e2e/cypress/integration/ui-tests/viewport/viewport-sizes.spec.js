/// <reference types="cypress" />

const sizes = [
  [992, 600],
  [768, 600],
  [600, 600],
];

const pages = ["/", "/about/"];

describe("Viewport", () => {
  beforeEach(() => {
    cy.loginWithAPI();
  });

  for (const size of sizes) {
    for (let page of pages) {
      let pageStr = page === "/" ? "home" : "about"
      it(`should test viewport width(${size[0]}) on page(${pageStr})`, () => {
        cy.viewport(...size);
        cy.visit(page);
        cy.get("body").matchImageSnapshot(
          `page: ${pageStr} - size: ${size}`
        );
      });
    }

    it("should test detailpage", () => {
      cy.viewport(...size);
      cy.visit("/");
      cy.get("[data-test=spinner]")
        .should("not.exist")
        .then(() => {
          cy.get("[data-test=post-list-container]").children().first().click();
          cy.get("[data-test=detail-page-container]").matchImageSnapshot(
            `detailpage - size: ${size}`
          );
        });
    });
  }

  it(`should test opening and closing navbar with hamburger button`, () => {
    // Max viewport witdh where the hamburger button appears.
    cy.viewport(600, 600);

    cy.visit("/");

    cy.get("[data-test=hamburger-btn]").click();
    cy.get("[data-test=app-navbar]").matchImageSnapshot(`open navbar`);
    cy.get("[data-test=hamburger-btn]").click();
    cy.get("[data-test=app-navbar]").matchImageSnapshot(`closed navbar`);
  });
});
