describe("Todo-List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("strike a todo item when checked", () => {
    cy.get('[data-testid="input-text"]').type("Hello");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello");

    cy.get('[type="checkbox"]').check();
    cy.visit("http://localhost:3000/");
    cy.get('[type="checkbox"]').should("be.checked");
  });

  it("unstrike a todo item when unchecked", () => {
    cy.get('[data-testid="input-text"]').type("Hello2");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello2");

    cy.get('[type="checkbox"]').check();
    cy.visit("http://localhost:3000/");
    cy.get('[type="checkbox"]').should("be.checked");
    cy.get('[type="checkbox"]').uncheck();
    cy.get('[type="checkbox"]').should("not.be.checked");
  });
});
