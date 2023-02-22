import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
// import { TodoListProps } from "./TodoList";

describe("Todo List", () => {
  it("implement save functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnEdit = screen.getByTestId("btn-edit");

    fireEvent.click(btnEdit);

    const inputEdit = screen.getByTestId("input-edit");
    const btnSave = screen.getByTestId("btn-save");

    fireEvent.change(inputEdit, { target: { value: "abc2" } });
    fireEvent.click(btnSave);
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("implement delete functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnDelete = screen.getByTestId("btn-delete");

    fireEvent.click(btnDelete);
    expect(mockDelete).toHaveBeenCalled();
  });

  it("implement edit functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnEdit = screen.getByTestId("btn-edit");
    fireEvent.click(btnEdit);

    const btnCancel = screen.getByTestId("btn-cancel");
    fireEvent.click(btnCancel);
  });
});

const mockHandleChange = jest.fn();
const mockDelete = jest.fn();

const mockProps = {
  deleteFn: mockDelete,
  handleChange: mockHandleChange,
  id: 1,
  item: "abc",
};
