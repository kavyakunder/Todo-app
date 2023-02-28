import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { TodoListProps } from "./components/TodoList";

jest.mock("./components/TodoList", () => ({
  TodoList: ({
    deleteItemFromList,
    updateItemFromList,
    item,
  }: TodoListProps) => {
    return (
      <div>
        <div>{item.name}</div>
        <button
          data-testid="editItem"
          onClick={() => updateItemFromList({ ...item, name: "lorem ipsum" })}
        >
          EditTodoList
        </button>
        <button
          data-testid="deleteItem"
          onClick={() => deleteItemFromList(item.id)}
        >
          DeleteTodoList
        </button>
      </div>
    );
  },
}));

describe("render App component", () => {
  it("Should render input and button", () => {
    render(<App />);

    const headingElement = screen.getByTestId("heading");
    const inputText = screen.getByTestId("input-text");
    const btnAdd = screen.getByTestId("btn-add");

    expect(headingElement).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });

  it("Should add an item to the list", async () => {
    render(<App />);

    const inputText = screen.getByTestId("input-text");
    const btnAdd = screen.getByTestId("btn-add");

    expect(inputText).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();

    fireEvent.change(inputText, { target: { value: "New" } });
    expect(btnAdd).not.toBeDisabled();

    fireEvent.click(btnAdd);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("Should edit an item from the list", async () => {
    render(<App />);

    const editItem = screen.getByTestId("editItem");
    fireEvent.click(editItem);

    expect(screen.getByText("lorem ipsum")).toBeInTheDocument();
  });

  it("Should delete an item from the list", async () => {
    render(<App />);

    const deleteItem = screen.getByTestId("deleteItem");
    fireEvent.click(deleteItem);

    expect(screen.queryByText("lorem ipsum")).not.toBeInTheDocument();
  });

  it("Should delete entire list", async () => {
    render(<App />);

    const inputText = screen.getByTestId("input-text");
    const btnAdd = screen.getByTestId("btn-add");

    expect(inputText).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();

    fireEvent.change(inputText, { target: { value: "New" } });
    expect(btnAdd).not.toBeDisabled();

    fireEvent.click(btnAdd);

    const btnDeleteAll = screen.getByTestId("btn-deleteAll");
    fireEvent.click(btnDeleteAll);

    expect(screen.getByTestId("initial-msg")).toBeInTheDocument();
  });
});
