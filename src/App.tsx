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

function App(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<
    Array<{ id: number; name: string; checked: boolean }>
  >([]);

  const classes = useAppStyles();

  const addItemToList = (): void => {
    const newList = [
      ...todoList,
      { id: new Date().getTime(), name: inputText.trim(), checked: false },
    ];
    setTodoList(newList);
    localStorage.setItem("todoList", JSON.stringify(newList));
    setInputText("");
  };

  const deleteItemFromList = (id: number): void => {
    const updatedList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedList);
    saveToLocalStorage("todoList", updatedList);
  };

  const updateItemFromList = (id: number, editItem: string | null): void => {
    const updatedList = [...todoList];
    const getIndex = todoList.findIndex((item) => item.id === id);
    updatedList[getIndex].name = editItem?.trim() ?? "";
    setTodoList(updatedList);
    saveToLocalStorage("todoList", updatedList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputText(inputValue);
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedList = [...todoList];
    const getIndex = todoList.findIndex((item) => item.id === id);
    updatedList[getIndex].checked = !checked;
    setTodoList(updatedList);
    saveToLocalStorage("todoList", updatedList);
  };

  const clearTodoList = () => {
    setTodoList([]);
    localStorage.removeItem("todoList");
  };

  const saveToLocalStorage = (
    key: string,
    value: Array<{ id: number; name: string; checked: boolean }>
  ) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todoList") || "[]"));
  }, []);

  return (
    <div className="App">
      <Typography
        data-testid="heading"
        m={3}
        marginTop="1"
        textAlign="center"
        variant="h3"
      >
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
        {todoList.length > 0 ? (
          todoList.map((item) => (
            <TodoList
              {...item}
              key={item.id}
              deleteItemFromList={deleteItemFromList}
              updateItemFromList={updateItemFromList}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))
        ) : (
          <Typography
            data-testid="initial-msg"
            m={3}
            marginTop="1"
            textAlign="center"
          >
            Make a todoList
          </Typography>
        )}
      </List>
      {todoList.length > 0 && (
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
    </div>
  );
}

export default App;
