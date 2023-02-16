import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("Todo List", () => {
  const item = "abc";
  const id = 1;
  const handleChange = jest.fn();

  it("save an edit", () => {
    render(<TodoList item={item} id={id} handleChange={handleChange} />);
    const btnEdit = screen.getByTestId("btn-edit");

    fireEvent.click(btnEdit);

    const inputEdit = screen.getByTestId("input-edit");
    const btnSave = screen.getByTestId("btn-save");

    fireEvent.change(inputEdit, { target: { value: "abc2" } });
    fireEvent.click(btnSave);

    // const list = screen.getByTestId("list-item");
    // expect(list).toHaveTextContent("abc2");
  });

  it("cancel an edit", () => {
    render(<TodoList item={item} id={id} />);
    const btnEdit = screen.getByTestId("btn-edit");
    fireEvent.click(btnEdit);

    const btnCancel = screen.getByTestId("btn-cancel");
    fireEvent.click(btnCancel);
  });
});
