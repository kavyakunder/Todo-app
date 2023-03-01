describe("Todo-List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("edit todo item", () => {
    cy.get('[data-testid="input-text"]').type("Hello");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello");
    cy.get('[data-testid="list-item"]').should("contain", "Hello");
    cy.get('[data-testid="input-text"]').type("Hello2");
    cy.get('[data-testid="btn-add"]').click();

    cy.get('[data-testid="todoList"]')
      .contains("Hello2")
      .parent()
      .parent()
      .siblings()
      .children()
      .children('[data-testid="btn-edit"]')
      .click();

    cy.get('[data-testid="input-edit"]').type("Hello3");

    cy.get('[data-testid="btn-save"]').click();
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="todoList"]').should("contain", "Hello");
  });
});
