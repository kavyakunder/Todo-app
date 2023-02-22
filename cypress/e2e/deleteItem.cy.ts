describe("Todo-List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("delete a todo item", () => {
    cy.get('[data-testid="input-text"]').type("Hello");
    cy.get('[data-testid="btn-add"]').click({ force: true });
    cy.get('[data-testid="list"]').contains("Hello");

    cy.get('[data-testid="input-text"]').type("Hello2", { force: true });
    cy.get('[data-testid="btn-add"]').click({ force: true });
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="list"]')
      .contains("Hello2")
      .parent()
      .siblings()
      .children()
      .children('[data-testid="btn-delete"]')
      .click({ force: true });
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="list"]').contains("Hello");
    cy.get('[data-testid="list"]').not("Hello2");
  });
});
