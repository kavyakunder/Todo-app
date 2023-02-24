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

  it("implement strike functionality", () => {
    render(<TodoList {...mockProps} />);
    const checkBox = screen.getByTestId("checkbox");
    const listItem = screen.getByTestId("list-item");
    fireEvent.change(checkBox);
    // expect(mockHandleCheckboxChange).toHaveBeenCalled();
    expect(listItem).toHaveStyle("text-decoration: none");
  });
});

const mockUpdateItemFromList = jest.fn();
const mockDeleteItemFromList = jest.fn();

const mockProps: TodoListProps = {
  deleteItemFromList: mockDeleteItemFromList,
  updateItemFromList: mockUpdateItemFromList,
  id: 1,
  item: "abc",
};
