describe("Todo-List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("edit todo item", () => {
    cy.get('[data-testid="input-text"]').type("Hello", { force: true });
    cy.get('[data-testid="btn-add"]').click({ force: true });
    cy.get('[data-testid="list"]').contains("Hello");
    cy.get('[data-testid="list-item"]').should("contain", "Hello");
    cy.get('[data-testid="input-text"]').type("Hello2", { force: true });
    cy.get('[data-testid="btn-add"]').click({ force: true });
    cy.get('[data-testid="list"]').contains("Hello2");
    cy.get('[data-testid="list"]')
      .contains("Hello2")
      .parent()
      .siblings()
      .children()
      .children('[data-testid="btn-edit"]')
      .click();

    cy.get('[data-testid="input-edit"]')
      .focused()
      .clear()
      .type("Hello3", { force: true });
    // cy.get('[data-testid="input-edit"]').clear();

    cy.get('[data-testid="btn-save"]').click();
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="list"]').contains("Hello");
  });
});
