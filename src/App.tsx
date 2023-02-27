import React from "react";
import { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useAppStyles } from "./App.style";
import { TodoList } from "./components/TodoList";

export type AppProps = {
  deleteItemFromList: () => void;
  updateItemFromList: () => void;
};

export type TodoListItemType = {
  id: number;
  name: string;
  checked: boolean;
};

function App(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([]);

  const classes = useAppStyles();

  const addItemToList = (): void => {
    const newList = [
      ...todoList,
      { id: new Date().getTime(), name: inputText.trim(), checked: false },
    ];
    setTodoList(newList);
    saveToLocalStorage("todoList", newList);
    setInputText("");
  };

  const deleteItemFromList = (id: number): void => {
    const updatedList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedList);
    saveToLocalStorage("todoList", updatedList);
  };

  const updateItemFromList = (
    id: number,
    editItem: string | null,
    checked: boolean,
    action: string
  ): void => {
    console.log("action", action);
    const updatedList = [...todoList];
    const listIndex = todoList.findIndex((item) => item.id === id);

    if (action === "edit") {
      updatedList[listIndex].name = editItem?.trim() ?? "";
    } else if (action === "checkbox") {
      updatedList[listIndex].checked = !checked;
    }
    setTodoList(updatedList);
    saveToLocalStorage("todoList", updatedList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputText(inputValue);
  };

  const clearTodoList = () => {
    setTodoList([]);
    localStorage.removeItem("todoList");
  };

  const saveToLocalStorage = (key: string, value: Array<TodoListItemType>) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todoList") || "[]"));
  }, []);

  return (
    <>
      <Typography data-testid="heading" m={3} textAlign="center" variant="h3">
        Todo-List
      </Typography>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <TextField
          color="secondary"
          focused
          inputProps={{ "data-testid": "input-text" }}
          onChange={handleInputChange}
          value={inputText}
        />
        <Button
          color="secondary"
          data-testid="btn-add"
          disabled={!inputText.trim()}
          onClick={addItemToList}
          sx={{ m: 1 }}
          variant="contained"
        >
          Add
        </Button>
      </Grid>
      <List data-testid="todoList" className={classes.list}>
        {Boolean(todoList.length) ? (
          todoList.map((item) => (
            <TodoList
              item={item}
              key={item.id}
              deleteItemFromList={deleteItemFromList}
              updateItemFromList={updateItemFromList}
            />
          ))
        ) : (
          <Typography data-testid="initial-msg" m={3} textAlign="center">
            Make a todoList
          </Typography>
        )}
      </List>
      {Boolean(todoList.length) && (
        <Button
          color="secondary"
          data-testid="btn-deleteAll"
          onClick={clearTodoList}
          style={{ display: "flex", margin: "0 auto" }}
          variant="contained"
        >
          Delete All
        </Button>
      )}
    </>
  );
}

export default App;
