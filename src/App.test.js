import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("./components/TodoList", () => ({
  TodoList: ({ deleteItemFromList, updateItemFromList }: AppProps) => {
    return (
      <div>
        <div>TodoList</div>
        <button data-testid="editItem" onClick={updateItemFromList}>
          EditTodoList
        </button>
        <button data-testid="deleteItem" onClick={deleteItemFromList}>
          DeleteTodoList
        </button>
      </div>
    );
  },
}));

describe("render App component", () => {
  it("renders input and button", () => {
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
    const editItem = screen.getByTestId("editItem");
    fireEvent.click(editItem);
  });

  it("delete item from the list", async () => {
    render(<App />);
    const deleteItem = screen.getByTestId("deleteItem");
    fireEvent.click(deleteItem);
  });

  it("delete entire list", async () => {
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
    const btnDeleteAll = screen.getByTestId("btn-deleteAll");

    fireEvent.click(btnDeleteAll);
    expect(screen.getByTestId("initial-msg")).toBeInTheDocument();
  });
});
