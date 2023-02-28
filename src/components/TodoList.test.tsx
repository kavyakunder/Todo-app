import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { TodoListProps } from "./TodoList";

describe("Todo List", () => {
  it("implement save functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnEdit = screen.getByTestId("btn-edit");

    fireEvent.click(btnEdit);

    const inputEdit = screen.getByTestId("input-edit");
    const btnSave = screen.getByTestId("btn-save");

    fireEvent.change(inputEdit, { target: { value: "abc2" } });
    fireEvent.click(btnSave);

    expect(mockUpdateItemFromList).toHaveBeenCalled();
  });

  it("implement delete functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnDelete = screen.getByTestId("btn-delete");
    fireEvent.click(btnDelete);

    expect(mockDeleteItemFromList).toHaveBeenCalled();
  });

  it("implement edit functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnEdit = screen.getByTestId("btn-edit");
    fireEvent.click(btnEdit);

    const btnCancel = screen.getByTestId("btn-cancel");
    fireEvent.click(btnCancel);
  });

  it("implements strike functionality", () => {
    render(<TodoList {...mockProps} />);

    const checkBox = screen.getByRole("checkbox");
    fireEvent.click(checkBox);

    expect(mockUpdateItemFromList).toHaveBeenCalled();
  });
});

const mockUpdateItemFromList = jest.fn();
const mockDeleteItemFromList = jest.fn();
const mockItem = {
  id: 1,
  name: "Hello2",
  checked: false,
};

const mockProps: TodoListProps = {
  deleteItemFromList: mockDeleteItemFromList,
  updateItemFromList: mockUpdateItemFromList,
  item: mockItem,
};
