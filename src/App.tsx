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
  const [todoList, setTodoList] = useState<Array<{ id: number; name: string }>>(
    []
  );

  const classes = useAppStyles();

  const addItemToList = (): void => {
    const newList = [
      ...todoList,
      { id: new Date().getTime(), name: inputText },
    ];
    setTodoList(newList);
    localStorage.setItem("todoList", JSON.stringify(newList));
    setInputText("");
  };

  const deleteItemFromList = (id: number): void => {
    const updatedList = [...todoList];
    const index = todoList.findIndex((item) => item.id === id);
    updatedList.splice(index, 1);
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const updateItemFromList = (id: number, editItem: string | null): void => {
    const updatedList = [...todoList];
    const index = todoList.findIndex((item) => item.id === id);
    updatedList.splice(index, 1, { id, name: editItem?.trim() ?? "" });
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value.trim();
    setInputText(inputVal);
  };

  const clearTodoList = () => {
    setTodoList([]);
    localStorage.removeItem("todoList");
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
          disabled={!inputText || /^\s*$/.test(inputText)}
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
              deleteItemFromList={() => deleteItemFromList(item.id)}
              updateItemFromList={updateItemFromList}
              id={item.id}
              item={item.name}
              key={item.id}
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
