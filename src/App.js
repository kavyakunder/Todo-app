import { useState } from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import List from "@mui/material/List";
import TodoList from "./components/TodoList";
import Typography from "@mui/material/Typography";

function App() {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  function addToList() {
    setList([...list, inputText]);
    setInputText(" ");
  }

  function deleteFn(id) {
    const updatedList = [...list];
    updatedList.splice(id, 1);
    setList(list);
  }

  return (
    <div className="App">
      <Typography variant="h3">Todo-List</Typography>
      <TextField
        color="secondary"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        focused
      />
      <Button disabled={!inputText} color="secondary" onClick={addToList}>
        Add
      </Button>
      <List>
        {list.map((item, index) => {
          return (
            <TodoList key={index} item={item} deleteFn={deleteFn} id={index} />
          );
        })}
      </List>
    </div>
  );
}

export default App;
