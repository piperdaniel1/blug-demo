describe("The Home Page", () => {
  it("loads", () => {
    cy.visit("/");
  });

  // Add the test for the link to the Hobbies page here
  it("contains a button to /hobbies", () => {
    cy.visit("/");
    cy.get("button").should("exist");
    cy.get("button").click();
    cy.url().should("include", "/hobbies");
  });
});
