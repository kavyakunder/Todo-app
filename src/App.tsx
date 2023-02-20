import React from "react";
import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useAppStyles } from "./App.style";
import { TodoList } from "./components/TodoList";

function App(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const [list, setList] = useState<Array<string>>([]);

  const classes = useAppStyles();
  const addToList = (): void => {
    const newList = [...list, inputText];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setInputText("");
  };

  const deleteFn = (id: number): void => {
    const updatedList = [...list];
    updatedList.splice(id, 1);
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  };

  const handleChange = (id: number, editItem: string | null): void => {
    const updatedList = [...list];
    updatedList[id] = editItem?.trim() ?? "";
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  };

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("list") || "[]"));
  }, []);

  return (
    <div className="App">
      <Typography
        textAlign="center"
        m={3}
        variant="h3"
        data-testid="heading"
        marginTop="1"
      >
        Todo-List
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextField
          inputProps={{ "data-testid": "input-text" }}
          color="secondary"
          value={inputText}
          onChange={(e) => setInputText(e.target.value.trim())}
          focused
        />
        <Button
          data-testid="btn-add"
          variant="contained"
          disabled={!inputText}
          color="secondary"
          onClick={addToList}
          sx={{ m: 1 }}
        >
          Add
        </Button>
      </Box>
      <List data-testid="list" className={classes.list}>
        {list.map((item, index) => (
          <TodoList
            key={index}
            item={item}
            deleteFn={deleteFn}
            id={index}
            handleChange={handleChange}
          />
        ))}
      </List>
    </div>
  );
}

export default App;
