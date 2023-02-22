import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("./components/TodoList", () => ({
  TodoList: ({ deleteFn, handleChange }) => {
    return (
      <div>
        <div>TodoList</div>
        <button data-testid="edit" onClick={handleChange}>
          EditTodoList
        </button>
        <button data-testid="del" onClick={deleteFn}>
          DeleteTodoList
        </button>
      </div>
    );
  },
}));

describe("render App component", () => {
  it("render input and button", () => {
    render(<App />);
    const headingElement = screen.getByTestId("heading");
    const inputText = screen.getByTestId("input-text");
    const btnAdd = screen.getByTestId("btn-add");

    expect(headingElement).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });

  it("implements add functionality", async () => {
    render(<App />);
    const inputText = screen.getByTestId("input-text");
    const btnAdd = screen.getByTestId("btn-add");

    expect(inputText).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();

    fireEvent.change(inputText, { target: { value: "New" } });
    expect(btnAdd).not.toBeDisabled();

    fireEvent.click(btnAdd);

    expect(screen.getByText("TodoList")).toBeInTheDocument();
  });

  it("edit item from the list", async () => {
    render(<App />);
    const edit = screen.getByTestId("edit");
    fireEvent.click(edit);
  });

  it("delete item from the list", async () => {
    render(<App />);
    const del = screen.getByTestId("del");
    fireEvent.click(del);
  });
});
