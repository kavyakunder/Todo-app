describe("Todo-List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("clear the list", () => {
    cy.get('[data-testid="btn-deleteAll"]').should("not.exist");

    cy.get('[data-testid="input-text"]').type("Hello");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello");

    cy.get('[data-testid="btn-deleteAll"]').should("exist");

    cy.get('[data-testid="input-text"]').type("Hello2");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello2");

    cy.get('[data-testid="btn-deleteAll"]').click();
    cy.get('[data-testid="initial-msg"]').should("contain", "Make a todoList");
  });
});
