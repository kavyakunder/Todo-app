/// <reference types="cypress" />
//added above line for temporarily. Remove it when get a solution.

describe("Todo-List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays the heading", () => {
    cy.get('[data-testid="heading"]').should("contain", "Todo-List");
    cy.get('[data-testid="btn-add"]').should("be.disabled");
  });

  it("adds a new todo item", () => {
    cy.get('[data-testid="input-text"]').type("    ");
    cy.get('[data-testid="input-text"]').should("have.value", "    ");
    cy.get('[data-testid="btn-add"]').should("be.disabled");
    cy.get('[data-testid="input-text"]').type("    Hello    ");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello");
    cy.get('[data-testid="input-text"]').type("Hello1");
    cy.get('[data-testid="btn-add"]').click();
    cy.get('[data-testid="todoList"]').contains("Hello");
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="todoList"]').should("contain", "Hello");
  });
});
