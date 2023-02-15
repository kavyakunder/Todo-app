import { useEffect, useState } from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import List from "@mui/material/List";
import TodoList from "./components/TodoList";
import Typography from "@mui/material/Typography";

function App() {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  const addToList = () => {
    setList([...list, inputText]);
    setInputText("");
  };

  const deleteFn = (id) => {
    const updatedList = [...list];
    updatedList.splice(id, 1);
    setList(updatedList);
  };

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("list")) || []);
  }, [list]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <Typography variant="h3" data-testid="heading">
        Todo-List
      </Typography>
      <TextField
        inputProps={{ "data-testid": "input-text" }}
        color="secondary"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
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
      <List
        data-testid="list"
        sx={{
          margin: "10px auto",
        }}
      >
        {list.map((item, index) => {
          return (
            <TodoList
              key={index}
              item={item}
              deleteFn={deleteFn}
              id={index}
              list={list}
              setList={setList}
            />
          );
        })}
      </List>
    </div>
  );
}

export default App;
