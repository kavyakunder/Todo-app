import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("Todo List", () => {
  it("save an edit", () => {
    render(<TodoList {...mockProps} />);
    const btnEdit = screen.getByTestId("btn-edit");

    fireEvent.click(btnEdit);

    const inputEdit = screen.getByTestId("input-edit");
    const btnSave = screen.getByTestId("btn-save");

    fireEvent.change(inputEdit, { target: { value: "abc2" } });
    fireEvent.click(btnSave);
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("render delete functionality", () => {
    render(<TodoList {...mockProps} />);
    const btnDelete = screen.getByTestId("btn-delete");

    fireEvent.click(btnDelete);
    expect(mockDelete).toHaveBeenCalled();
  });

  it("cancel an edit", () => {
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
  item: "abc",
  deleteFn: mockDelete,
  id: 1,
  handleChange: mockHandleChange,
};
