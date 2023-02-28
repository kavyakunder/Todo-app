import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { TodoListProps } from "./TodoList";

describe("Todo List", () => {
  it("Should edit and save the item", () => {
    render(<TodoList {...mockProps} />);

    const btnEdit = screen.getByTestId("btn-edit");
    fireEvent.click(btnEdit);

    const inputEdit = screen.getByTestId("input-edit");
    const btnSave = screen.getByTestId("btn-save");

    fireEvent.change(inputEdit, { target: { value: "hello world" } });
    fireEvent.click(btnSave);

    expect(mockUpdateItemFromList).toHaveBeenCalledWith({
      checked: false,
      id: 1,
      name: "hello world",
    });
  });

  it("Should delete the item", () => {
    render(<TodoList {...mockProps} item={{ ...mockItem, checked: true }} />);

    const btnDelete = screen.getByTestId("btn-delete");
    fireEvent.click(btnDelete);

    expect(mockDeleteItemFromList).toHaveBeenCalledWith(1);
  });

  it("Should not save the edit", () => {
    render(<TodoList {...mockProps} />);

    const btnEdit = screen.getByTestId("btn-edit");
    fireEvent.click(btnEdit);

    const inputEdit = screen.getByTestId("input-edit");
    expect(inputEdit).toBeInTheDocument();

    const btnCancel = screen.getByTestId("btn-cancel");
    fireEvent.click(btnCancel);

    expect(inputEdit).not.toBeInTheDocument();
  });

  it("Should strike out the item", () => {
    render(<TodoList {...mockProps} />);

    const checkBox = screen.getByTestId("checkbox");
    fireEvent.click(checkBox.childNodes[0]);

    expect(mockUpdateItemFromList).toHaveBeenCalledWith({
      checked: true,
      id: 1,
      name: "lorem ipsum",
    });
  });
});

const mockUpdateItemFromList = jest.fn();
const mockDeleteItemFromList = jest.fn();
const mockItem = {
  id: 1,
  name: "lorem ipsum",
  checked: false,
};

const mockProps: TodoListProps = {
  deleteItemFromList: mockDeleteItemFromList,
  updateItemFromList: mockUpdateItemFromList,
  item: mockItem,
};
