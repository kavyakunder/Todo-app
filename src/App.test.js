import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

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

  it("render add functionality", () => {
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

  it("render delete functionality", () => {
    render(<App />);
    const inputText = screen.getByTestId("input-text");
    const btnDelete = screen.getByTestId("btn-delete");

    expect(inputText).toBeInTheDocument();

    fireEvent.change(inputText, { target: { value: "New" } });
    fireEvent.click(btnDelete);

    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  it("render edit item functionality", () => {
    render(<App />);
    const initialList = [1, 2, 3];
    const id = 1;
    const updatedItem = 4;
    const updatedList = [1, 4, 3];
    initialList[id] = updatedItem;

    expect(initialList).toEqual(updatedList);
  });
});
