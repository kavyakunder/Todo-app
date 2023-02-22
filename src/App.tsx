import React from "react";
import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useAppStyles } from "./App.style";
import { TodoList } from "./components/TodoList";

export type AppProps = {
  deleteFn: () => void;
  handleChange: () => void;
};

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

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    inputVal.trim();
    setInputText(inputVal);
  };
  const deleteAll = () => {
    setList([]);
    localStorage.removeItem("list");
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
          onChange={inputHandler}
          focused
        />
        <Button
          data-testid="btn-add"
          variant="contained"
          disabled={!inputText || /^\s*$/.test(inputText)}
          color="secondary"
          onClick={addToList}
          sx={{ m: 1 }}
        >
          Add
        </Button>
        <Button
          data-testid="btn-deleteAll"
          variant="contained"
          color="secondary"
          onClick={deleteAll}
          sx={{ m: 1 }}
        >
          Delete All
        </Button>
      </Box>
      <List data-testid="list" className={classes.list}>
        {list.length > 0 ? (
          list.map((item, index) => (
            <TodoList
              key={index}
              item={item}
              deleteFn={deleteFn}
              id={index}
              handleChange={handleChange}
            />
          ))
        ) : (
          <Typography
            textAlign="center"
            m={3}
            data-testid="inital-msg"
            marginTop="1"
          >
            Make a list
          </Typography>
        )}
      </List>
    </div>
  );
}

export default App;
